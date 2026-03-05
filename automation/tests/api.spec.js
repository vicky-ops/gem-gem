import { test, expect } from '@playwright/test';
import { ENV } from '../utils/env.js';

const shopUrl = (term) =>
  `${ENV.apiBaseURL}/api/v1/c2c/shop?search=${encodeURIComponent(term)}&page=1&limit=20&lang=en`;

test.describe('API checks', () => {
  test('TC10 - Unauthorized API access is rejected', async ({ request }) => {
    const response = await request.get(`${ENV.apiBaseURL}/api/v1/customer/profile`, {
      failOnStatusCode: false
    });

    expect([401, 403, 404]).toContain(response.status());
  });

  test('TC11 - Product API contract has required structure', async ({ request }) => {
    const response = await request.get(shopUrl(ENV.primarySearchTerm), {
      failOnStatusCode: false
    });

    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body).toEqual(expect.any(Object));
    expect(body.status).toBe('success');

    const productsNode = body?.data?.products;
    expect(productsNode).toEqual(expect.any(Object));

    const items = productsNode?.data;
    expect(Array.isArray(items)).toBeTruthy();
    expect(items.length).toBeGreaterThan(0);

    const first = items[0];
    expect(first.id).toBeTruthy();
    expect(first.listing_id).toBeTruthy();
    expect(first.name).toEqual(expect.any(String));
    expect(first.price).toEqual(expect.any(Object));

    // nested structure contract
    expect(first.price.USD).toEqual(expect.any(Object));
    expect(first.price.USD.price).toEqual(expect.any(Number));
    expect(first.price.USD.formatted).toEqual(expect.any(String));
  });

  test('TC12 - UI search API correlation returns consistent endpoint behavior', async ({ page, request }) => {
    await page.goto('/');

    await page.locator('#new-navbar').getByRole('button', { name: 'Search' }).first().click();
    await page.locator('#search-input-drawer').fill(ENV.primarySearchTerm);

    const uiResponsePromise = page.waitForResponse((response) =>
      response.url().includes('/api/v1/c2c/shop') && response.request().method() === 'GET'
    );

    await page.getByRole('button', { name: 'Search' }).nth(1).click();

    const uiResponse = await uiResponsePromise;
    expect(uiResponse.status()).toBe(200);

    const correlatedResponse = await request.get(uiResponse.url(), {
      failOnStatusCode: false
    });

    expect(correlatedResponse.status()).toBe(200);

    const correlatedJson = await correlatedResponse.json();
    const correlatedItems = correlatedJson?.data?.products?.data ?? [];
    expect(Array.isArray(correlatedItems)).toBeTruthy();
    expect(correlatedItems.length).toBeGreaterThan(0);
  });
});
