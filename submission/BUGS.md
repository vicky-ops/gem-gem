# BUGS / FINDINGS

## 1) PDP Candidate May Be Unpurchasable (Sold Out) During Deterministic Selection

- Severity: Medium
- Priority: P1
- Environment: Chromium on Linux, `https://mp2-frontend-staging.jewelprotech.com/en/`

### Steps to reproduce

1. Search `ring` from homepage.
2. Open deterministic early-result PDP candidates.
3. Observe product detail panel and cart drawer behavior.

### Expected

Deterministic candidate for cart journey should be purchasable (or clearly excluded before cart step).

### Actual

Some deterministic PDP candidates are sold out (`This item is currently sold out`), causing cart flow to fail/stop.

### Evidence

- `automation2/test-results/cart-checkout-Cart-and-che-674bc--to-cart-updates-cart-state-retry1/error-context.md`
- `automation2/test-results/cart-checkout-Cart-and-che-674bc--to-cart-updates-cart-state-retry1/test-failed-1.png`

### Impact / recommendation

- Impact: High flakiness in revenue-path automation and potential user friction in discovery-to-cart journey.
- Recommendation: Expose explicit in-stock indicator/filter in PLP API/UI and make sort/filter deterministic for purchasable inventory.

---

## 2) PDP Navigation Instability / Timeout for Some Product Slugs

- Severity: High
- Priority: P0
- Environment: Chromium on Linux, `https://mp2-frontend-staging.jewelprotech.com/en/`

### Steps to reproduce

1. Execute discovery flow and collect product URLs.
2. Navigate sequentially to each PDP candidate.
3. Observe timeout on specific slug navigation (example captured in run).

### Expected

PDP loads within normal timeout envelope for selectable product URLs.

### Actual

Navigation timed out (`page.goto` timeout) for at least one PDP URL during cart journey.

### Evidence

- Run log excerpt: `navigating to .../product/ailene-test-ring-ring ... timeout`
- `automation2/test-results/cart-checkout-Cart-and-che-674bc--to-cart-updates-cart-state/trace.zip`
- `automation2/test-results/cart-checkout-Cart-and-che-674bc--to-cart-updates-cart-state/video.webm`

### Impact / recommendation

- Impact: Blocks checkout path automation and indicates potential backend/edge routing instability.
- Recommendation: Investigate PDP endpoint latency/error handling for affected slugs and add server-side monitoring with alert thresholds.
