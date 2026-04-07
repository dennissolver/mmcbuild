# Current Sprint — v0.4.0

**Sprint:** 4
**Phase:** Client feedback and iteration
**Started:** 2026-04-07
**Brief:** `briefs/` (v0.4.0 brief pending — working from PROJECT_STATE.md)

---

## Sprint Goal

Resolve client feedback from v0.1.0-v0.3.0 reviews. Close blocking items before pilot onboarding.

---

## Pending Implementation

| # | Item | Module | Priority | Status |
|---|------|--------|----------|--------|
| — | No pending code items | — | — | — |

_All code items from previous sprints are shipped. Check GitHub Issues for newly accepted items: `gh issue list --label accept`_

---

## Blocking Items (Non-Code)

| Item | Owner | Due | Status |
|------|-------|-----|--------|
| Figma design mockups (correct versions) | Karen | Overdue | Not received |
| AusIndustry R&D Tax Incentive registration | Karen + accountant | 30 Apr 2026 | In progress |
| Sprint 4 QA sign-off | Karthik | TBC | Pending |

---

## Feedback

Karen and Karthik submit feedback via **GitHub Issues** using issue templates:
- **Design Feedback (Karen)** — UI, brand, Figma mockups
- **QA Report (Karthik)** — bugs, technical issues, QA findings

Dennis reviews and labels each issue:
- `accept` — implement this sprint
- `reject` — won't implement (reason in comment)
- `defer` — good idea, not this sprint

**Only implement issues labelled `accept`.**
Check with: `gh issue list --label accept`

---

## Done This Sprint

- Context file consolidation (deleted 3 obsolete .md files, trimmed CLAUDE_CODE_PROMPT)
- GitHub Issue Templates for Karen (design) and Karthik (QA)
- `/review` dashboard page — styled sprint review UI for Karen and Karthik
- Fixed Vercel build failure (dynamic import for @platform-trust/security-gate)
- Verified material/system selection panel already shipped in v0.3.0 — updated docs

---

## References

- Full project state: `.context/PROJECT_STATE.md`
- Previous sprint briefs: `briefs/v0.1.0-baseline.md`, `briefs/v0.2.0-sprint2-brief.md`
- Architecture decisions: `.context/DECISIONS.md`
