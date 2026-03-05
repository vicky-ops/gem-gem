import { expect } from '@playwright/test';

export class CartDrawer {
  constructor(page) {
    this.page = page;
    this.goToCheckoutButton = page.getByRole('button', { name: /go to checkout/i }).first();
    this.navbar = page.locator('#new-navbar');
  }

  async waitForOpen() {
    await expect(this.goToCheckoutButton).toBeVisible();
  }

  async cartCount() {
    const text = (await this.navbar.textContent()) || '';
    const matches = text.match(/\d+/g);
    return matches ? Number(matches.at(-1)) : 0;
  }

  async proceedToCheckout() {
    await this.waitForOpen();
    await this.goToCheckoutButton.click();
  }
}
