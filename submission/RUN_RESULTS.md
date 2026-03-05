# RUN RESULTS

## Date / Environment

- Date: March 5, 2026
- Browser: Chromium (Playwright)
- OS: Linux (workspace environment)
- Base URL: `https://mp2-frontend-staging.jewelprotech.com/en/`

## Commands executed

```bash
cd automation2
npm test
```

## Run outcome (captured)

From completed run output:

- Total tests: 11
- Passed: 6
- Failed: 5

Failed tests observed:

1. `TC06 - Add to cart updates cart state`
2. `TC08 - Checkout page loads`
3. `TC09 - Payment intent related request is emitted`
4. `TC04 - PDP loads successfully`
5. `TC05 - Price consistency between PLP and PDP`

## Key failure patterns

- Product selection intermittently lands on sold-out/unpurchasable PDP candidates.
- PDP navigation sometimes times out for specific product slugs.
- Cart/checkout journey instability is higher than discovery/API journeys.

## Flakiness notes

- Automatic retries were triggered in cart-checkout tests.
- Failures vary by dynamic catalogue state and product availability.

## Artifact locations

- HTML report: `automation2/playwright-report/index.html`
- Failure traces/screenshots/videos: `automation2/test-results/`
- Example failing artifact folders:
  - `automation2/test-results/cart-checkout-Cart-and-che-674bc--to-cart-updates-cart-state/`
  - `automation2/test-results/cart-checkout-Cart-and-che-674bc--to-cart-updates-cart-state-retry1/`
  - `automation2/test-results/cart-checkout-Cart-and-che-3dcf9--related-request-is-emitted/`

## Data changes

- No profile/address edits were made.
- Cart data was touched by cart/checkout journey tests in staging.
