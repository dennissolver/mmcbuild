# Claude Code: Sidebar Design + Persona/Tier Integration
**Sprint v0.3.0 — Single integrated task**
**Inputs:** Karen Burns Figma Make prototype + MMC Build User Personas and Scenarios.xlsx
**Date:** 9 April 2026

---

## Overview

This command implements two inseparable concerns in one pass:

1. **Karen's sidebar design** — visual shell, layout, navigation, branding
2. **Persona/tier access logic** — who sees which modules, run limits, role gating

These cannot be shipped separately without creating rework. The sidebar
nav must know which modules are accessible per role and plan tier. The
access logic needs the UI shell to surface it. Do both together.

---

## Part A — What Karen's Figma Make prototype established

Karen (co-founder/designer) used Figma Make to prototype the MMC Build
app. Her file: `V2 - Minimalist sidebar component (Copy).make`

### Sidebar layout pattern (from her App.tsx)
- Root: `flex h-screen`
- Sidebar: `w-64` open / `w-0` collapsed, `transition-all duration-300 overflow-hidden`
- Dark background sidebar, white main content area
- Logo area at top: icon + "MMC Build" wordmark
- Nav items: icon badge (module colour) + label, full-width buttons
- Active state: highlighted background, white text
- Inactive: muted text, hover highlight
- Header bar: toggle button (hamburger/X) + current module title + user avatar (right)
- Main content: `flex-1 overflow-auto`

### Module nav items Karen defined (5 modules + map to MMC teal palette)

| Module       | Karen's colour | MMC teal mapping      | Icon         |
|---|---|---|---|
| MMC Comply   | blue-500       | #0F766E (teal-700)    | FileCheck    |
| MMC Build    | green-500      | #0D9488 (teal-600)    | Building2    |
| MMC Quote    | purple-500     | #14B8A6 (teal-500)    | FileText     |
| MMC Direct   | orange-500     | #0E7490 (cyan-700)    | Truck        |
| MMC Train    | red-500        | #0369A1 (sky-700)     | GraduationCap|
| Billing      | (not in proto) | #4F46E5 (indigo-600)  | CreditCard   |

---

## Part B — Persona and Tier Access Matrix

Source: `MMC Build User Personas and Scenarios.xlsx`

### Persona types (Supabase role values)
```
builder
developer
architect_bd        (Architect / Building Designer)
design_and_build
consultant          (Certifiers, Surveyors, Planners, Engineers)
trade               (defined but no scenarios yet — scaffold only)
admin               (platform admin — always required)
```

### Subscription plan tiers (Stripe product mapping)
```
trial       → Trial / Basic  (10 analysis runs/month hard limit)
pro         → Professional   (unlimited runs)
enterprise  → Enterprise     (unlimited runs + future private VPC)
```

### Module access by persona

Tier controls run limits, NOT module visibility. All personas access
their modules regardless of tier.

| Persona          | Modules accessible                                    |
|---|---|
| builder          | comply, build, quote, direct, train, billing          |
| developer        | comply, build, quote, direct, billing                 |
| architect_bd     | comply, build, direct, billing                        |
| design_and_build | build, quote, billing                                 |
| consultant       | comply, billing                                       |
| trade            | none defined — show all as locked "Coming Soon"       |
| admin            | all modules, no limits                                |

### Run limit rules (Trial tier only)
- 10 analysis runs per month, reset on billing cycle date
- Applies to: comply, build, quote (the three analysis modules)
- Does NOT apply to: direct (directory browsing), train (training content)
- Counter in Supabase `usage_limits` table
- When limit reached: disable "Run Analysis" button, show upgrade prompt
- Pro and Enterprise: no counter enforced

### Questionnaire branch logic (from scenario descriptions)
After plan upload, present these questions to contextualise AI analysis:

1. Plan type: "Concept plans" or "Final approved plans"
2. MMC materials: "Already specified in plans?" Yes / No
3. Dwelling type: Single dwelling / Duplex / Multi-residential /
   Medium density apartment / NDIS or Senior Living
4. Intent (multi-select): Compare MMC options / Compliance report only /
   Quote only / Full analysis

---

## Part C — Claude Code Instructions

```
You are integrating Karen Burns' sidebar design from her Figma Make
prototype AND the persona/tier access logic from the MMC Build User
Personas and Scenarios spreadsheet into the existing Next.js/Supabase
platform. Do both in one pass.

---

STEP 1 — Read the codebase before touching anything

Read these before writing a single line:
- src/components/layout/ or src/components/sidebar/ — existing sidebar
- src/app/(dashboard)/layout.tsx or src/app/layout.tsx — shell layout
- src/lib/constants.ts or similar — existing colour/theme config
- src/types/ — existing type definitions, especially user/auth types
- supabase/migrations/ — latest migration to understand current schema
- tailwind.config.ts — current theme

Do NOT overwrite anything until you understand what exists.
If the existing sidebar already implements some of these patterns,
extend it rather than replace it.

---

STEP 2 — Supabase schema additions

Create supabase/migrations/[timestamp]_persona_tier_access.sql:

  -- Persona role enum
  DO $$ BEGIN
    CREATE TYPE user_persona AS ENUM (
      'builder', 'developer', 'architect_bd', 'design_and_build',
      'consultant', 'trade', 'admin'
    );
  EXCEPTION WHEN duplicate_object THEN null; END $$;

  -- Subscription tier enum
  DO $$ BEGIN
    CREATE TYPE subscription_tier AS ENUM ('trial', 'pro', 'enterprise');
  EXCEPTION WHEN duplicate_object THEN null; END $$;

  -- Add to profiles table if columns don't exist
  ALTER TABLE profiles
    ADD COLUMN IF NOT EXISTS persona user_persona,
    ADD COLUMN IF NOT EXISTS tier subscription_tier DEFAULT 'trial';

  -- Usage limits table
  CREATE TABLE IF NOT EXISTS usage_limits (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
    month_year text NOT NULL,
    run_count integer DEFAULT 0,
    run_limit integer DEFAULT 10,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now(),
    UNIQUE(user_id, month_year)
  );

  ALTER TABLE usage_limits ENABLE ROW LEVEL SECURITY;
  CREATE POLICY "Users can view own usage"
    ON usage_limits FOR SELECT USING (auth.uid() = user_id);

---

STEP 3 — Module access config

Create src/lib/persona-access.ts with the full MODULE_ACCESS map,
RUN_LIMITED_MODULES array, TRIAL_RUN_LIMIT = 10, canAccessModule()
and isRunLimited() helper functions exactly as specified in Part B above.

---

STEP 4 — Update the sidebar component

Apply Karen's design with MMC teal palette (see Part A colour table).

For each nav item apply access logic:
- canAccessModule(userPersona, moduleId) true → render normally
- persona === 'trade' → lock icon + "Coming Soon" tooltip
- module not in persona access list → hide entirely

Add run limit indicator in sidebar footer for trial users:
  [████████░░] 8 / 10 analyses used
  Upgrade to Pro for unlimited access →
Show only when isRunLimited(userTier) and run_count > 0 for current month.

Karen's collapsible behaviour:
- w-64 open / w-0 collapsed, transition-all duration-300 overflow-hidden
- Hamburger/X toggle in the header bar, not inside the sidebar
- Mobile (< md): overlay drawer with backdrop

---

STEP 5 — Onboarding persona selection screen

Create src/app/(auth)/onboarding/page.tsx

On first login (profiles.persona IS NULL) redirect here before dashboard.
Present persona cards for all 6 user types. On selection, update
profiles.persona and redirect to /dashboard.

---

STEP 6 — Design preview banner (temporary, for UAT)

Add to sidebar footer below run limit indicator:

  <div className="px-4 py-2 border-t border-white/10">
    <span className="flex items-center gap-1.5 text-xs text-slate-500">
      <Tag className="w-3 h-3" />
      Design v0.1 · Karen Burns
    </span>
  </div>

Remove after UAT sign-off.

---

STEP 7 — Verify and commit

Run: npm run build
Fix TypeScript errors. Do not alter any module page content.

Commit message:
  feat(ui+rbac): sidebar design v0.1 + persona/tier access matrix

  - Karen Burns sidebar design applied (dark nav, teal module badges,
    collapsible w-64/w-0, header toggle, user avatar)
  - Persona access matrix from User Personas and Scenarios.xlsx
  - src/lib/persona-access.ts — MODULE_ACCESS, run limit helpers
  - Trial tier run limit UI (10 runs/month, upgrade prompt)
  - Onboarding persona selection on first login
  - Supabase migration: persona enum, tier enum, usage_limits table
  - Design v0.1 UAT banner in sidebar footer
  - Trades persona scaffolded as Coming Soon

  Inputs:
    V2 - Minimalist sidebar component (Copy).make
    MMC Build User Personas and Scenarios.xlsx
  Sprint: v0.3.0
```

---

## Part D — Open questions for Karen (before UAT)

Raise these before the UAT review session:

1. **Trades persona** — no scenarios defined in the spreadsheet.
   What modules should Trades access? Currently showing as "Coming Soon".

2. **Enterprise vs Professional** — scenarios in the spreadsheet are
   identical for both tiers. Is the only differentiator the run limit,
   or are there feature differences? Affects Stripe product config.

3. **Run limit reset** — does the 10-run Trial limit reset on the
   billing cycle date or the 1st of each calendar month?

4. **Onboarding screen design** — the persona selection screen is
   scaffolded functionally but needs Karen's Figma mockup before
   UAT design review.

---

## Notes

- Do not copy Karen's prototype components directly. Her Figma Make
  output is standalone React, not Next.js. Use it as a design spec only.
- The personas spreadsheet is the authoritative access control source.
  Any future modules must be added there first, then in persona-access.ts.
- After deployment, share the Vercel staging preview URL with Karen
  and Karthik with the message:
  "Sidebar design v0.1 + persona access live on staging. Please confirm:
  (1) colour/layout looks correct, (2) your persona sees the right
  modules, (3) Trades Coming Soon state is acceptable for now."
