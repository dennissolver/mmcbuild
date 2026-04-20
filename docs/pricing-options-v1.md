# MMC Build — Usage-Based Pricing Options (v1)

**Prepared:** 20 April 2026
**Author:** Dennis McMahon
**Status:** Draft for commercial review
**Source data:** Live codebase call-counts, registry pricing (corrected — see §1 note)

---

## 0. Context

Current live pricing (per landing page):

| Tier | Price/mo | Included runs |
|------|----------|---------------|
| Basic | $149 | 10 compliance runs |
| Professional | $399 | 30 compliance runs |
| Enterprise | Custom | Unlimited |

These figures were set before empirical usage data existed. This paper models the actual marginal cost per user run from the code, validates whether current tiers are profitable, and proposes four alternative pricing structures with margin analysis. Recommended option at §4.

---

## 1. Cost per user run — derived from code

A single full builder persona run = Comply → Build → Quote = **22–26 AI calls** through `callModel()` in `src/lib/ai/models/router.ts`.

Token profile per call, from the action files and Inngest handlers:
- **Input:** large (~50k tokens including plan PDF text + retrieved NCC chunks)
- **Output:** medium (~2–3k tokens per call)

### Worst case — Claude Sonnet 4 for every call

| Module | Calls | Input tokens | Output tokens | Cost (USD) |
|--------|-------|--------------|---------------|------------|
| Comply | 10 | 500,000 | 20,000 | $1.80 |
| Build | 2 | 100,000 | 4,000 | $0.36 |
| Quote | 11 | 550,000 | 33,000 | $2.15 |
| **Total** | **23** | **1.15M** | **57k** | **$4.31** |

### Optimised — Sonnet for primary, Haiku for validator/summary, GPT-4o-mini for classification

| Module | Cost (USD) |
|--------|-----------|
| Comply | $1.20 |
| Build | $0.28 |
| Quote | $1.50 |
| **Total** | **~$3.00** |

### Plus fixed infra per run

| Item | Cost per run |
|------|--------------|
| Supabase storage + compute | ~$0.02 |
| Inngest function runs | ~$0.01 |
| Vercel function execution | ~$0.01 |
| Embeddings (new plan only) | ~$0.05 |
| **Infra total** | **~$0.09** |

**True marginal cost per full run: ~$3.10 (optimised) to ~$4.40 (worst case).**

### ⚠️ Registry bug flagged during this analysis

`src/lib/ai/models/registry.ts` labels fields `costPer1kInput`/`costPer1kOutput` but the values stored are **per-million** pricing (Claude Sonnet 4: $3/M input, stored as `3`). The `estimateCost()` formula divides by 1000 then multiplies by this value, overstating every logged cost by **1000×**. Every value in `ai_usage_log.estimated_cost_usd` and everything the `/settings/ai-performance` dashboard displays is currently inflated by three orders of magnitude. Raised as separate ticket (see §6).

---

## 2. Current pricing — margin analysis

Using corrected pricing and optimised inference:

| Tier | Price/mo | Runs | Revenue/run | Marginal cost | Margin/run | Margin % |
|------|----------|------|-------------|---------------|------------|----------|
| Basic | $149 | 10 | $14.90 | $3.10 | $11.80 | 79% |
| Professional | $399 | 30 | $13.30 | $3.10 | $10.20 | 77% |

Current pricing is **healthy** — ~77–79% gross margin at optimised inference.

But there is **no protection against outliers**. A 300-page commercial plan in Comply alone could burn $15 in tokens — that's a single-run loss under Basic's effective $14.90/run revenue. Builder personas uploading large commercial plans will erode margin silently.

---

## 3. Options

### Option A — Status quo (flat subscription, fixed runs)

**$149 / $399 / custom, caps at 10 / 30 / unlimited runs/mo.**

- ✅ Simple to explain, predictable for customer
- ✅ Current margins are fine on average
- ❌ No protection against a 300-page plan that costs $15 to process
- ❌ 31st run in a month is a hard block — friction for power users
- **Margin:** 77–79% average, but asymmetric downside

### Option B — Pay-per-run (fully metered)

**$15/run + $49/mo base (platform access, directory, training).**

- ✅ Always profitable (priced at 3× worst-case cost)
- ✅ No run limits — customers can scale freely
- ❌ Unpredictable monthly bill → sales friction
- ❌ Hostile for occasional users who want one run a quarter
- **Margin:** ~77% on every run, always

### Option C — Credit-based with plan-size weighting (**recommended**)

**Buy credits monthly; consume per-run based on detected plan size.**

| Plan type | Pages | Credits |
|-----------|-------|---------|
| Light | <30 pages | 1 credit |
| Medium | 30–100 pages | 2 credits |
| Heavy | >100 pages | 4 credits |

- Base plan ($149/mo) = 10 credits
- Additional credits: $15 each
- ✅ **Aligns cost with work** — big plans cost more, as they should
- ✅ **Outlier protection** — 300-page plan costs 4 credits, matching 4× inference cost
- ✅ **Familiar pattern** (OpenAI, Descript, Midjourney all do this)
- ✅ **Already instrumented** — `ai_usage_log` + page-count detection on upload exist
- ❌ Slightly higher explanation cost vs flat subscription
- **Margin:** 75–85% depending on run mix

### Option D — Hybrid subscription + overage

**$149/mo (10 runs included) + $20 per additional run.**

- ✅ Base plan feels familiar, overage removes hard limit
- ✅ Simpler to explain than credits
- ❌ Doesn't protect against single-run outliers
- **Margin:** 77% base, ~85% on overages

### Option E — Per-project pricing

**$299 per project (unlimited runs on one project for 90 days).**

- ✅ Matches builder mental model — they think in projects, not runs
- ✅ Encourages iteration (re-run Comply after design changes) → sticky
- ❌ Some projects could run 50+ times → margin erosion
- ❌ Harder to upsell once committed
- **Margin:** 50–90% variable

---

## 4. Recommendation

**Option C — Credit-based with plan-size weighting.**

Rationale:

1. **Margin protection** — heavy plans cost 4× credits, matching their 4× inference cost; outlier risk is priced in.
2. **Fair perception** — builders already think "bigger job = more work"; this extends naturally.
3. **Upsell path** — Basic 10 → Pro 35 → Enterprise unlimited, with credits as the universal currency across tiers.
4. **Already instrumented** — `ai_usage_log` + page-size detection on upload means credit calculation can happen automatically with no new infra.

Proposed tiers:

| Tier | Price/mo | Credits | ~Light runs | ~Heavy runs |
|------|----------|---------|-------------|-------------|
| Trial | Free | 3 | 3 | 0–1 |
| Basic | $149 | 10 | 10 | 2 |
| Professional | $399 | 35 | 35 | 8 |
| Enterprise | Custom | Custom | — | — |

---

## 5. Open risks

1. **Registry bug (P1)** — Fix before any pricing decision is made against the dashboard. Right now it reads 1000× too high.
2. **Assumptions unvalidated** — These costs are modelled from the code, not measured. SCRUM-73 exists to replace estimates with 10 real runs.
3. **Validator call volume** — If `compliance_validator` fires on every finding (not just low-confidence ones), costs could double. Needs empirical measurement.
4. **Caching upside** — Enabling Anthropic prompt caching on the repeated NCC knowledge base chunks should drop Comply cost by ~50%. Not yet enabled. Raised as part of this work.
5. **Model selection** — Current router defaults to Sonnet. Moving Train + summary to Haiku 4.5 alone would reduce cost by ~40% with acceptable quality trade-off.

---

## 6. Next actions

| # | Action | Owner | Effort | SCRUM |
|---|--------|-------|--------|-------|
| 1 | Fix the registry per-1k vs per-1M unit bug | Dennis | 15min | new ticket |
| 2 | Enable Anthropic prompt caching on compliance system prompt + NCC chunks | Dennis | ~1h | existing / new ticket |
| 3 | Run SCRUM-73 with 3 representative plans (light/medium/heavy) | Dennis | ~2h | SCRUM-73 |
| 4 | Review this paper with Karthik + Karen | Dennis | 30min | — |
| 5 | If Option C approved: update landing `/pricing` + Stripe tiers | Dennis | ~4h | new ticket |
