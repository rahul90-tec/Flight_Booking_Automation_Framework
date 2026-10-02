import { Page, Locator } from '@playwright/test';

/**
 * BasePage serves as the parent class for all Page Objects.
 * Contains common interactions, wait helpers, and cross-cutting concerns.
 */
export abstract class BasePage {
  constructor(protected readonly page: Page) {}

  /**
   * Navigate to a relative path or full URL.
   */
  async navigateTo(path: string = '/'): Promise<void> {
    await this.page.goto(path, { waitUntil: 'domcontentloaded' });
  }

  /**
   * Get the current page title.
   */
  async getTitle(): Promise<string> {
    return await this.page.title();
  }

  /**
   * Get current URL.
   */
  getUrl(): string {
    return this.page.url();
  }

  /**
   * Wait for URL to match a pattern or string.
   */
  async waitForUrl(urlOrPattern: string | RegExp): Promise<void> {
    await this.page.waitForURL(urlOrPattern);
  }

  /**
   * Take screenshot with a given name.
   */
  async takeScreenshot(name: string): Promise<Buffer> {
    return await this.page.screenshot({
      path: `test-results/screenshots/${name}.png`,
      fullPage: true,
    });
  }

  /**
   * Wait for network idle or domcontentloaded.
   */
  async waitForReady(): Promise<void> {
    await this.page.waitForLoadState('domcontentloaded');
  }
}
