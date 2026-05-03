# Claude Code Execution Brief — Sprint v0.4.0
**Source:** MMC Build Meeting Minutes, Thursday 9 April 2026
**Prepared by:** Dennis McMahon
**Execution window:** Friday 10 April → Sunday 12 April 2026
**Next review:** Monday 13 April 2026

---

## Context

This brief extracts all technical action items assigned to Dennis from
the Sprint Review & Planning meeting of 9 April 2026. Each item below
is a discrete execution task for Claude Code. Work through them in
priority order. Do not skip ahead — several items have dependencies.

Read the codebase before touching anything. The project is a Next.js /
Supabase / Vercel / Inngest / Anthropic Claude stack at:
`C:\Users\denni\PycharmProjects\MMCBuild`

---

## Priority order

1. Vercel staging branch (unblocks Karen and Karthik UAT)
2. GitHub repo consolidation (unblocks Base44 cancellation)
3. Persona reset mechanism (bug fix from meeting)
4. Project guard on module pages (UX fix from meeting)
5. Confluence setup (unblocks Karthik test documentation)
6. Internal test regime document (unblocks beta launch)
7. 10 end-to-end test runs with token tracking (pricing data)
8. Jira — create Sprint v0.4.0 stories from this brief

---

## Task 1 — Vercel Preview/staging branch
**Priority:** HIGH | **Due:** Sunday 12 April
**Source:** Minutes §4.2

All deployments currently go to production. A staging environment is
needed so Karen and Karthik can review design iterations without
affecting the live site.

```
Set up a Vercel Preview deployment branch for the MMC Build project.

1. Create a new git branch: `staging`
2. Push it to the remote repo
3. In Vercel (project ID: prj_qKKLAkGGGVH5KocDfoGZQOqIZGvj,
   team ID: team_hwN7IFtd2Fo3DCj9C67ZwI1t):
   - Confirm the staging branch triggers a Preview deployment
   - Verify the Preview URL is generated and accessible
4. Add a visible banner to the staging branch only:
   - Small teal bar at the top of the app: "Staging environment —
     not for production use"
   - Controlled by NEXT_PUBLIC_ENV=staging env var in Vercel
   - Do not show on production
5. Report the staging Preview URL on completion
```

---

## Task 2 — GitHub repository consolidation
**Priority:** HIGH | **Due:** Sunday 12 April
**Source:** Minutes §4.1

Karthik has sent a GitHub invite to the MMC Build official repository
(handle: Denis Solver). The current codebase needs to be merged in and
the existing Base44 website migrated to Vercel so the $40–50/month
Base44 subscription can be cancelled.

```
1. Accept the GitHub invite if not already done — check for pending
   invites at github.com/notifications
2. Clone or inspect the MMC Build official repo once access is confirmed
3. Identify any Base44-specific components or dependencies in the
   existing codebase and list them
4. Create a migration plan:
   - What needs to be removed or replaced from Base44
   - What needs to be merged from the current codebase
   - Any conflicts between the two codebases
5. Execute the merge into the MMC Build official repo
6. Confirm the merged codebase builds cleanly: npm run build
7. Confirm Vercel deployment picks up the merged repo correctly
8. Do NOT cancel Base44 yet — confirm with Dennis first after testing
9. Report: list of Base44 components removed, build status, Vercel
   deployment URL
```

---

## Task 3 — Persona reset mechanism
**Priority:** HIGH | **Due:** Sunday 12 April
**Source:** Minutes §1.2

Bug identified in meeting: once a user selects a persona on the
onboarding screen it is permanently locked. Users need a way to change
their persona post-login.

```
1. Find the onboarding persona selection screen:
   src/app/(auth)/onboarding/page.tsx

2. Find where the persona is written to Supabase:
   - Likely updates profiles.persona
   - Confirm the query

3. Add a "Change role" option accessible from the user's account
   settings or profile page:
   - Location: src/app/(dashboard)/settings/ or similar
   - Add a "Your role" section showing the current persona
   - Add a "Change role" button that:
     a. Clears profiles.persona (set to null)
     b. Redirects to /onboarding so the user can re-select
     c. Requires the user to re-select before returning to dashboard

4. Ensure the sidebar re-renders with the new persona's module access
   immediately after re-selection without requiring a full page reload

5. Add a brief confirmation modal before clearing: "Changing your role
   will update which modules you can access. Continue?"

6. Do not change any existing onboarding flow logic — this is additive only
```

---

## Task 4 — Project guard on module pages
**Priority:** HIGH | **Due:** Sunday 12 April
**Source:** Minutes §1.3

Karen raised that users navigating directly to a module page (e.g.
/comply or /build) without an active project get a confusing empty
state. The fix is to intercept this and redirect to project creation.

```
1. Find the layout or page component for each module route:
   src/app/(dashboard)/comply/page.tsx
   src/app/(dashboard)/build/page.tsx
   src/app/(dashboard)/quote/page.tsx
   (Direct and Train do not require a project — skip those)

2. At the top of each affected page, check if the user has at least
   one project associated with their org:
   - Query: SELECT id FROM projects WHERE org_id = [user's org_id] LIMIT 1
   - If no projects exist → redirect to /projects with a query param:
     /projects?prompt=create
   - If projects exist → render the page normally

3. On the /projects page, detect the ?prompt=create query param and
   automatically open the "Create new project" modal/drawer

4. This should feel seamless — users should not hit a dead-end blank
   state; they should land on the project creation flow naturally

5. Do not change the module page content itself — only add the guard
   at the top of the page component
```

---

## Task 5 — Confluence space setup
**Priority:** HIGH | **Due:** Saturday 11 April
**Source:** Minutes §3.1

Karthik recommended Confluence for test case documentation (not Jira),
with Jira tickets mapped to Confluence pages. Dennis to set up the
space and grant Karen and Karthik access.

```
This is a manual/admin task — Claude Code cannot create Confluence
spaces directly. Complete the following steps:

1. Log in to: corporateaisolutions-team.atlassian.net
2. Navigate to Confluence → Create Space
3. Space name: "MMC Build — Test & QA"
4. Space key: MMCQA
5. Create the following top-level pages:
   - Test Strategy & Approach
   - Module Test Cases (with child pages per module: Comply, Build,
     Quote, Direct, Train, Billing, Onboarding)
   - Test Results & Sign-off
   - Known Issues & Bugs
6. Invite Karen Burns and Karthik Rao as Space Members with edit access
7. Post the Confluence space URL in the Jira MMC Build project as a
   pinned comment or project link

Report: Confluence space URL once created.
```

---

## Task 6 — Internal test regime document
**Priority:** HIGH | **Due:** Saturday 11 April
**Source:** Minutes §3.1

Dennis to prepare a formal test regime document covering all module
workflows, for Karen and Karthik to review and sign off before beta
launch.

```
Create a test regime document as a markdown file committed to /briefs/
in the MMC Build GitHub repo, AND as a Word document for distribution.

File: /briefs/test-regime-v1.0.md

The document must cover:

### Structure per module

For each of the 6 modules (Comply, Build, Quote, Direct, Train,
Billing), document:

1. Test case ID (e.g. TC-COMPLY-001)
2. Test description
3. Preconditions (e.g. user logged in as Builder, project exists)
4. Test steps (numbered)
5. Expected result
6. Pass/Fail field
7. Notes field

### Minimum test cases required

**Onboarding**
- TC-ONB-001: New user registration and persona selection
- TC-ONB-002: Persona reset via settings
- TC-ONB-003: First login redirect to onboarding if persona not set

**MMC Comply**
- TC-COMPLY-001: Upload valid PDF plan → analysis runs → report generated
- TC-COMPLY-002: Upload invalid file type → error message shown
- TC-COMPLY-003: Run limit enforcement at 10 runs (Trial tier)
- TC-COMPLY-004: NCC citations present in output report
- TC-COMPLY-005: Export compliance report as PDF

**MMC Build**
- TC-BUILD-001: Upload plan → material suggestions generated
- TC-BUILD-002: Material selection persists to project record
- TC-BUILD-003: No project exists → redirected to project creation
- TC-BUILD-004: Cross-module plan sharing (plan uploaded in Build
  available in Comply and Quote)

**MMC Quote**
- TC-QUOTE-001: Quote generated from selected materials
- TC-QUOTE-002: Quote export as PDF
- TC-QUOTE-003: Quote export as Word document
- TC-QUOTE-004: Manufacturer pricing reflected in output

**MMC Direct**
- TC-DIRECT-001: Directory search by state and category returns results
- TC-DIRECT-002: Filter by certification status works correctly
- TC-DIRECT-003: Company profile displays all required fields
  (ABN, licence, contact, MMC experience)

**MMC Train**
- TC-TRAIN-001: Training module loads and progress is tracked
- TC-TRAIN-002: Quiz completion triggers certificate generation
- TC-TRAIN-003: Dashboard shows completion percentage per module

**Billing**
- TC-BILL-001: Trial user sees run limit progress bar
- TC-BILL-002: Upgrade prompt shown when run limit reached
- TC-BILL-003: Stripe test mode payment completes successfully

**Access control**
- TC-ACCESS-001: Builder persona sees correct modules in sidebar
- TC-ACCESS-002: Consultant persona sees Comply only
- TC-ACCESS-003: Admin user has access to all modules
- TC-ACCESS-004: Trade persona sees Coming Soon state

Also generate this as a Word .docx using the docx npm package and save
to /mnt/user-data/outputs/MMC_Build_Test_Regime_v1.0.docx for
distribution to Karen and Karthik.
```

---

## Task 7 — 10 end-to-end test runs with token tracking
**Priority:** HIGH | **Due:** Sunday 12 April
**Source:** Minutes §2.4

Dennis to run 10 complete end-to-end test projects through the platform
and record token usage per run. This data informs the pricing model
decision (per-run vs per-token).

```
1. Create a test script at /scripts/token-test-runner.ts that:
   a. Creates a new project via the platform API
   b. Uploads a sample PDF plan (use any valid residential PDF from
      /test-data/ or create a minimal placeholder)
   c. Runs the full analysis pipeline (Build + Comply + Quote)
   d. Captures token usage from the Anthropic API response headers
      or usage object for each call
   e. Records: run number, timestamp, input tokens, output tokens,
      total tokens, estimated cost (at current Anthropic pricing),
      module run against
   f. Outputs results to /test-results/token-usage-[date].json
      and a summary CSV

2. Run the script 10 times with varied inputs if possible (different
   plan sizes, different module combinations)

3. Produce a summary table:
   - Average tokens per full end-to-end run
   - Average tokens per module (Comply only, Build only, Quote only)
   - Estimated cost per run at current pricing
   - Projected monthly cost for a Trial user at 10 runs/month
   - Projected monthly cost for a Pro user at unlimited runs (assume
     50 runs/month as a baseline)

4. Save summary to /test-results/token-usage-summary.md

This data goes directly into the pricing model discussion at Monday's
meeting.
```

---

## Task 8 — Jira Sprint v0.4.0 setup
**Priority:** MED | **Due:** Sunday 12 April
**Source:** Minutes §8 action items

```
Using the existing jira_setup_v4.js pattern (reads from .env.local),
create Sprint v0.4.0 stories in Jira project SCRUM with the following:

Sprint name: Sprint 4 — v0.4.0
Sprint goal: "UAT environment live, persona reset fixed, project guard
implemented, test regime distributed, GitHub consolidated."
Start date: 10 April 2026
End date: 23 April 2026

Stories — Dennis (assign to Dennis McMahon):
1. Set up Vercel staging/preview branch [HIGH]
2. GitHub repo consolidation — merge codebase into MMC Build official repo [HIGH]
3. Fix: persona reset mechanism in user settings [HIGH]
4. Fix: project guard on Comply/Build/Quote module pages [HIGH]
5. Set up Confluence QA space and grant team access [HIGH]
6. Prepare and distribute internal test regime document v1.0 [HIGH]
7. Run 10 end-to-end token tracking tests; produce pricing summary [HIGH]
8. Review and triage Karen's Jira backlog items [MED]

Stories — Karen Burns (assign to Karen):
1. Complete Figma design — MMC Direct and MMC Train pages [HIGH]
2. Investigate missing Build material selection sub-page in Figma [MED]
3. Update R&D portal time scheduling data [HIGH]
4. Recruit 5 beta users per persona group [MED]
5. Confirm AusIndustry R&D registration with accountant [HIGH — due 30 Apr]
6. Review and sign off on test regime v1.0 [HIGH]

Stories — Karthik Rao (assign to Karthik):
1. Update R&D portal time scheduling data [HIGH]
2. Test onboarding persona selection flow; log bugs in Jira [MED]
3. Review and sign off on test regime v1.0 [HIGH]
4. Update DNS (VentraIP) → Vercel once migration confirmed [MED — TBC]

Complete sprint SCRUM sprint 3 (SCRUM-26 through SCRUM-30 all done)
before creating sprint 4.
```

---

## Output checklist

Before Monday 13 April meeting, confirm each of the following:

- [ ] Staging URL live and shared with Karen and Karthik
- [ ] GitHub repo access confirmed; merge plan documented
- [ ] Persona reset available in user settings
- [ ] Project guard active on Comply, Build, Quote pages
- [ ] Confluence space URL shared with team
- [ ] Test regime document distributed (Word + committed to /briefs/)
- [ ] Token usage summary produced and ready to present Monday
- [ ] Jira Sprint v0.4.0 created with all stories assigned

---

## Do not action (Karen/Karthik items — noted for Monday review)

- Figma Direct and Train pages (Karen)
- R&D portal data update (Karen and Karthik)
- Beta user recruitment (Karen)
- AusIndustry registration (Karen — hard deadline 30 Apr)
- DNS update VentraIP → Vercel (Karthik — TBC after migration)
