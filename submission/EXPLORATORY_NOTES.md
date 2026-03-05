# EXPLORATORY NOTES

---

## 1. Objective

Identify high-risk functional, integration, and state-related issues in the core revenue path under a dynamic STAGING dataset.

Focus: business impact > cosmetic defects.

---

## 2. Exploration Area 1 — Revenue Flow Integrity

### Risk Targeted

Breakage in Search → PDP → Cart → Checkout sequence.

### What Was Tested

* Search execution under varying keywords
* Sorting immediately after search
* Opening first deterministic product
* Adding product to cart
* Navigating to checkout

### Observations

* Catalogue content varies between sessions
* Sorting triggers backend call and grid re-render
* Cart state updates immediately upon addition
* Checkout page renders consistently

### Risk Assessment

* Dynamic dataset increases automation instability risk
* Revenue path functionally intact in observed session
* Requires deterministic selection logic for automation reliability

---

## 3. Exploration Area 2 — Price & Data Integrity

### Risk Targeted

Incorrect price rendering or UI/backend mismatch.

### What Was Tested

* PLP vs PDP price comparison
* Price behavior after navigation
* Page refresh on PDP
* Back navigation to listing

### Observations

* No price mismatch detected
* Refresh does not alter displayed price
* No stale rendering observed

### Risk Assessment

* Price integrity is revenue-critical
* Requires API contract validation to guard against backend drift

---

## 4. Exploration Area 3 — Cart State Stability

### Risk Targeted

Cart corruption or inconsistent state behavior.

### What Was Tested

* Add to cart
* Page refresh after add
* Navigate away and return
* Attempt boundary quantity modification (where allowed)

### Observations

* Cart count updates immediately
* Cart state persists across navigation
* No visible corruption observed

### Risk Assessment

* Cart persistence appears stable
* Multi-tab or concurrent behavior not evaluated due to time constraint

---

## 5. Exploration Area 4 — Checkout & Payment Handling

### Risk Targeted

Payment flow failure or silent integration issues.

### What Was Tested

* Checkout page rendering
* Required field validation
* Stripe test card submission
* Network request inspection
* Console monitoring during payment attempt

### Observations

* Payment-related network request triggered
* No exposed sensitive token in UI
* No unhandled frontend exception observed

### Risk Assessment

* Payment integration is highest business risk
* Requires API-level validation in addition to UI confirmation
* Error path validation limited by staging configuration

---

## 6. Exploration Area 5 — Error & Boundary Behavior

### Risk Targeted

Improper error handling and edge case instability.

### What Was Tested

* Empty search submission
* Rapid repeated search actions
* Invalid quantity attempt (if editable)
* Page refresh at intermediate states

### Observations

* No visible crash observed
* No blocking console error detected
* UI gracefully handles empty search

### Risk Assessment

* Error handling appears stable at surface level
* Forced API failure scenarios not tested due to time constraint

---

## 7. High-Level Observations

* System risk lies more in dynamic data variability than obvious UI defects
* No critical functional blocker identified during exploration
* Automation must compensate for environmental instability
* Integration validation is more important than cosmetic validation

---