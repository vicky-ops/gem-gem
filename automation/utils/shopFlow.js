import { expect } from '@playwright/test';
import { ENV } from './env.js';

export function parseUsd(text) {
  if (!text) {
    return null;
  }
  const value = Number(String(text).replace(/[^\d]/g, ''));
  return Number.isNaN(value) ? null : value;
}

export async function deterministicSearch(homePage, resultsPage) {
  const primaryResponse = await homePage.search(ENV.primarySearchTerm);
  expect(primaryResponse.status()).toBe(200);
  await resultsPage.waitForResults();

  const primaryCount = await resultsPage.count();
  if (primaryCount >= ENV.minResults) {
    return { termUsed: ENV.primarySearchTerm, resultCount: primaryCount };
  }

  const fallbackResponse = await homePage.search(ENV.fallbackSearchTerm);
  expect(fallbackResponse.status()).toBe(200);
  await resultsPage.waitForResults();

  const fallbackCount = await resultsPage.count();
  expect(fallbackCount).toBeGreaterThanOrEqual(ENV.minResults);

  return { termUsed: ENV.fallbackSearchTerm, resultCount: fallbackCount };
}

export async function openFirstPurchasablePdp({ page, resultsPage, productPage, maxCandidates = 12 }) {
  const urls = await resultsPage.productUrls(maxCandidates);

  for (const url of urls) {
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 45_000 });
    await productPage.waitForLoad();

    if (await productPage.isPurchasable()) {
      return url;
    }
  }

  throw new Error('No purchasable product found in deterministic candidates.');
}
