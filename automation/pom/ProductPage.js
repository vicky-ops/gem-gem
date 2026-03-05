import { expect } from '@playwright/test';
import { PRICE_REGEX } from '../utils/env.js';

export class ProductPage {
  constructor(page) {
    this.page = page;
    this.detailsPanel = page.getByRole('complementary').first();
    this.title = this.detailsPanel.getByRole('heading', { level: 1 }).first();
    this.price = this.detailsPanel.getByText(PRICE_REGEX).first();
    this.soldOutText = page.getByText(/sold out/i).first();
    this.addToCartButton = page.getByRole('button', { name: /add to cart/i }).first();
    this.heroImage = page.locator('img[alt*="_mainPhoto"], main img[src*="/product/"]').first();
  }

  async waitForLoad() {
    await expect(this.page).toHaveURL(/\/product\//);
    await expect(this.title).toBeVisible();
    await expect(this.price).toBeVisible();
  }

  async hasVisibleImage() {
    return this.heroImage.isVisible().catch(() => false);
  }

  async isPurchasable() {
    const soldOutVisible = await this.soldOutText.isVisible().catch(() => false);
    if (soldOutVisible) {
      return false;
    }

    const addToCartVisible = await this.addToCartButton.isVisible().catch(() => false);
    if (!addToCartVisible) {
      return false;
    }

    return this.addToCartButton.isEnabled().catch(() => false);
  }

  async displayedPriceText() {
    return this.price.textContent();
  }

  async addToCart() {
    await expect(this.addToCartButton).toBeVisible();
    await this.addToCartButton.click();
  }
}
