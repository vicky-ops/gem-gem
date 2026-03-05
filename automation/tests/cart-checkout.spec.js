import { test, expect } from '../fixtures/testFixtures.js';
import { deterministicSearch, openFirstPurchasablePdp } from '../utils/shopFlow.js';

test.describe('Cart and checkout flow', () => {
  test('TC06 - Add to cart updates cart state', async ({
    page,
    homePage,
    searchResultsPage,
    productPage,
    cartDrawer
  }) => {
    await homePage.goto();
    await deterministicSearch(homePage, searchResultsPage);
    await openFirstPurchasablePdp({ page, resultsPage: searchResultsPage, productPage });

    const beforeCount = await cartDrawer.cartCount();

    const cartResponsePromise = page.waitForResponse((response) =>
      response.url().includes('/shopping-cart/update-fetch') && response.status() === 200
    );

    await productPage.addToCart();

    const cartResponse = await cartResponsePromise;
    expect(cartResponse.ok()).toBeTruthy();

    await cartDrawer.waitForOpen();
    const afterCount = await cartDrawer.cartCount();

    expect(afterCount).toBeGreaterThanOrEqual(beforeCount + 1);
  });

  test('TC08 - Checkout page loads', async ({
    page,
    homePage,
    searchResultsPage,
    productPage,
    cartDrawer,
    checkoutPage
  }) => {
    await homePage.goto();
    await deterministicSearch(homePage, searchResultsPage);
    await openFirstPurchasablePdp({ page, resultsPage: searchResultsPage, productPage });

    await productPage.addToCart();
    await cartDrawer.proceedToCheckout();

    await checkoutPage.waitForLoad();
  });

  test('TC09 - Payment intent related request is emitted', async ({
    page,
    homePage,
    searchResultsPage,
    productPage,
    cartDrawer,
    checkoutPage
  }) => {
    await homePage.goto();
    await deterministicSearch(homePage, searchResultsPage);
    await openFirstPurchasablePdp({ page, resultsPage: searchResultsPage, productPage });

    await productPage.addToCart();
    await cartDrawer.proceedToCheckout();
    await checkoutPage.waitForLoad();

    const paymentRequestPromise = page
      .waitForRequest((request) => {
        const url = request.url().toLowerCase();
        return url.includes('stripe') || url.includes('payment') || url.includes('intent');
      }, { timeout: 20_000 })
      .catch(() => null);

    await checkoutPage.triggerPaymentRelatedActionIfPresent();

    const paymentRequest = await paymentRequestPromise;
    expect(paymentRequest, 'Expected at least one payment-related request during checkout').not.toBeNull();
  });
});
