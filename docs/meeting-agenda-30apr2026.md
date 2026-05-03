# Sprint 5 Standup — 30 Apr 2026

**I have assessed every SCRUM task — what should have been done, by whom, what has been done, and what is outstanding. Tonight we run through only the items that need addressing.**

## Status: Karen's feedback already actioned

Every distinct request Karen made in her test-case comments today has been (a) accounted for in Jira and (b) recoded where realistic before this meeting:

| Karen's request | Now tracked as | Status |
|---|---|---|
| Word export for compliance reports | **SCRUM-156** | ✅ **CODE LANDED** — "Export Word" button now ships next to "Export PDF" on the Comply report page |
| Word export for quote reports | **SCRUM-157** | ✅ **CODE LANDED** — same button on the Quote report page |
| Comply: accept DWG / SKT / RVT / DOCX upload formats | **SCRUM-153** | Logged. DOCX is feasible (mammoth lib); DWG/SKT/RVT need a third-party CAD service — decision needed before build |
| Comply: warn user when uploaded docs are insufficient | **SCRUM-154** | Logged. UX flow change — needs your call on which docs are "essential" |
| Comply: pre-validate at project-question level to reduce fails | **SCRUM-155** | Logged. Needs an audit of recent fail-types to decide which questions to add |
| Quote: SIP wall data wrong, fence MMC appearing unexpectedly | **SCRUM-158** | Logged as **HIGH**-priority bug. Needs DB introspection + agent prompt audit — couldn't safely fix in time |
| TC-BUILD-003 — Karen can't reach empty state | **SCRUM-159** | Logged. Workaround options listed — pick tonight |
| TC-COMPLY-003 — verify trial run counter | **SCRUM-160** | Logged. Will check her Supabase row after the meeting and post evidence |


---

## Coverage of this assessment

| Bucket | Count | Notes |
|---|---|---|
| Sprint 4 tickets | 14 | All closed — nothing carried over, nothing dropped |
| Sprint 5 tickets | 13 | 5 Karen, 1 Karthik, 1 me, 6 unassigned |
| Test-case tickets reviewed (TC-* in SCRUM-124..152) | 29 | Karen has tested Comply, Build, Quote — Direct, Train, Bill, Access not yet started |

Total reviewed: **56 tickets.**

---

## ITEMS TO ADDRESS TONIGHT

### A. Tests Karen could not run — need workarounds before she continues

| Test | Blocker | Workaround to agree tonight |
|---|---|---|
| **SCRUM-134 / TC-BUILD-003** "No project exists → redirected to project creation" | Karen already has saved projects under her login, can't reach the empty state | **Option 1:** spin Karen a second login with zero projects for empty-state testing. **Option 2:** I add a "delete all my projects" admin action she can run before each retest. **Option 3:** I run this test on a clean account and post evidence to the ticket. *Recommend Option 1 — fastest, doesn't change product code.* |
| **SCRUM-128 / TC-COMPLY-002** "Upload invalid file type → error shown" | The file picker only shows PDFs, so she can't even select an invalid file | **Rewrite the test** — the real behaviour is "picker only allows PDF". I'll reword the test case to match the actual guard, OR add an additional drag-and-drop test for non-PDF rejection. Decide which tonight. |
| **SCRUM-129 / TC-COMPLY-003** "Run limit enforcement at 10 runs (Trial)" | Karen's trial ended but she doesn't know if the 10-run counter was initialised against her login | I check her account in Supabase tonight, post the run count + tier history into the ticket as evidence. No product change needed if counter was correct. |
| **SCRUM-132 + SCRUM-133 / TC-BUILD-001 + TC-BUILD-002** | Karen marked both "needs re-test after Build module redesign" | Pre-condition: SCRUM-75 (Karen's Figma for Direct/Train) lands first, then I re-implement Build to match, then Karen re-tests. Confirm sequencing tonight. |

### B. Real product issues found

| Ticket | Issue | Status / Owner |
|---|---|---|
| **SCRUM-158** (from SCRUM-138 / TC-QUOTE-003) | Karen: *"If SIP was selected, then the data for Wall is not correct and why fence MMC was included"* — quote contents look wrong | **HIGH-priority bug logged.** Needs Supabase introspection of `cost_reference_rates` for SIP rows + quote-agent prompt audit. Did not attempt a speculative fix — would risk making data integrity worse. Me — confirm ETA tonight. |
| **SCRUM-153 / 154 / 155** (from SCRUM-127 / TC-COMPLY-001) | (a) Karen wants DWG / SKT / RVT / Word upload; (b) no warning when insufficient docs uploaded; (c) "too many fails that could be resolved at the project question level" | All three split into separate tickets. Decisions needed: (a) DOCX is feasible now via mammoth — DWG/SKT/RVT need a CAD-conversion vendor decision; (b) need to define "essential" doc set; (c) need an audit of recent fail-types to pick which questions to add. |
| **Word export** (SCRUM-156 + SCRUM-157) | Karen requested 3 times across Comply 131, Quote 137, Comply 127 | ✅ **SHIPPED in commit `01d2e70`** — "Export Word" button now sits next to "Export PDF" on both Comply and Quote report pages. Pending push + Vercel deploy. No decision needed tonight. |

### C. Sprint 5 structural gaps

| # | Issue |
|---|---|
| 1 | **6 Sprint 5 tickets are unassigned** (SCRUM-115, 116, 118, 119, 120, 122). All read as engineering — propose I take them. Confirm tonight. |
| 2 | **Sprint goal says "Karen and Karthik review and sign off all 29 test cases"** — but Karthik has no test-review ticket in Sprint 5. SCRUM-83 was his S4 sign-off. Either raise SCRUM-123-equivalent for Karthik, or confirm SCRUM-83 still satisfies the goal. |
| 3 | **Karen has tested 14 of 29 test cases so far** (Onboarding, Comply, Build, Quote). Direct, Train, Billing, Access — not yet started. Set a target for completion before sprint close (7 May). |
| 4 | **SCRUM-78 "Recruit 5 beta users per persona group"** — persona layer was removed in v0.4.x. Rescope to flat 5–10 beta testers observed by behaviour. |

### D. Carry-forward dependencies

| Mine (SCRUM-42) | → blocks Karthik (SCRUM-84 DNS cutover) |
| Karen Figma (SCRUM-75) | → blocks Build retest (SCRUM-132, 133) |
| Karen Quick-start guide (SCRUM-41 In Review) | Who is the reviewer? Can it close tonight? |

---

## What's healthy (no discussion needed)

- **Sprint 4: 14/14 done, zero leftovers.**
- Tests Karen has confirmed PASS: NCC citations (SCRUM-130), PDF compliance export (SCRUM-131), cross-module project sharing (SCRUM-135), quote generation (SCRUM-136), quote PDF export (SCRUM-137).
- Onboarding tests (SCRUM-124, 125) — already obsoleted post-persona removal, closed cleanly.

---

## Decisions required by end of meeting

1. **Workaround for Karen's blocked tests** — pick from menu in Section A
2. **SCRUM-158 (quote SIP / fence bug)** — confirm me as owner and agree an ETA
3. **SCRUM-153 (file-format expansion)** — DOCX upload now (small lift via mammoth) vs full DWG/SKT/RVT pack later (needs CAD-conversion vendor)
4. **SCRUM-154 (insufficient-docs warning)** — agree the "essential" doc set so I can wire the warning
5. **Six unassigned Sprint 5 tickets** (SCRUM-115, 116, 118, 119, 120, 122) — assign to me or split
6. **Karthik test-review ticket** — raise new or rely on SCRUM-83
7. **SCRUM-78 rescope** — confirm new wording (persona layer is gone)
8. **Test completion target by 7 May** — how many of the remaining 15 test cases must Karen run
