# TEST CASES

---

## 1. Scope

Covers revenue-critical commerce flow and backend integrity validation in STAGING.

**Priority Levels**

* P0 — Revenue critical
* P1 — Important but non-blocking
* P2 — UX / Quality enhancement

**Types**

* Functional
* Negative
* Edge
* Contract
* Integration

---

## 2. Test Case Matrix

| ID    | Title                              | Priority | Type                   | Preconditions                              | Steps                                                                                             | Expected Result                                                                                                |
| ----- | ---------------------------------- | -------- | ---------------------- | ------------------------------------------ | ------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| TC-01 | Search Returns Results             | P0       | Functional             | User on homepage                           | 1. Enter primary search term <br> 2. Submit search                                                | Result count ≥ threshold <br> Search API returns 200 <br> Product grid renders |
| TC-02 | Search Fallback Handling           | P1       | Edge                   | Primary search yields insufficient results | 1. Execute primary search <br> 2. Detect result count < threshold <br> 3. Trigger fallback search | Fallback term executed <br> Results ≥ threshold <br> Fallback logged                                           |
| TC-03 | Sorting Applies (Price Low → High) | P0       | Functional             | Search results visible                     | 1. Apply sort: High → Low <br> 2. Capture first two prices                                        | First price >= second price <br> Sort triggers network request <br> No stale UI                                 |
| TC-04 | PDP Loads Successfully             | P0       | Functional             | Sorted product list visible                | 1. Select first deterministic product <br> 2. Open PDP                                            | Title visible <br> Price displayed <br> At least one image rendered <br> Detail API returns 200                |
| TC-05 | Price Consistency (PLP vs PDP)     | P0       | Functional / Integrity | Sorted product list visible                | 1. Capture PLP price <br> 2. Open PDP <br> 3. Capture PDP price                                   | PDP price matches PLP price <br> No formatting mismatch                                                        |
| TC-06 | Add to Cart Updates State          | P0       | Functional             | PDP loaded                                 | 1. Click “Add to Cart”                                                                            | Cart count increments <br> Confirmation visible <br> Cart API returns success                                  |
| TC-07 | Invalid Quantity Handling          | P1       | Negative               | PDP loaded                                 | 1. Enter invalid quantity (if editable) <br> 2. Attempt add to cart                               | Validation message displayed <br> No cart mutation <br> No state corruption                                    |
| TC-08 | Checkout Page Loads                | P0       | Functional             | Item in cart                               | 1. Go to cart <br> 2. Proceed to checkout                                                         | Checkout renders <br> Payment section visible <br> Required APIs return 200                                    |
| TC-09 | Payment Intent Triggered           | P0       | Integration            | Valid checkout details entered             | 1. Enter Stripe test card <br> 2. Attempt payment                                                 | Payment-related request triggered <br> Expected status code returned <br> No sensitive tokens exposed          |
| TC-10 | Unauthorized API Access            | P0       | Negative / Security    | No authentication token                    | 1. Call protected API endpoint                                                                    | 401/403 returned <br> No sensitive data exposed <br> Structured error response                                 |
| TC-11 | Product API Contract Validation    | P0       | Contract               | Valid product list API call                | 1. Call product API <br> 2. Validate response structure                                           | Required fields present <br> Nested structure valid <br> Correct data types <br> Status 200                    |

---

## 3. Coverage Justification

The test matrix prioritizes:

* Revenue flow integrity
* Price correctness
* Cart state stability
* Payment integration validation
* Backend contract enforcement
* Negative and unauthorized handling

Non-critical cosmetic UI checks are excluded due to timebox constraints.


