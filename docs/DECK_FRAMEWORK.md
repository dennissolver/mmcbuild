# MMC Build — Client Presentation Deck Framework

> **Purpose:** Template for Claude to generate a polished developer-to-client presentation deck.
> **Usage:** Reference this framework when asked to generate a deck, slide content, or client update.
> **Output format:** Markdown slides (convertible to Google Slides, Keynote, or Marp PDF).

---

## Deck Structure

Each section below is a slide group. Claude should populate with current project data, pulling from code, migrations, and docs as needed.

---

### SLIDE GROUP 1: TITLE & CONTEXT

#### Slide 1.1 — Cover
- **Title:** MMC Build — AI-Powered Construction Intelligence Platform
- **Subtitle:** Development Progress & Technical Architecture Review
- **Client:** MMC Build Pty Ltd / Global Buildtech Australia Pty Ltd
- **Developer:** Corporate AI Solutions
- **Date:** `{current_date}`
- **Confidentiality:** Confidential — For Client Review Only

#### Slide 1.2 — Agenda
- What we've built (Stages 0–7)
- How it works (AI architecture)
- What protects your data (security & trust layers)
- What's next (remaining deliverables)
- Live demo / Q&A

---

### SLIDE GROUP 2: EXECUTIVE SUMMARY

#### Slide 2.1 — Delivery Snapshot
| Metric | Value |
|--------|-------|
| Stages Complete | `{count_complete}` of 8 |
| Database Migrations | `{migration_count}` |
| React Components | `{component_count}` |
| AI Models Orchestrated | 6 across 3 providers |
| Background Jobs | 15 async pipelines |
| Test Coverage | `{test_count}` passing tests |
| Deployment | Vercel (auto-deploy from main) |

> **Instruction to Claude:** Count these from the actual codebase. Use `ls supabase/migrations/`, `find src/components -name '*.tsx'`, etc.

#### Slide 2.2 — Timeline vs. Plan
- Original estimate: 14 weeks
- Current pace: `{weeks_elapsed}` weeks, `{stages_complete}` stages delivered
- Stretch goals achieved: 3D spatial viewer, AI lesson generation, holding cost calculator
- Chart: Gantt-style showing planned vs. actual per stage

---

### SLIDE GROUP 3: MODULES DELIVERED

> **Instruction to Claude:** For each module, include:
> - What it does (1-2 sentences, non-technical)
> - Key capabilities (3-4 bullet points)
> - Screenshot placeholder or UI component list
> - Unique technical differentiator

#### Slide 3.1 — Foundation (Stage 0)
- Multi-tenant database with 29 migrations
- Role-based access (Owner, Admin, Manager, Employee, Contractor, Viewer)
- Async job queue (Inngest) for AI pipelines
- R&D tracking infrastructure (hypothesis → evidence → artifact)

#### Slide 3.2 — MMC Comply (Stages 1-2)
- **What:** Upload building plans, get NCC compliance analysis in minutes
- NCC-aware RAG pipeline with query expansion & cross-encoder reranking
- Agentic AI workflow: 4 tools, phased parallel execution across 14 NCC categories
- Multi-model cross-validation (Tier 1: fire/structural/bushfire, Tier 2: energy/waterproofing)
- Learning feedback loop: accuracy improves with every thumbs up/down
- Remediation workflow with email notifications

#### Slide 3.3 — MMC Build (Stage 3)
- **What:** AI analyses designs and suggests modular construction optimisations
- 3D spatial extraction from building plans (stretch goal)
- Interactive Three.js viewer with before/after comparison
- Design improvement metrics (time, cost, waste savings)
- Teal-themed UI with report generation

#### Slide 3.4 — MMC Quote (Stage 4)
- **What:** AI-powered cost estimation with Australian benchmarks
- Agentic pipeline: 6 tools (extract quantities, lookup rates, regional adjustment, etc.)
- 70+ Australian cost rates across 8 states/territories
- Holding cost calculator (construction duration impact on financing)
- Per-organisation rate overrides for custom pricing
- Violet-themed UI

#### Slide 3.5 — MMC Direct (Stage 5)
- **What:** Trade directory connecting builders with verified professionals
- 18 trade types with ABN/licence verification
- Professional self-registration with admin review
- Star rating & review system with aggregate scoring

#### Slide 3.6 — MMC Train (Stage 6)
- **What:** Learning management for construction industry training
- Course CMS with draft/published/archived lifecycle
- AI-generated lesson plans and quiz content (Inngest)
- Sequential progression with PDF certificate issuance

#### Slide 3.7 — Billing (Stage 7)
- **What:** Stripe-powered subscriptions with per-module pricing
- Per-module plans: Comply $99, Build $79, Quote $99, Direct $49, Train $49/mo
- Bundled plans: Basic $149, Professional $399, Enterprise custom
- Dual paywall enforcement (middleware + Server Action)
- 60-day trial with 3-run cap
- Usage metering with visual ring indicator

---

### SLIDE GROUP 4: AI ARCHITECTURE

> **Instruction to Claude:** This is the technical credibility section. Show the client that the AI isn't a black box — it's an engineered system with routing, fallbacks, validation, and learning.

#### Slide 4.1 — Multi-Model Intelligence
- **Model Registry:** 6 models across Anthropic, OpenAI, HuggingFace
- **Smart Routing:** Each AI function routes to the best model with automatic fallback
- **Cost Optimisation:** Haiku for lightweight tasks, Sonnet for analysis, GPT-4o for validation
- Diagram: Function → Router → Provider chain

#### Slide 4.2 — Agentic Workflows
- Compliance agent: 4 tools, parallel execution across NCC categories
- Cost estimation agent: 6 tools, 6-phase parallel pipeline
- Tool-calling pattern: AI decides which tools to use, when, and in what order
- Diagram: Agent loop (Plan → Tool Call → Observe → Decide)

#### Slide 4.3 — Enhanced RAG Pipeline
- Query expansion (AI generates multiple search angles)
- Hybrid search: vector similarity + full-text (TSVECTOR)
- Cross-encoder reranking (HuggingFace BGE v2-m3)
- Result: higher relevance, fewer hallucinations

#### Slide 4.4 — Cross-Validation & Learning
- Critical findings verified by a second AI model
- Agreement scoring: both models must align on severity
- Feedback loop: user ratings calibrate future confidence scores
- Per-category accuracy tracking over time

---

### SLIDE GROUP 5: SECURITY & TRUST LAYERS

> **Instruction to Claude:** This is the differentiator section. Most AI construction tools have zero security architecture. Show every layer, sourced from both MMC Build's own patterns AND the Corporate AI common modules.

#### Slide 5.1 — Security Architecture Overview
- Diagram: Layered cake showing all 7 layers below
- Message: "Enterprise-grade security isn't bolted on — it's built into every layer"

#### Slide 5.2 — Layer 1: Data Isolation (Row-Level Security)
- **Source:** MMC Build core + Supabase
- Every table has RLS policies scoped to `get_user_org_id()`
- No organisation can ever access another's data — enforced at the database level
- Service-role bypass only for system operations (audit logging, background jobs)
- 29 migrations, all with RLS policies

#### Slide 5.3 — Layer 2: Authentication & Role-Based Access
- **Source:** MMC Build core
- Supabase Auth with email/password + magic link
- 6 roles: Owner → Admin → Manager → Employee → Contractor → Viewer
- Role checked at middleware (page access) and Server Action (data mutation) levels
- Invitation-based onboarding with org-scoped membership

#### Slide 5.4 — Layer 3: PII Detection & Redaction
- **Source:** Corporate AI Common — `data-classifier.js`
- All text is scanned before reaching any AI model
- **Always blocked:** API keys, tokens, passwords, private keys
- **Auto-redacted:** Email addresses, phone numbers, TFN, ABN, Medicare numbers, credit cards, BSB numbers
- **Flagged:** Legally privileged content, medical records, financial data
- Australian-specific patterns (TFN, ABN, Medicare, QBCC licence numbers)

#### Slide 5.5 — Layer 4: Credential Management
- **Source:** Corporate AI Common — `credential-vault.js`
- No secrets in code, config files, or client-side bundles
- Supabase Vault (pgsodium encryption) for production secrets
- Environment variables for development only
- All AI API keys restricted to server-side execution

#### Slide 5.6 — Layer 5: Immutable Audit Trail
- **Source:** Corporate AI Common — `audit-logger.js` + Platform Trust observability
- Every AI call logged: model, tokens, cost, function, latency, org
- Every tool invocation logged with sanitised inputs/outputs
- Insert-only design — audit records cannot be modified or deleted
- Supports incident reconstruction and compliance reporting
- Secret values automatically stripped from log entries

#### Slide 5.7 — Layer 6: Consent & Privacy Compliance
- **Source:** Corporate AI Common — `consent-manager.js`
- Australian Privacy Act (APP 11) compliance
- Workplace Surveillance Act 2005 (NSW) consent requirements
- Granular consent types: activity tracking, email access, CRM access, coaching, task delegation
- Consent checked before every data access — not just at login
- Full consent audit trail with IP address and timestamp

#### Slide 5.8 — Layer 7: Data Retention & Right to Erasure
- **Source:** Corporate AI Common — `data-retention.js`
- Configurable retention periods per organisation (default 90 days)
- Auto-purge of expired activity logs, chat messages, audit summaries
- Protected tables that are never purged (consent records, org data)
- Complete user data erasure capability (Privacy Act right to erasure)
- Preview mode: see what would be deleted before running

#### Slide 5.9 — Layer 8: Agent Permission Governance
- **Source:** Corporate AI Common — `tool-permissions.js` + Platform Trust permissions
- Every AI agent has explicit read/write permissions
- Deny-list always wins over allow-list (fail-safe)
- Token budget limits per agent (prevent runaway AI costs)
- Human-in-the-loop approval gates for write/delete operations

#### Slide 5.10 — Layer 9: Platform Trust Infrastructure
- **Source:** Platform Trust (standalone service)
- Automated vulnerability scanning on every deploy
- Agent quality evaluation (Karpathy Loop — binary scoring, degradation alerts)
- Cost metering with budget alerts and per-project attribution
- Rate limiting per agent (burst/sustained/budget windows)
- Public trust badge for compliance certification
- Compliance targets: AU Privacy Act, OWASP ASVS Level 2, SOC 2 Type II ready

---

### SLIDE GROUP 6: INFRASTRUCTURE & OPERATIONS

#### Slide 6.1 — Tech Stack Summary
| Layer | Technology | Why |
|-------|-----------|-----|
| Frontend | Next.js 16, React, TypeScript, Tailwind | Server Components, zero JS where possible |
| Database | Supabase (PostgreSQL + pgvector) | RLS, realtime, vector search, AU-hosted (Sydney) |
| AI | Claude Sonnet + Haiku, GPT-4o, HuggingFace | Multi-model routing with fallbacks |
| Jobs | Inngest | Durable async pipelines, retry, observability |
| Payments | Stripe | Industry standard, webhook-driven |
| Hosting | Vercel | Auto-deploy, edge functions, analytics |
| Email | Resend | Transactional emails (notifications, certs) |

#### Slide 6.2 — Database Architecture
- 29 SQL migrations, fully version-controlled
- pgvector for semantic search (NCC clause embeddings)
- RLS on every table (no exceptions)
- Audit trail tables (insert-only)
- R&D tracking tables (hypothesis → experiment → evidence)

#### Slide 6.3 — Deployment & Monitoring
- Git push → Vercel auto-deploy (< 2 min)
- Inngest dashboard for background job monitoring
- AI usage logging (model, tokens, cost, latency per call)
- Stripe webhooks for billing event sync
- Error tracking via Vercel logs

---

### SLIDE GROUP 7: COMMERCIAL VALUE

#### Slide 7.1 — R&D Tax Incentive Eligibility
- R&D tracking built into the platform from day one
- Hypothesis → Experiment → Artifact → Evidence chain
- Auto-classification of development commits
- R&D-eligible spend: $31,450 of $60,350 contract value
- Evidence pack ready for ATO submission

#### Slide 7.2 — Revenue Model
| Plan | Monthly | Included |
|------|---------|----------|
| Basic | $149 | 10 compliance runs, 1 module |
| Professional | $399 | 30 runs, all modules |
| Enterprise | Custom | Unlimited, dedicated support |
| Per-module | $49–$99 | Individual module subscriptions |

- AI cost per compliance run: ~$0.50
- Gross margin per run at Professional tier: ~96%

#### Slide 7.3 — Competitive Differentiation
- **vs. Manual compliance:** Hours → minutes, consistent quality
- **vs. Generic AI tools:** NCC-trained RAG, cross-validation, Australian cost rates
- **vs. Other contech:** Agentic workflows (not just chat), 3D spatial analysis, learning feedback loop
- **Security:** Most contech AI tools have zero data governance — MMC Build has 9 layers

---

### SLIDE GROUP 8: WHAT'S NEXT

#### Slide 8.1 — Remaining Deliverables
- [ ] Complete Stripe billing integration (Stage 7)
- [ ] Pilot onboarding: 5-10 construction firms (Stage 8)
- [ ] Feedback iteration cycle
- [ ] AI retraining with pilot data
- [ ] Post-pilot survey & metrics collection
- [ ] Handover documentation + R&D evidence pack

#### Slide 8.2 — Future Roadmap (Post-MVP)
- Property intelligence integration (LGA planning rules, zoning, overlays)
- Site intelligence expansion (geospatial data, flood/bushfire mapping)
- Advanced 3D modelling & BIM integration
- Multi-state NCC version support
- White-label capability for builder groups

---

### SLIDE GROUP 9: APPENDIX

#### Slide 9.1 — Database Schema Summary
> **Instruction to Claude:** Generate from `ls supabase/migrations/` — table name, purpose, key columns

#### Slide 9.2 — AI Model Registry
> **Instruction to Claude:** Generate from `src/lib/ai/models/registry.ts` — model, provider, tier, context window, cost

#### Slide 9.3 — API Endpoint Inventory
> **Instruction to Claude:** Generate from `ls src/app/api/` — endpoint, method, purpose

#### Slide 9.4 — Component Inventory
> **Instruction to Claude:** Count components per module from `src/components/`

#### Slide 9.5 — Full Security Module Reference
> **Instruction to Claude:** List every security module from corporate-ai-common with its factory function and key methods

---

## Generation Instructions for Claude

When asked to generate a deck from this framework:

1. **Read the codebase** to populate all `{placeholder}` values with real counts
2. **Tailor the depth** to the audience:
   - **Executive/non-technical:** Emphasise Slides 2, 3, 5.1, 7 — skip architecture details
   - **Technical stakeholder:** Full deck including Groups 4 and 6
   - **Investor/board:** Emphasise Groups 2, 5, 7 — commercial value + security moat
3. **Output format options:**
   - `markdown` — Marp-compatible slides (default)
   - `html` — Self-contained reveal.js presentation
   - `outline` — Bullet-point outline for Google Slides / Keynote
4. **Tone:** Professional but accessible. No jargon without explanation. Show credibility through specifics, not buzzwords.
5. **Always include:** The security layers section (Group 5) — this is the differentiator that justifies the Corporate AI Solutions partnership.
6. **Screenshots:** Mark `[SCREENSHOT: {description}]` placeholders for manual addition.

## Slide Styling Guide

- **Primary colour:** Emerald (#059669) — MMC Build brand
- **Accent colours:** Teal (Build module), Violet (Quote module), Blue (Direct), Amber (Train)
- **Typography:** Inter for headings, system font for body
- **Diagrams:** Use Mermaid syntax for Claude to generate architecture diagrams inline
- **Data visualisation:** Use simple tables and bullet metrics — avoid complex charts in Markdown output
