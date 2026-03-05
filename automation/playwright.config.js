import 'dotenv/config';
import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: false,
  timeout: 90_000,
  expect: {
    timeout: 15_000
  },
  retries: 1,
  use: {
    baseURL: process.env.BASE_URL || 'https://mp2-frontend-staging.jewelprotech.com/en/',
    browserName: 'chromium',
    headless: true,
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',
    video: 'retain-on-failure'
  },
  reporter: [['html', { outputFolder: 'playwright-report' }]]
});
