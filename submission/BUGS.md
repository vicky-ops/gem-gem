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

Some deterministic PDP candidates are sold out (`This item is currently sold out`) or do not produce expected cart update behavior.

### Evidence

- `automation/test-results/cart-checkout-Cart-and-che-674bc--to-cart-updates-cart-state-retry1/error-context.md`
- `automation/test-results/cart-checkout-Cart-and-che-674bc--to-cart-updates-cart-state-retry1/test-failed-1.png`

### Impact / recommendation

- Impact: High flakiness in revenue-path automation and unstable cart coverage.
- Recommendation: Expose explicit in-stock indicator/filter in PLP API/UI and prioritize purchasable items for deterministic selection.

---

## 2) Checkout Page Lacks a Stable, Always-Visible Payment Marker

- Severity: High
- Priority: P0
- Environment: Chromium on Linux, `https://mp2-frontend-staging.jewelprotech.com/en/`

### Steps to reproduce

1. Add a product and navigate to checkout.
2. Assert a generic payment/checkout text marker.
3. Repeat across runs.

### Expected

Checkout should expose at least one stable, visible marker element suitable for deterministic test assertion.

### Actual

In failing runs, matching text is present but hidden/non-actionable, causing checkout/payment assertions to fail.

### Evidence

- `automation/test-results/cart-checkout-Cart-and-che-165bd--TC08---Checkout-page-loads/error-context.md`
- `automation/test-results/cart-checkout-Cart-and-che-3dcf9--related-request-is-emitted/error-context.md`
- `automation/test-results/cart-checkout-Cart-and-che-3dcf9--related-request-is-emitted/trace.zip`

### Impact / recommendation

- Impact: Blocks reliable verification of checkout and payment-intent stages.
- Recommendation: Add stable `data-testid` markers for checkout-ready and payment-section-visible states.
