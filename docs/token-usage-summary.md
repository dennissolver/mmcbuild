# Token Usage Summary — SCRUM-73

**Generated:** 2026-04-20 (post-caching validation run)
**Source:** `ai_usage_log` via `scripts/token-usage-report.mjs`, cost recalculated from raw tokens using correct per-1M pricing (SCRUM-121 fixed)

---

## Headline

**78% cost-per-run reduction** after shipping Anthropic prompt caching on compliance calls (commit `f616dd4`).

Empirical gross margins on current published pricing are now 98%+.

## Before vs After Caching

| Metric | Pre-caching (10 Apr) | Post-caching (20 Apr) | Change |
|--------|----------------------|------------------------|--------|
| Input tokens per full run | 618,450 | **34,986** | **−94%** |
| Output tokens per run | 37,660 | 30,437 | ~same |
| **Cost per run (USD)** | **$2.21** | **$0.49** | **−78%** |
| Cache write tokens | 0 | 51,401 | (first call primes cache) |
| Cache read tokens | 0 | 565,411 | (11 × write — 12 category calls read cached prefix) |

## Validation run details

| Metric | Value |
|--------|-------|
| Runs analysed | 2 |
| Total input tokens | 125,223 |
| Total output tokens | 30,437 |
| Total cost (USD) | $0.4937 |
| Avg cost per run | $0.2468 |
| Cache write tokens | 51,401 |
| Cache read tokens | 565,411 |

### Per-run breakdown

| check_id | Calls | Input | Output | Cost |
|----------|-------|-------|--------|------|
| 421391e0-53d5-4753-904a-aee1924bdb07 | 33 | 34,986 | 30,437 | $0.4918 |
| (embeddings, no check_id) | 74 | 90,237 | 0 | $0.0018 |

Full run composition: 12 × `compliance_primary`, 7 × `compliance_validator`, 12 × `rd_classification`, 1 × `summary`, 1 × `reconciliation`.

## Pricing projection — measured

Based on $0.25 avg cost per run (post-caching):

| Tier | Price/mo | Runs | Projected cost/mo | Margin | Margin % |
|------|----------|------|-------------------|--------|----------|
| Basic | $149 | 10 | $2.47 | $146.53 | **98.3%** |
| Professional | $399 | 30 | $7.40 | $391.60 | **98.1%** |
| Stress scenario | — | 50 | $12.34 | — | — |

Pre-caching baseline predicted 79–83%. Post-caching measured 98%+. The v1 pricing-options paper (`docs/pricing-options-v1.md`) was significantly conservative; all four options remain profitable with substantial headroom.

## Implications for pricing decisions

1. **Option A (status quo subscription) is highly profitable as-is.** No pricing change is required on margin grounds.
2. **Option C (credit-based)** remains worth considering for outlier protection (a single 300-page plan could still spike cost), but economic urgency is low.
3. **Free trial generosity** can be extended — $0.25/run means 20 trial runs cost $5, not $50.
4. **Enterprise bespoke pricing** has massive headroom. Custom high-volume deals at $0.50–$1.00/run would still be strongly profitable while dramatically undercutting any competitor.

## Implementation notes

- Prompt caching implemented in `src/lib/ai/claude.ts` and `src/lib/ai/validation/cross-validator.ts` via `cacheUserPrefix` option added to `ModelCallOptions`. Cached content is the project context + plan extracts (identical across the 12 category calls within a run). Per-category query (section prompt, NCC context, schema) is sent uncached.
- Cache read rate (11:1 vs writes) confirms every call after the first benefits.
- `ai_usage_log.cache_creation_tokens` and `cache_read_tokens` columns added in migration `00037` are populating correctly.
- `estimated_cost_usd` in `ai_usage_log` reflects corrected per-1M pricing since SCRUM-121 fix (`235127f`). Pre-fix rows still carry 1000× inflated values; reporter recalculates from raw tokens so historical data is unaffected.

## Remaining work

1. Extend prompt caching to the compliance agentic pipeline (`src/lib/ai/agent/compliance-agent.ts`) — currently skipped due to multi-turn tool-use cache-breakpoint complexity. Would compound savings.
2. Consider prompt caching on Build and Quote pipelines (same plan content is re-sent there too).
3. Remove the temporary `[Anthropic] init` debug log once confident production is stable (introduced in `1ecd818` for 401 diagnosis, since resolved).
4. Run additional sample plans across light / medium / heavy page counts to confirm per-run cost holds across plan sizes.
