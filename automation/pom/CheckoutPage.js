import { expect } from '@playwright/test';

export class CheckoutPage {
  constructor(page) {
    this.page = page;
    this.paymentOrCheckoutText = page.getByText(/payment|checkout/i).first();
    this.payLikeButton = page.getByRole('button', {
      name: /pay|place order|complete order|confirm/i
    }).first();
  }

  async waitForLoad() {
    await expect(this.page).toHaveURL(/checkout|cart/i);
    await expect(this.paymentOrCheckoutText).toBeVisible();
  }

  async triggerPaymentRelatedActionIfPresent() {
    const visible = await this.payLikeButton.isVisible().catch(() => false);
    if (visible) {
      await this.payLikeButton.click({ force: true });
    }
  }
}
