# automation

Playwright automation suite (JavaScript) aligned to the Practical Technical Assessment requirements.

## What is implemented

- `.env` driven configuration (`BASE_URL`, `API_BASE_URL`, search terms, retry tuning)
- Page Object Model (POM) under `pom/`
- UI coverage for both required journeys
- API coverage with:
  - unauthorized negative test,
  - product contract test with nested field checks,
  - UI-to-API correlated endpoint test
- HTML report + failure artifacts (screenshot/trace/video)

## Structure

- `fixtures/testFixtures.js` - Playwright fixtures for page objects
- `pom/` - Home, Search Results, Product, Cart Drawer, Checkout page objects
- `tests/discovery.spec.js` - TC01 to TC05
- `tests/cart-checkout.spec.js` - TC06, TC08, TC09
- `tests/api.spec.js` - TC10, TC11, TC12
- `utils/env.js` - environment parsing
- `utils/shopFlow.js` - deterministic search and purchasable-product selection logic

## Prerequisites

- Node.js 20+
- Chromium available via Playwright

## Setup

```bash
cd automation
npm install
npx playwright install chromium
```

## Environment

Copy the example and adjust if needed:

```bash
cp .env.example .env
```

Required variables:

- `BASE_URL`
- `API_BASE_URL`
- `PRIMARY_SEARCH_TERM`
- `FALLBACK_SEARCH_TERM`
- `MIN_RESULTS`
- `NAVIGATION_RETRIES`

## Run

Run all tests:

```bash
npm test
```

Run only UI tests:

```bash
npx playwright test tests/discovery.spec.js tests/cart-checkout.spec.js
```

Run only API tests:

```bash
npx playwright test tests/api.spec.js
```

Open report:

```bash
npm run report
```

## Notes on determinism and cleanup

- Search starts with primary term and falls back automatically when results are below threshold.
- Sort is applied before price-order assertions.
- Cart tests do not rely on a fixed product; they iterate deterministic PDP candidates and pick the first purchasable one (avoids sold-out flakiness).
- Navigation has retry logic for transient staging resets.
