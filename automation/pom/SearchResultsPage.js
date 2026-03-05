import { expect } from '@playwright/test';
import { PRICE_REGEX } from '../utils/env.js';

export class SearchResultsPage {
  constructor(page) {
    this.page = page;
    this.productLinks = page.locator('main a[href*="/product/"]');
    this.sortButton = page.locator('button:has-text("Sort By:")').first();
    this.highToLowOption = page.getByText('Price: High to Low').first();
  }

  async waitForResults() {
    await expect(this.productLinks.first()).toBeVisible();
  }

  async count() {
    return this.productLinks.count();
  }

  async applySortHighToLow() {
    await this.sortButton.click();

    const responsePromise = this.page.waitForResponse((response) =>
      response.url().includes('/api/v1/c2c/shop') && response.request().method() === 'GET'
    );

    await this.highToLowOption.click();
    await responsePromise;
    await this.waitForResults();
  }

  async firstTwoPrices() {
    await this.waitForResults();

    const firstPriceText = await this.productLinks.nth(0).getByText(PRICE_REGEX).first().textContent();
    const secondPriceText = await this.productLinks.nth(1).getByText(PRICE_REGEX).first().textContent();

    return {
      firstPriceText,
      secondPriceText
    };
  }

  async clickFirstPricedProduct() {
    const priced = this.productLinks.filter({ has: this.page.getByText(PRICE_REGEX) }).first();
    await expect(priced).toBeVisible();
    await priced.click();
  }

  async productUrls(limit = 12) {
    await this.waitForResults();

    return this.productLinks.evaluateAll((elements, max) => {
      const urls = elements
        .map((element) => element.href)
        .filter(Boolean)
        .slice(0, max);
      return [...new Set(urls)];
    }, limit);
  }
}
