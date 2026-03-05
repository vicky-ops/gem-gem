# README

## Project location

Automation implementation is in:

- `automation/`

## Prerequisites

- Node.js 20+
- npm
- Chromium installed by Playwright

## Install

```bash
cd automation
npm install
npx playwright install chromium
```

## Environment variables

`automation` uses `.env`.

1. Copy template:

```bash
cp .env.example .env
```

2. Required keys:

- `BASE_URL`
- `API_BASE_URL`
- `PRIMARY_SEARCH_TERM`
- `FALLBACK_SEARCH_TERM`
- `MIN_RESULTS`
- `NAVIGATION_RETRIES`

## Run UI + API suite

```bash
cd automation
npm test
```

## Run only UI tests

```bash
cd automation
npx playwright test tests/discovery.spec.js tests/cart-checkout.spec.js
```

## Run only API tests

```bash
cd automation
npx playwright test tests/api.spec.js
```

## Reports and artifacts

- HTML report: `automation/playwright-report/index.html`
- Failure artifacts: `automation/test-results/`
  - screenshots (`test-failed-1.png`)
  - traces (`trace.zip`)
  - videos (`video.webm`)

## Determinism and cleanup notes

- Search flow uses primary + fallback term logic.
- Sort is applied before price-order assertions.
- Cart journey attempts deterministic purchasable-product selection.
- Retries are enabled in Playwright config for staging instability.
