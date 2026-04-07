# MMC Build — Project State
_Last updated: 2026-04-08 by Dennis McMahon_
_Engagement: GBTA-MMC-2026-001_

---

## Current Sprint
**v0.4.0** — Sprint 4
Client feedback and iteration phase (Stages 0–5 complete as of Week 5)

---

## Platform Status

| Module       | Status        | Notes                                                              |
|--------------|---------------|--------------------------------------------------------------------|
| MMC Comply   | ✅ Live        | NCC compliance AI + RAG pipeline operational                       |
| MMC Build    | ✅ Live        | Design optimisation + 3D viewer + system selection panel operational                    |
| MMC Quote    | ✅ Live        | Supplier spec knowledge base operational                           |
| MMC Direct   | ✅ Live        | Trade/consultant directory operational                             |
| MMC Train    | ✅ Live        | Self-paced modules + progress tracking operational                 |
| Billing      | ✅ Live        | Stripe test mode — 60-day free trial into paid subscription        |

---

## Blocking Items

| Item | Owner | Due | Status |
|------|-------|-----|--------|
| Figma design mockups (correct versions) | Karen Van Den Engen | Overdue | ❌ Not received |
| AusIndustry R&D Tax Incentive registration | Karen + accountant | **30 Apr 2026 HARD DEADLINE** | ⚠️ In progress |
| Sprint 4 QA sign-off | Karthik Rao | TBC | ⏳ Pending |

---

## Pending Implementation
_Items approved by Dennis, ready for Claude Code to action this session._

| # | Source | Item | Module | Priority |
|---|--------|------|--------|----------|
| — | — | No pending code items | — | — |

_Check GitHub Issues for newly accepted items: `gh issue list --label accept`_

---

## Recently Completed

| Version | Description |
|---------|-------------|
| v0.3.0 | All Sprint 3 code items shipped in single deployment commit |
| v0.3.0 | Material/system selection panel — 6-system toggle, JSONB storage, injected into Comply/Build/Quote AI prompts |
| v0.3.0 | All six modules built and deployed simultaneously |
| v0.4.0 | Context consolidation, GitHub Issue templates for Karen/Karthik, /review dashboard page |
| Stages 0–5 | Complete by Week 5 of 14-week contract |

---

## Key Architectural Decisions
_Full log in `.context/DECISIONS.md`_

| ADR | Decision | Status |
|-----|----------|--------|
| ADR-001 | Next.js / Vercel / Supabase over PRD-specified AWS/FastAPI — speed, cost, AU data residency | Final |
| ADR-002 | All six modules built simultaneously rather than sequentially | Final |
| ADR-003 | R&D evidence module built with clean architectural separation for future standalone SaaS extraction | Active |
| ADR-004 | Inngest for cron and webhook infrastructure | Final |
| ADR-005 | Resend for email, Stripe for billing | Final |

---

## Stack Reference

| Layer | Technology |
|-------|------------|
| Frontend | Next.js / TypeScript / Tailwind |
| Backend | Node.js / TypeScript |
| Database | Supabase PostgreSQL + pgvector (Sydney region) |
| Storage | Supabase Storage (Sydney region) |
| Job queue | Inngest |
| Deployment | Vercel |
| Primary LLM | Anthropic Claude |
| Embeddings / fallback | OpenAI |
| Email | Resend |
| Billing | Stripe |

---

## Vercel Projects

| Project | ID |
|---------|----|
| MMC Build | prj_qKKLAkGGGVH5KocDfoGZQOqIZGvj |
| R&D Portal | prj_6fiASaGSs4EnvSha26AY4Q7luzDt |
| Team | team_hwN7IFtd2Fo3DCj9C67ZwI1t (Corporate AI Solutions) |

---

## Jira

| Item | Detail |
|------|--------|
| Instance | corporateaisolutions-team.atlassian.net |
| Project key | SCRUM |
| Board ID | 1 |
| Sprint 3 | Loaded — code items shipped |

---

## Team Access

| Person | GitHub | Role | Repo Access |
|--------|--------|------|-------------|
| Dennis McMahon | @dennissolver | Developer / Owner | Full |
| Karen Van Den Engen | TBC | Client / Co-founder | GitHub Issues only (Design Feedback template) |
| Karthik Rao | TBC | Technical Co-founder | GitHub Issues only (QA Report template) |

---

## R&D Evidence Notes
_For AusIndustry R&D Tax Incentive — registration deadline 30 Apr 2026_

Core R&D activities (novel, eligible):
- NCC compliance AI engine and RAG pipeline
- Design optimisation inference
- Confidence scoring system
- Multi-format document parsing
- AI cost estimation engine

Supporting R&D (eligible):
- Benchmark suites
- Retraining pipelines
- Experiment logging
- Prompt engineering iterations

Excluded (routine development):
- UI/UX implementation
- Auth and RBAC
- Billing integration
- Content modules

Governing test: would a competent professional know the outcome in advance? (ATO/AusIndustry standard)

---

## Nudge System
12-nudge notification system extending daily digest cron infrastructure.
Nudges fire to Karen if sprint actions remain incomplete after 5 days.
Infrastructure: Inngest cron → Resend email templates.

---

_Next update due: after Sprint 4 review session_