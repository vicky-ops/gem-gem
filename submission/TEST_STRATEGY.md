# TEST STRATEGY

---

## 1. Objective

Validate core commerce flows in STAGING through deterministic UI automation and correlated API validation, ensuring repeatability in a dynamic catalogue environment.

Base URL:
[https://mp2-frontend-staging.jewelprotech.com/en/](https://mp2-frontend-staging.jewelprotech.com/en/) 

---

## 2. Scope

### Journey 1 — Product Discovery (E2E)

* Search for items
* Apply stable sort
* Open Product Detail Page (PDP)
* Validate key UI behavior:
    * Image loads
    * Price displayed

### Journey 2 — Add to Cart + Checkout (Stripe Test Mode)

* Add product to cart
* Proceed to checkout
* Attempt Stripe test payment
* Validate:
    * Payment-related UI handling
    * Payment-related network request (redacted)

---

## 3. Determinism Strategy (Dynamic Catalogue)

The catalogue is dynamic. Tests enforce repeatability through controlled selection rules.

### Search Strategy

* Primary term: `"ring"`
* Minimum results required: ≥ 3
* Fallback term: `"gold"`
* Log which term was used

### Selection Rule

1. Apply sort: **Price Low → High**
2. Select first visible product after sorting
3. Avoid hardcoded product names

### Stable Assertions

* Price exists and follows numeric format
* Product image is visible
* Variant interaction triggers UI change
* “Add to Cart” state updates correctly

### Cart Hygiene

* Ensure empty cart before cart-related tests
* Tests are order-independent
* No shared state assumptions

If determinism fails due to environment instability:

* Document failure
* Record fallback attempt
* Recommend seeded data strategy for long-term stability

---

## 4. Risk Ownership

### Risk 1 — Catalogue Instability

Mitigation:

* Fallback search term
* Minimum result assertion
* Stable sorting

### Risk 2 — Payment Integration Flakiness (Stripe Test Mode)

Mitigation:

* Stop safely at payment confirmation step if required
* Validate payment-related network request + status code

### Risk 3 — STAGING Environment Instability

Mitigation:

* Explicit status code assertions
* Artifact capture on failure (screenshot/trace)
* Order-independent test design

---

## 5. Smoke vs Regression Definition

### Smoke Suite

Validates core revenue path:

* Search returns results
* PDP loads successfully
* Add to cart works

### Regression Suite

Validates business logic and integration stability:

* Sorting correctness
* Variant-driven UI behavior
* Cart state behavior
* Checkout flow up to payment intent
* API negative + contract validation

---

## 6. UI ↔ API Correlation Strategy

Network activity captured via DevTools during UI execution.

Mapping examples:

* Search action → Product list API
* Add to cart → Cart API
* Checkout → Payment intent request

API automation validates:

* Expected status codes
* Required response fields
* Nested structures (e.g., `price.amount`, `variants[]`)
* Unauthorized negative scenario

This ensures coverage beyond UI rendering and validates backend contract integrity.

---

## 7. Engineering Principles

* Prefer stable locators (`data-testid` if available)
* Avoid brittle CSS/layout selectors
* No fixed sleeps — use event-based waits
* Clear, outcome-based assertions
* Order-independent execution
* Capture artifacts on failure
