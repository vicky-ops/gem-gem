import 'dotenv/config';

function toNumber(value, fallback) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

export const ENV = {
  baseURL: process.env.BASE_URL || 'https://mp2-frontend-staging.jewelprotech.com/en/',
  apiBaseURL: process.env.API_BASE_URL || 'https://mp2-api-staging.jewelprotech.com',
  primarySearchTerm: process.env.PRIMARY_SEARCH_TERM || 'ring',
  fallbackSearchTerm: process.env.FALLBACK_SEARCH_TERM || 'gold',
  minResults: toNumber(process.env.MIN_RESULTS, 3),
  navigationRetries: toNumber(process.env.NAVIGATION_RETRIES, 3)
};

export const PRICE_REGEX = /USD\s*\$\s*[\d,]+/i;
