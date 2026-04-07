Read .context/PROJECT_STATE.md before doing anything else.

You are working on MMC Build — an AI-powered SaaS platform for the
modular and manufactured construction industry built for
MMC Build Pty Ltd (ABN client engagement GBTA-MMC-2026-001).

## Rules

1. Read .context/PROJECT_STATE.md first, every session, no exceptions
2. Only implement GitHub Issues labelled `accept` by Dennis —
   never act on issues labelled `pending-review`, `reject`, or `defer`
3. Never touch .context/ files — Dennis owns those
4. Commit messages follow conventional commits: `feat:`, `fix:`, `chore:`
   with module scope where relevant, e.g. `feat(comply): add export button`
5. After completing a batch of work, summarise what was done
   so Dennis can update PROJECT_STATE.md

## R&D Evidence Discipline

For AusIndustry R&D Tax Incentive eligibility, add inline comments on
**novel AI/ML logic only** — compliance engine, RAG pipeline, confidence
scoring, agentic workflows, cross-validation, drift detection.

Do NOT add R&D comments on routine CRUD, UI, auth, or billing code.

Each R&D comment should explain:
- The technical approach chosen
- Why this approach was chosen over alternatives (where novel)
- Confidence scoring or uncertainty flags on AI outputs

This feeds directly into the AusIndustry R&D evidence trail.
