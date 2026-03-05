import { test, expect } from '../fixtures/testFixtures.js';
import { ENV } from '../utils/env.js';
import { deterministicSearch, parseUsd } from '../utils/shopFlow.js';

test.describe('Discovery flow', () => {
  test('TC01 - Search returns results', async ({ homePage, searchResultsPage }) => {
    await homePage.goto();

    const response = await homePage.search(ENV.primarySearchTerm);
    expect(response.status()).toBe(200);

    await searchResultsPage.waitForResults();
    await expect(await searchResultsPage.count()).toBeGreaterThanOrEqual(ENV.minResults);
  });

  test('TC02 - Search fallback handling', async ({ homePage, searchResultsPage }) => {
    await homePage.goto();

    const result = await deterministicSearch(homePage, searchResultsPage);
    await test.info().attach('fallback-log', {
      body: `termUsed=${result.termUsed}; resultCount=${result.resultCount}`,
      contentType: 'text/plain'
    });

    expect(result.resultCount).toBeGreaterThanOrEqual(ENV.minResults);
  });

  test('TC03 - Sorting applies (Price High -> Low)', async ({ homePage, searchResultsPage }) => {
    await homePage.goto();
    await deterministicSearch(homePage, searchResultsPage);

    await searchResultsPage.applySortHighToLow();

    const { firstPriceText, secondPriceText } = await searchResultsPage.firstTwoPrices();
    const first = parseUsd(firstPriceText);
    const second = parseUsd(secondPriceText);

    expect(first).not.toBeNull();
    expect(second).not.toBeNull();
    expect(first).toBeGreaterThanOrEqual(second);
  });

  test('TC04 - PDP loads successfully', async ({ homePage, searchResultsPage, productPage }) => {
    await homePage.goto();
    await deterministicSearch(homePage, searchResultsPage);

    await searchResultsPage.clickFirstPricedProduct();

    await productPage.waitForLoad();
    expect(await productPage.hasVisibleImage()).toBeTruthy();
  });

  test('TC05 - Price consistency between PLP and PDP', async ({ homePage, searchResultsPage, productPage }) => {
    await homePage.goto();
    await deterministicSearch(homePage, searchResultsPage);
    await searchResultsPage.applySortHighToLow();

    const pricedProduct = searchResultsPage.productLinks
      .filter({ has: searchResultsPage.page.getByText(/USD\s*\$\s*[\d,]+/i) })
      .first();

    const plpPriceText = await pricedProduct.getByText(/USD\s*\$\s*[\d,]+/i).first().textContent();
    const plpPrice = parseUsd(plpPriceText);

    await pricedProduct.click();
    await productPage.waitForLoad();

    const pdpPrice = parseUsd(await productPage.displayedPriceText());

    expect(plpPrice).not.toBeNull();
    expect(pdpPrice).not.toBeNull();
    expect(pdpPrice).toBe(plpPrice);
  });
});
