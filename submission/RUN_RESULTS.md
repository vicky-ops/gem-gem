# RUN RESULTS

## Date / Environment

- Date: March 5, 2026
- Browser: Chromium (Playwright)
- OS: Linux (workspace environment)
- Base URL: `https://mp2-frontend-staging.jewelprotech.com/en/`

## Commands executed

```bash
cd automation
npm test
```

## Run outcome (captured)

From the latest completed run output:

- Total tests: 11
- Passed: 7
- Failed: 3
- Flaky (passed on retry): 1

Failed tests observed:

1. `TC06 - Add to cart updates cart state`
2. `TC08 - Checkout page loads`
3. `TC09 - Payment intent related request is emitted`

Flaky test observed:

- `TC01 - Search returns results` (passed on retry)

## Key failure patterns

- Cart/checkout path remains unstable in staging due to dynamic product state and checkout rendering variability.
- Checkout-page text marker used in assertion can resolve hidden elements in some runs.

## Flakiness notes

- Retries were triggered in both discovery and cart-checkout suites.
- Discovery mostly stabilizes under retry; checkout flow remains the highest-risk area.

## Artifact locations

- HTML report: `automation/playwright-report/index.html`
- Failure traces/screenshots/videos: `automation/test-results/`
- Example failing artifact folders:
  - `automation/test-results/cart-checkout-Cart-and-che-674bc--to-cart-updates-cart-state/`
  - `automation/test-results/cart-checkout-Cart-and-che-165bd--TC08---Checkout-page-loads/`
  - `automation/test-results/cart-checkout-Cart-and-che-3dcf9--related-request-is-emitted/`

## Data changes

- No profile/address edits were made.
- Cart data was touched by cart/checkout journey tests in staging.
