# EVIDENCE

## DevTools / Trace-backed proof

All evidence below comes from Playwright trace/screenshot/video artifacts generated during executed runs.

### Key artifacts

- `automation/test-results/cart-checkout-Cart-and-che-674bc--to-cart-updates-cart-state/trace.zip`
- `automation/test-results/cart-checkout-Cart-and-che-674bc--to-cart-updates-cart-state-retry1/trace.zip`
- `automation/test-results/cart-checkout-Cart-and-che-3dcf9--related-request-is-emitted/trace.zip`
- `automation/test-results/cart-checkout-Cart-and-che-674bc--to-cart-updates-cart-state-retry1/error-context.md`

## UI action -> API mapping (from automated waits + trace)

1. Open search drawer + submit term (`ring`/fallback) -> `GET /api/v1/c2c/shop`.
2. Apply sorting -> follow-up `GET /api/v1/c2c/shop` (sorted listing refresh).
3. Add to cart click -> cart update call containing `/shopping-cart/update-fetch`.
4. Proceed to checkout -> checkout/cart page network set observed in trace.
5. Payment-step interaction attempt (if pay-like CTA visible) -> payment-related request detection (`stripe/payment/intent` keyword matching in test).

## Status code assertions captured in tests

- Search API response status asserted as `200` in UI flow.
- Product contract API test asserts `200` and nested `price.USD` structure.
- Unauthorized API negative test asserts `401/403/404` response handling.

## Sensitive data handling

- No credentials or manual tokens are stored in submission files.
- Runtime traces may include request headers from staging traffic; share externally only after redaction review.
