# MMC Build MVP — Amended Quotation

**Amendment A1 to GBTA-MMC-2026-001**

---

**Prepared by**
Global Buildtech Australia Pty Ltd
ABN 54 672 395 685

**For**
MMC Build Pty Ltd
Karen Van Den Engel, Founder & CEO

**Date:** 30 March 2026
**Original Quotation:** 24 February 2026 (GBTA-MMC-2026-001)
**Reference:** GBTA-MMC-2026-001-A1

**COMMERCIAL IN CONFIDENCE**

---

## 1. Purpose of Amendment

This document amends the original quotation GBTA-MMC-2026-001 dated 24 February 2026 to reflect the actual deliverables completed to date and the revised payment schedule.

Development has progressed significantly ahead of the original 14-week timeline. At the time of this amendment (Week 5), Stages 0 through 5 have been completed and Stage 6 is in progress. The AI architecture delivered materially exceeds the original specification, including agentic workflows, multi-model cross-validation, and a feedback learning loop not scoped in the original quotation.

**The total contract price remains unchanged at $60,350 + GST ($66,385 incl. GST).**

All other terms from the original quotation (Section 9: General Terms) remain in force unless expressly amended below.

---

## 2. Pricing Summary (Unchanged)

| | Amount |
|---|---|
| Quoted price (ex GST) | **$60,350** |
| GST (10%) | $6,035 |
| **Total incl. GST** | **$66,385** |
| R&D eligible spend (37 days x $850) | $31,450 |
| R&D Tax Offset (43.5% of eligible spend) | -$13,681 |
| **Effective net cost to MMC Build (ex GST)** | **$46,669** |

Daily rate, total effort (71 days), R&D eligible days (37), and R&D offset estimates are unchanged from the original quotation.

---

## 3. Amended Stage Deliverables

### Stage 0: Project Setup & Foundation — 3 days | $2,550

**Status: COMPLETE**
Weeks 1-2 | R&D eligible: 1 day

Delivered as quoted, with the following additions:

| Deliverable | Description | Status |
|---|---|---|
| Supabase project (Sydney) | PostgreSQL with pgvector, Auth, Storage, RLS for multi-tenancy | Delivered |
| Vercel project + CI/CD | Next.js deployed to Vercel, GitHub auto-deploy | Delivered |
| Database schema v1 | 29 migrations (3,048 lines SQL): organisations, profiles, projects, plans, reports, feedback, audit_log, R&D evidence tables. RLS enforced on all tables | Delivered |
| Authentication & RBAC | Supabase Auth: email + OAuth. JWT tokens. 6 roles: Owner, Admin, Architect, Builder, Trade, Viewer. Invitation flow | Delivered |
| Application scaffolding | Next.js 16 App Router, Tailwind + shadcn/ui, typed Supabase client, Server Actions pattern, middleware-based route protection | Delivered |
| Inngest integration | Client connected, webhook endpoint, 15 async functions deployed | Delivered |
| R&D evidence infrastructure | Hypothesis register, experiment logger, AI-powered R&D commit classification, evidence artifact storage. Database tables and auto-classification via Inngest | Delivered |
| Shared database helper | `db()` helper for typed Supabase queries on tables not yet in generated types | Delivered |

---

### Stage 1: MMC Comply — NCC Compliance Engine — 20 days | $17,000

**Status: COMPLETE**
Weeks 2-6 | R&D eligible: 14 days (Core R&D)

Delivered as quoted, with significant enhancements to the AI architecture:

| Deliverable | Description | R&D | Status |
|---|---|---|---|
| Plan upload interface | Drag-and-drop PDF upload with validation. Supabase Storage with metadata | -- | Delivered |
| Document processing pipeline | PDF text extraction, segmentation. Multi-step Inngest function with real-time status updates | -- | Delivered |
| NCC knowledge base | NCC content ingestion, chunking, embedding. pgvector storage with clause metadata. Multi-format support (PDF, DOCX, images) | Core | Delivered |
| Embedding pipeline | OpenAI text-embedding-3-small vectors. pgvector similarity + TSVECTOR full-text hybrid retrieval | Core | Delivered |
| **Enhanced RAG pipeline** | Query expansion (Haiku), multi-query retrieval, TSVECTOR hybrid search, HuggingFace BGE cross-encoder reranking. Exceeds original spec of basic RAG | Core | **Delivered (enhanced)** |
| Guided questionnaire | Dynamic form: building class, climate zone, site conditions. Responses feed AI context | -- | Delivered |
| **AI compliance analysis — Agentic workflow** | Tool-using agent with 4 tools (lookup NCC clause, get related findings, retrieve additional context, flag dependencies). Phased parallel execution across 14 NCC categories. Exceeds original spec of multi-pass analysis | Core | **Delivered (enhanced)** |
| **Multi-model cross-validation** | Tier 1 (fire/structural/bushfire) and Tier 2 (energy/waterproofing/weatherproofing) findings validated by secondary AI model. Agreement scoring, disagreement reconciliation, conservative severity merging. Not in original spec | Core | **Delivered (new)** |
| **Model registry & intelligent routing** | 6 AI models across 3 providers (Anthropic, OpenAI, HuggingFace). Function-to-model routing with automatic fallback chains. Cost tracking per call. Not in original spec | Core | **Delivered (new)** |
| Compliance report | Interactive report viewer: executive summary, category rollup, clause-by-clause findings, risk flags, severity badges, NCC citations. Export to PDF + CSV | -- | Delivered |
| **Feedback & learning loop** | Per-finding thumbs up/down ratings. Historical accuracy tracking per category. Confidence calibration (+/-5-10% based on feedback history). Few-shot prompt enrichment from validated findings. Exceeds original spec of basic feedback | Core | **Delivered (enhanced)** |
| **AI usage tracking** | Every AI call logged to `ai_usage_log` table with model, tokens, cost, function, latency. Not in original spec | Supporting | **Delivered (new)** |
| Prompt engineering | Model selection logic via registry. Fallback chains. Experiment documentation | Core | Delivered |
| Precision benchmarking | Benchmark scenarios for compliance categories | Core | Delivered |
| Remediation workflow | Finding amendment, rejection, sharing via email. Team collaboration on findings. Not in original spec | -- | **Delivered (new)** |

**UI Components Delivered:** 27 React components for the Comply module including plan dropzone, questionnaire form, check progress, finding cards, category rollup, risk summary, feedback widget, export controls, remediation workflow, and team collaboration.

---

### Stage 2: MMC Build — Design Optimisation — 15 days | $12,750

**Status: COMPLETE**
Weeks 5-8 | R&D eligible: 10 days (Core R&D)

Delivered as quoted, with the addition of 3D spatial analysis:

| Deliverable | Description | R&D | Status |
|---|---|---|---|
| MMC methods knowledge base | Curated dataset: prefab, SIPs, CLT, panelised, modular. Embedded for RAG retrieval | Core | Delivered |
| Design analysis engine | AI pipeline analysing plans for MMC opportunities. 8 fields per suggestion: current approach, alternative, benefits, time/cost/waste savings, complexity, confidence | Core | Delivered |
| **3D spatial extraction & viewer** | AI-powered spatial layout extraction from plans. Geometric calculations (wall detection, room bounds, openings). Interactive 3D plan viewer with before/after comparison. Originally noted as stretch goal; delivered in full | Core | **Delivered (stretch goal achieved)** |
| Original vs Optimised view | Side-by-side 3D comparison with annotation layer. Aggregate improvement metrics | -- | Delivered |
| Design optimisation report | PDF report: recommendations, estimated savings, MMC method references, complexity badges, confidence scoring | -- | Delivered |
| Accuracy vs expert review | Documented for R&D evidence | Core | Delivered |

**UI Components Delivered:** 8 React components including 3D plan viewer, 3D comparison view, design report, suggestion cards, optimisation progress, and trigger controls.

---

### Stage 3: MMC Quote — Cost Estimation — 10 days | $8,500

**Status: COMPLETE**
Weeks 7-9 | R&D eligible: 7 days (Core R&D)

Delivered as quoted, with agentic architecture and Australian cost benchmarks:

| Deliverable | Description | R&D | Status |
|---|---|---|---|
| **Supplier / cost rate knowledge base** | 70+ seeded Australian cost rates across 15+ categories. State-based adjustments (all 8 states/territories). Year-indexed rates (2025 baseline). Traditional vs MMC pricing per element. Per-org rate overrides | Core | **Delivered (enhanced)** |
| **Cost estimation engine — Agentic workflow** | Tool-using agent with 6 tools: extract quantities, lookup cost rate, get design suggestions, apply regional adjustment, get prior estimates, flag cost dependencies. 6-phase parallel execution. Exceeds original spec | Core | **Delivered (enhanced)** |
| **Holding cost calculator** | Construction duration impact on financing costs. Regional interest rate adjustments. Not in original spec | Core | **Delivered (new)** |
| Interactive quote builder | Line items, quantities, costs by category. Traditional vs MMC comparison. User can adjust and override. Summary with confidence bands | -- | Delivered |
| Quote export | PDF report: itemised cost breakdown, supplier references, assumptions, savings summary | -- | Delivered |

**UI Components Delivered:** 8 React components including cost estimate dashboard, line item detail cards, traditional vs MMC comparison, savings calculator, rate customisation interface, and PDF export.

**Inngest Functions:** `run-cost-estimation` (agentic analysis), `ingest-cost-rates` (rate database seeding/updates).

---

### Stage 4: MMC Direct — Trade Directory — 5 days | $4,250

**Status: COMPLETE**
Weeks 9-10 | R&D eligible: 0 days

Delivered as quoted with full verification and lead management:

| Deliverable | Description | Status |
|---|---|---|
| Directory data model | 18 trade types (builder through to landscaper). Professional profiles with ABN, licence, insurance verification, star ratings, specialisations (MMC methods: CLT, SIP, prefab, modular). Seed data | Delivered |
| Profile pages | Company/professional profile: ABN, licences, certifications, service areas, compliance score. Logo + cover images. Portfolio gallery | Delivered |
| Search & filtering | Category browsing + multi-filter: all 8 Australian states, specialty, certification, rating. Full-text search via tsvector | Delivered |
| Shortlist & contact | Lead management system with enquiry statuses (new/read/replied/archived). Enquiry notification via Inngest | Delivered |
| **Professional registration** | Self-service registration flow for trade professionals. Admin verification dashboard. Not in original spec | **Delivered (new)** |
| **Review system** | Star ratings with review aggregation via database trigger. One review per org per professional | **Delivered (new)** |

**UI Components Delivered:** 11 React components including directory search, professional cards, review system, portfolio gallery, enquiry form, admin dashboard, and registration flow.

---

### Stage 5: MMC Train — Training Modules — 5 days | $4,250

**Status: COMPLETE**
Weeks 10-11 | R&D eligible: 0 days

Delivered as quoted with AI-powered content generation:

| Deliverable | Description | Status |
|---|---|---|
| Course CMS | Courses with status (draft/published/archived), difficulty levels, full-text search. Admin creation interface with lesson editor | Delivered |
| Learner interface | Course catalogue, lesson viewer, sequential progression, quiz engine with scoring | Delivered |
| Progress & certificates | Per-user enrolment dashboard. Completion tracking across sessions. Auto-generated PDF certificates via jsPDF | Delivered |
| **AI content generation** | AI generates full lesson plans, lesson content, and quiz questions from course metadata. Inngest function `generate-training-content`. Not in original spec | **Delivered (new)** |

**UI Components Delivered:** 13 React components including course listing, lesson viewer, quiz interface, progress tracking, certificate display, admin course creation, and enrolment analytics.

---

### Stage 6: Billing, Observability & Launch — 3 days | $2,550

**Status: IN PROGRESS**
Weeks 11-12 | R&D eligible: 1 day

Billing implementation is substantially complete. Observability, security review, E2E testing, and pilot launch package remain.

| Deliverable | Description | R&D | Status |
|---|---|---|---|
| Stripe billing | Per-module subscriptions (Comply $99, Build $79, Quote $99, Direct $49, Train $49/mo) + legacy bundled plans (Basic $149, Professional $399). Embedded checkout. 5-event webhook handler. Customer portal. 14-day trial with 3 runs | -- | **Delivered** |
| Paywall enforcement | Dual paywall: middleware-level (UX) + Server Action-level (correctness). Atomic usage increment via `increment_usage()` RPC. Hard trial cutoff | -- | **Delivered** |
| Usage metering | Per-subscription usage tracking. Trial usage fallback. Usage ring visualisation | -- | **Delivered** |
| Observability | Vercel Analytics + Sentry. AI metrics dashboard. Alerting | -- | Pending |
| AI model observability | Benchmark regression suite. Drift monitoring. Feedback loop pipeline | Supporting | Partial (feedback loop delivered in Stage 1) |
| Security review | TLS enforced. RLS audit. RBAC verification. Audit trail | -- | Pending |
| E2E testing | Integration + UAT test suite across all modules. Vitest framework with 14 billing tests passing | -- | Partial |
| Pilot launch package | Invite-only onboarding. In-app feedback. Welcome emails | -- | Pending |

**UI Components Delivered:** 6 React components including billing page with emerald theme, usage ring, trial banner, inline upgrade card, payment success card, and plan comparison table.

**Blocker:** Stripe price IDs (STRIPE_BASIC_PRICE_ID, STRIPE_PROFESSIONAL_PRICE_ID, per-module price IDs) need to be created in the Stripe dashboard by MMC Build and added to environment variables.

---

### Stage 7: Pilot, Iteration & Handover — 10 days | $8,500

**Status: NOT STARTED**
Weeks 12-14 | R&D eligible: 4 days

Deliverables unchanged from original quotation:

| Deliverable | Description | R&D | Status |
|---|---|---|---|
| Pilot onboarding | Onboard 5-10 firms. Guided walkthroughs of Comply, Build, Quote | -- | Pending |
| Feedback & iteration | Weekly feedback review. Prioritised bug fixes and UX improvements | -- | Pending |
| AI retraining cycle | Incorporate corrections. Re-run benchmarks. Document outcomes | Supporting | Pending |
| Post-pilot survey | Structured survey: usability, accuracy, value, willingness to pay | -- | Pending |
| Handover documentation | Architecture docs, deployment runbooks, API reference, operational playbook, backlog | -- | Pending |
| R&D evidence pack | Complete experiment report for AusIndustry. Evidence pack finalised | Supporting | Pending |

**Dependency:** 5-10 pilot firms to be confirmed by MMC Build.

---

## 4. Codebase Summary

| Metric | Count |
|---|---|
| React components | 126 total (66 feature-specific) |
| TypeScript library files | 106 |
| API routes | 9 endpoints |
| Inngest async functions | 15 |
| Database migrations | 29 (3,048 lines SQL) |
| Database tables | 50+ (all with RLS) |
| AI models registered | 6 across 3 providers |
| Cost rate benchmarks | 70+ |
| Unit tests | 14 (billing) |

---

## 5. Amended Payment Schedule

The original payment schedule was structured around sequential stage delivery over 14 weeks. Given that Stages 0-5 are complete and Stage 6 is substantially delivered at Week 5, the payment schedule is amended to reflect actual delivery milestones.

**Total contract value remains $60,350 + GST ($66,385).**

| Payment | Trigger | Stages Covered | Amount (ex GST) | Incl. GST | Status |
|---|---|---|---|---|---|
| Deposit (20%) | On acceptance of original quotation | -- | $12,070 | $13,277 | Due on original acceptance |
| Progress Payment 1 | Foundation + Compliance engine delivered and accepted | Stages 0 + 1 | $7,480 | $8,228 | Invoiceable now |
| Progress Payment 2 | Design Optimisation + Cost Estimation delivered and accepted | Stages 2 + 3 | $21,250 | $23,375 | Invoiceable now |
| Progress Payment 3 | Trade Directory + Training delivered and accepted | Stages 4 + 5 | $8,500 | $9,350 | Invoiceable now |
| Final Payment | Billing live + Pilot complete + Handover accepted | Stages 6 + 7 | $11,050 | $12,155 | On completion |
| **TOTAL** | | **Stages 0-7** | **$60,350** | **$66,385** | |

All invoices are payable within 14 days of issue. The Deposit is credited against Progress Payment 1 as per the original quotation.

### Payment Summary at Amendment Date (30 March 2026)

| Category | Ex GST | Incl. GST |
|---|---|---|
| Currently invoiceable (Deposit + Payments 1-3) | $49,300 | $54,230 |
| Remaining (Final Payment) | $11,050 | $12,155 |
| **Total** | **$60,350** | **$66,385** |

---

## 6. Amended Timeline

| Stage | Original Timeline | Actual Completion | Variance |
|---|---|---|---|
| Stage 0: Setup & Foundation | Weeks 1-2 | Week 2 | On schedule |
| Stage 1: MMC Comply | Weeks 2-6 | Week 4 | 2 weeks early |
| Stage 2: MMC Build | Weeks 5-8 | Week 4 | 4 weeks early |
| Stage 3: MMC Quote | Weeks 7-9 | Week 5 | 4 weeks early |
| Stage 4: MMC Direct | Weeks 9-10 | Week 5 | 5 weeks early |
| Stage 5: MMC Train | Weeks 10-11 | Week 5 | 6 weeks early |
| Stage 6: Billing & Launch | Weeks 11-12 | Week 5-6 (in progress) | ~6 weeks early |
| Stage 7: Pilot & Handover | Weeks 12-14 | TBD | -- |

**Estimated project completion: Week 8-10** (originally Week 14), subject to timely provision of client dependencies (Stripe account setup, pilot firm confirmation).

---

## 7. Value Delivered Beyond Original Scope

The following enhancements were delivered at no additional cost within the original $60,350 contract price. They represent material improvements to the platform's AI capabilities, commercial readiness, and competitive positioning:

| Enhancement | Original Spec | What Was Delivered | Impact |
|---|---|---|---|
| AI model architecture | Basic GPT-4 / Claude routing | 6-model registry across 3 providers with automatic fallback chains, cost tracking, usage logging | Production resilience; no single-vendor dependency |
| Compliance analysis | Multi-pass analysis | Agentic workflow with 4 tools, phased parallel execution, cross-category dependency detection | Higher accuracy; handles complex interdependent NCC requirements |
| Cross-validation | Not scoped | 3-tier validation system with secondary model verification on safety-critical findings | Reduced false negatives on fire, structural, bushfire findings |
| Feedback learning | Basic thumbs up/down | Confidence calibration, few-shot prompt enrichment, historical accuracy tracking per category | AI improves with use; measurable accuracy gains over time |
| Cost estimation | Basic AI pipeline | 6-tool agentic workflow with 70+ Australian cost benchmarks, state-based pricing, holding cost calculator | Production-ready cost estimation, not prototype |
| 3D viewer | Noted as stretch goal | Full 3D spatial extraction, interactive viewer, before/after comparison | Key differentiator for design optimisation module |
| AI content generation | Not scoped for Training | AI generates lesson plans, content, and quiz questions from course metadata | Dramatically reduces content creation effort |
| Trade directory | Basic directory | Full verification workflow, review aggregation, lead management, self-service registration | Marketplace-ready, not just a listing page |
| Per-module billing | Single subscription tier | Per-module subscriptions + bundled plans, dual paywall, atomic usage metering | Flexible monetisation; customers pay only for modules they use |

---

## 8. Outstanding Client Dependencies

| Dependency | Owner | Required For | Status |
|---|---|---|---|
| Stripe account setup + price IDs | MMC Build | Stage 6 completion | **Action required** |
| Stripe environment variables in Vercel | MMC Build | Stage 6 completion | **Action required** |
| 5-10 pilot firms confirmed | MMC Build | Stage 7 commencement | Pending |
| Domain + DNS + SSL (if custom domain) | MMC Build | Production deploy | Pending |
| Stage gate approval for Stages 0-5 | MMC Build | Payment schedule | **Action required** |

---

## 9. R&D Tax Incentive Evidence Framework

Unchanged from original quotation (Section 4). The R&D evidence infrastructure has been operational since Stage 0, with automated experiment logging and AI-powered R&D commit classification generating contemporaneous evidence throughout development.

The Important Disclaimer from the original quotation regarding R&D Tax Incentive figures continues to apply in full.

---

## 10. General Terms

All terms from Section 9 of the original quotation (GBTA-MMC-2026-001) remain in force, including:

- **Validity:** This amendment is valid for 30 days from 30 March 2026
- **GST:** All prices exclusive of GST. 10% added to all invoices
- **Payment Terms:** Payable within 14 days of invoice. Deposit credited against Progress Payment 1
- **Intellectual Property:** All code, documentation, and artifacts are the property of MMC Build Pty Ltd upon payment
- **Confidentiality:** Both parties maintain confidentiality
- **Scope Changes:** Further changes via written change request
- **Termination:** 14 days written notice; GBTA invoices for work completed
- **Warranty:** 30-day warranty following Stage 7 handover
- **Dependencies:** Timeline assumes timely provision of client dependencies

---

## 11. Acceptance

By signing below, both parties agree to the amended deliverables and payment schedule as set out in this document. This amendment supersedes the stage deliverables (Section 3) and payment schedule (Section 5) of the original quotation GBTA-MMC-2026-001 only. All other terms of the original quotation remain in full force.

&nbsp;

**For Global Buildtech Australia Pty Ltd:**

Signed: _______________________________________________

Name: Dennis McMahon

Position: Director

Date: _______________________________________________

&nbsp;

**For MMC Build Pty Ltd:**

Signed: _______________________________________________

Name: _______________________________________________

Position: _______________________________________________

Date: _______________________________________________
