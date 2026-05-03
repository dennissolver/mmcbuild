# MMC Build — Flow Redesign Plan (v0.5.0 candidate)

**Author:** Dennis McMahon
**Date:** 30 April 2026
**Status:** Draft — for sign-off before implementation
**Sprint target:** v0.5.0
**Linked Karen feedback:** SCRUM-132, SCRUM-133, SCRUM-155 (project-question pre-validation)

---

## Why this redesign

Inexperienced users hitting `/build/[projectId]` today see six unchecked technical-jargon checkboxes (SIPs, CLT, Steel Frame, Timber Frame, Volumetric Modular, Hybrid) and no guidance on which to pick. Three knock-on effects:

1. Most novices either tick everything cautiously or pick one at random — the AI optimisation runs against an unrepresentative system set, lowering recommendation quality
2. Users have to leave the page (`/comply/[projectId]/upload`) to get a plan in, then come back — the cross-module redirect is leftover plumbing from when Comply owned plans
3. No surface for installation safety considerations — builders pick "Volumetric Modular" without knowing it requires a 50-tonne crane and Working at Heights tickets, which surfaces only after a Quote is run

This redesign also pulls in 3D Concrete Printing (a real and emerging Australian MMC category — Luyten, Contour Crafting, Spec Constructions) and surfaces installation WHS hazards inline.

---

## Proposed changes — priority order

### 1. Default-all systems on new projects, with uncheck-to-prune

Switch `SystemSelectionPanel` initial state from `[]` to all 6+1 system keys checked. Add a hint above the grid: *"All systems considered by default — uncheck any that don't apply to this project."*

**Tradeoff to acknowledge:** running the AI against all 7 systems costs ~30–50% more tokens and adds ~15–30s to the analysis vs a focused 2–3 system run. Acceptable for v0.5.0 (lower friction outweighs higher cost during beta), but worth tracking — we may want a smart-default path in v0.6.0 once we have project-type intake.

### 2. Add 3D Concrete Printing as a 7th selectable system

Add `{ key: "concrete_3dp", label: "3D Concrete Printing", description: "Robotic extrusion of structural concrete walls and footings" }` to:

- `src/components/build/system-selection-panel.tsx:11` — `CONSTRUCTION_SYSTEMS` array
- `src/lib/ai/types.ts:170` — agent's known systems list
- `src/lib/ai/prompts/optimisation-system.ts` — `technology_category` enum
- `src/lib/direct/constants.ts:43` — Directory category list
- `cost_reference_rates` table — needs Karen/Karthik to source AU 3DCP rate data (depends on supplier engagement)

### 3. Drop "Hybrid" as a user-pickable system, derive it server-side

"Hybrid" is not parallel to the other systems — it's a meta-state that emerges when 2+ are selected. Today it confuses users and double-counts. Remove from the picker; flag projects as `hybrid: true` in the optimisation prompt automatically when `selected_systems.length >= 2`.

### 4. Inline plan upload on the Build page

Remove the Build → Comply → Build redirect for plan uploads. Embed the existing `PlanDropzone` directly in the Build page's "Plan Status" card when no plan is ready. Plans remain shared across modules (no data-model change) — this is a UI move only.

### 5. WHS hazard chips on each system card

Add an `installationHazards: string[]` field to each entry in `CONSTRUCTION_SYSTEMS` and render as small chips below the description. Examples:

| System | Hazards to surface |
|---|---|
| SIPs | Crane lift required · Working at heights · Panel handling 200–600kg · Adhesive fumes |
| CLT / Mass Timber | Crane lift required · Working at heights · Panel handling 1–8t · Confined-space joints |
| Steel Frame | Sharp edges · Hot work (welding) · Working at heights |
| Timber Frame | Working at heights >2 storey · Power-tool injuries · Manual handling |
| Volumetric Modular | Major crane lifts (>20t) · Transport route hazards · Module landing zone exclusion |
| 3D Concrete Printing | Cementitious dust · Automated machinery exclusion zones · Concrete spalling during cure · Load-test before occupancy |

These are informational only — not legal advice, not a substitute for SWMS. A small "Not a SWMS — see [link]" note sits below the chips.

### 6. WHS callouts inside the AI optimisation report

Extend the optimiser prompt (`src/lib/ai/prompts/optimisation-system.ts`) to emit a `whs_considerations` field per recommendation. Render that field on the existing report page (`src/components/build/design-report.tsx`) and include it in the PDF/Word exports we just shipped (commit `01d2e70`).

Example AI output for a "switch external walls to SIPs" recommendation:

> **WHS impact:** Introduces working-at-height during panel install (>3m). Trade requires Construction Induction (White Card) + Working at Heights tickets. Site setup needs panel landing zone clear of overhead services. SWMS template required before work commences.

---

## What's explicitly NOT in v0.5.0

### SWMS document generation — parked for v0.6.0

Auto-generating Safe Work Method Statements per selected system is genuinely valuable (legally mandatory for "high risk construction work" per WHS Regulations 2011 Schedule 3, currently a manual chore for builders), but it carries real legal-defensibility risk and needs:

- Hazard identification matched to specific WHS Regs Schedule 3 categories
- Risk-control hierarchy (eliminate → substitute → engineering → admin → PPE)
- Sign-off blocks for site supervisor + workers
- Per-state variations (NSW SafeWork vs WorkSafe Vic vs WHSQ vs SafeWork SA)

**Recommend scoping as a separate v0.6.0 epic** — possibly under a new "MMC Safe" sub-module or as a Build sub-page. The Build flow can hint at it ("9 SWMS templates available for your selected systems →") which drives users toward the new feature without overloading the current page.

### Smart-default presets keyed off project type

Inferring "Timber + SIPs for single-storey resi" needs project-type / storeys / climate-zone data captured at intake. That work belongs in **SCRUM-155** (Comply pre-validation) — same questions serve both modules. Don't duplicate.

---

## Test alignment — Jira test regime

This redesign affects existing TC-BUILD test cases and adds new ones. Tests stay in the same SCRUM project, follow the same TC-MODULE-NNN format from `docs/test-regime-v1.0.md`, and link back to the source Karen feedback where applicable.

### Existing TCs to UPDATE (Karen has already flagged for retest)

| Test | Source Jira | Update needed |
|---|---|---|
| **TC-BUILD-001** "Upload plan — material suggestions generated" | SCRUM-132 | Steps must change: plan upload now happens inline on the Build page, not via Comply. Expected result must include "all 6+1 systems considered by default in suggestions." |
| **TC-BUILD-002** "Material selection persists to project record" | SCRUM-133 | Re-test against the new default-all initial state. Verify uncheck-to-prune persists correctly. |
| **TC-BUILD-003** "No project exists — redirected to project creation" | SCRUM-134 | No change to the test logic — still blocked on **SCRUM-159** workaround (give Karen a second login with zero projects). |
| **TC-BUILD-004** "Cross-module plan sharing" | SCRUM-135 | No change — passed in last test cycle, still valid post-redesign. |

### New TCs to ADD (TC-BUILD-005 → TC-BUILD-010)

| New ID | Description | Maps to redesign change |
|---|---|---|
| **TC-BUILD-005** | New project — Build page loads with all 7 systems pre-selected; user sees "uncheck to prune" hint | Change #1 (default-all) |
| **TC-BUILD-006** | "Help me choose" link opens 3-question modal; selections post-modal match the answer set | Change #1 (smart prune option) |
| **TC-BUILD-007** | 3D Concrete Printing appears as a selectable system; AI optimisation report can recommend it; Directory shows 3DCP suppliers | Change #2 (3DCP) |
| **TC-BUILD-008** | "Hybrid" no longer appears in the picker; selecting 2+ systems flags the project as hybrid in the optimisation report | Change #3 (drop hybrid) |
| **TC-BUILD-009** | Build page allows direct plan upload (no Comply redirect); uploaded plan becomes visible in Comply too | Change #4 (inline upload) |
| **TC-BUILD-010** | Each system card shows WHS hazard chips below the description; "Not a SWMS" disclaimer link is present and points to the future SWMS surface | Change #5 (WHS chips) |
| **TC-BUILD-011** | AI optimisation report includes a `whs_considerations` block per recommendation; block appears in HTML view, PDF export, and Word export | Change #6 (WHS in report) |

### Beta tester instructions

When v0.5.0 ships to Karen and Karthik for re-test:

1. Karen re-runs **TC-BUILD-001** and **TC-BUILD-002** (now reworded for the new flow) — clears her two outstanding "needs re-test after design changes" comments
2. Karen runs the new **TC-BUILD-005 → TC-BUILD-011** in sequence — fresh evidence per ticket
3. Karthik mirrors Karen's run on his own login as a second-set-of-eyes pass (ties to the unresolved Sprint 5 goal: "Karen and Karthik review and sign off all 29 test cases")
4. Test results posted as Jira comments on the new TC-BUILD-NNN tickets, same convention as the current TC-COMPLY-* and TC-QUOTE-* threads

### Sprint 5 implications

If we land any of these changes during Sprint 5, the corresponding TC-BUILD-NNN tickets need to exist *before* code merges so Karen has the test ready. Suggest: when the implementation Jira ticket is created, immediately create the TC-BUILD-NNN sibling and set its status to "Ready for test" the moment the PR merges. Same pattern as the existing TC-* tickets but scheduled together rather than catch-up.

---

## Jira tickets to create / update if this plan is approved

### New implementation tickets (Stories — backlog, candidate for v0.5.0)

| Title | Maps to change | Estimated effort |
|---|---|---|
| Build: default-all system selection on new projects | #1 | 1h |
| Build: "Help me choose" 3-question modal that prunes selection | #1 (paired) | 2h |
| Build: add 3D Concrete Printing as a 7th system everywhere | #2 | 4h (mostly rate sourcing) |
| Build: drop "Hybrid" as a user-pickable system; derive server-side | #3 | 1h |
| Build: inline plan upload on the Build page (remove Comply redirect) | #4 | 2h |
| Build: WHS hazard chips on each system card | #5 | 1h |
| Build + Comply + Quote: WHS considerations field in AI report output | #6 | 4h (prompt + report renderer + PDF/Word port) |

### New test tickets (mirror the implementation tickets)

| Title | Maps to TC | Owner |
|---|---|---|
| Test: TC-BUILD-005 Default-all on new projects | New TC | Karen + Karthik |
| Test: TC-BUILD-006 "Help me choose" modal pruning | New TC | Karen + Karthik |
| Test: TC-BUILD-007 3D Concrete Printing surfaces correctly | New TC | Karen + Karthik |
| Test: TC-BUILD-008 Hybrid removed; auto-derived | New TC | Karen + Karthik |
| Test: TC-BUILD-009 Inline plan upload | New TC | Karen + Karthik |
| Test: TC-BUILD-010 WHS chips render | New TC | Karen + Karthik |
| Test: TC-BUILD-011 WHS in AI report + exports | New TC | Karen + Karthik |

### Existing tickets to update

- **SCRUM-132** (TC-BUILD-001) — replace step list with the new inline-upload flow
- **SCRUM-133** (TC-BUILD-002) — update Expected Result to reflect default-all initial state
- **SCRUM-155** — note in the comment thread that smart-default presets in Build depend on this ticket landing first

### Future epic to scope (not v0.5.0)

- **NEW EPIC — "MMC Safe": auto-generate SWMS templates per selected system** — target v0.6.0 or v0.7.0. Scope to be drafted separately.

---

## Open decisions for sign-off

1. **Approve "default-all" approach** vs the alternative "smart-default keyed off project type" — recommend default-all for v0.5.0, smart-default deferred to v0.6.0 once SCRUM-155 lands
2. **Approve dropping "Hybrid"** as a user-pickable system — recommend yes
3. **Approve the WHS chip hazard list** above (the table) — Karen + Karthik to fact-check from a builder's perspective before chips ship
4. **Confirm 3DCP supplier rate data** — who sources the cost_reference_rates seed data? Suggest: Karthik takes ownership, deadline before v0.5.0 implementation starts
5. **SWMS deferral** — confirm SWMS generation is out-of-scope for v0.5.0, scoped as a separate epic for v0.6.0+
6. **Test creation timing** — agree the new TC-BUILD-005..011 tickets are raised at the same time as the implementation tickets, so Karen has the test definitions ready when each PR lands
