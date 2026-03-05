import { ENV } from '../utils/env.js';

export class BasePage {
  constructor(page) {
    this.page = page;
  }

  async gotoWithRetry(path = '/') {
    let lastError;

    for (let attempt = 1; attempt <= ENV.navigationRetries; attempt += 1) {
      try {
        await this.page.goto(path, { waitUntil: 'domcontentloaded', timeout: 45_000 });
        return;
      } catch (error) {
        lastError = error;
        const message = String(error);
        const transient = message.includes('ERR_CONNECTION_RESET') || message.includes('Timeout');
        if (!transient || attempt === ENV.navigationRetries) {
          break;
        }
      }
    }

    throw lastError;
  }
}
