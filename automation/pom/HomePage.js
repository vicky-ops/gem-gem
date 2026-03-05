import { expect } from '@playwright/test';
import { BasePage } from './BasePage.js';

export class HomePage extends BasePage {
  constructor(page) {
    super(page);
    this.searchOpenButton = page.locator('#new-navbar').getByRole('button', { name: 'Search' });
    this.searchInput = page.locator('#search-input-drawer');
    this.searchSubmit = page.getByRole('button', { name: 'Search' }).nth(1);
  }

  async goto() {
    await this.gotoWithRetry('/');
  }

  async search(term) {
    await this.searchOpenButton.first().click();
    await expect(this.searchInput).toBeVisible();

    await this.searchInput.fill(term);

    const responsePromise = this.page.waitForResponse((response) =>
      response.url().includes('/api/v1/c2c/shop') && response.request().method() === 'GET'
    );

    await this.searchSubmit.click();
    return responsePromise;
  }
}
