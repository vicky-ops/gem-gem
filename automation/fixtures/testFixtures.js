import { test as base, expect } from '@playwright/test';
import { HomePage } from '../pom/HomePage.js';
import { SearchResultsPage } from '../pom/SearchResultsPage.js';
import { ProductPage } from '../pom/ProductPage.js';
import { CartDrawer } from '../pom/CartDrawer.js';
import { CheckoutPage } from '../pom/CheckoutPage.js';

export const test = base.extend({
  homePage: async ({ page }, use) => use(new HomePage(page)),
  searchResultsPage: async ({ page }, use) => use(new SearchResultsPage(page)),
  productPage: async ({ page }, use) => use(new ProductPage(page)),
  cartDrawer: async ({ page }, use) => use(new CartDrawer(page)),
  checkoutPage: async ({ page }, use) => use(new CheckoutPage(page))
});

export { expect };
