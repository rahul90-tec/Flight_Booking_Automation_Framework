import { test as baseTest, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { ReservePage } from '../pages/ReservePage';
import { PurchasePage } from '../pages/PurchasePage';
import { ConfirmationPage } from '../pages/ConfirmationPage';

/**
 * Fixture types containing only the Page Objects required for the flight booking flow.
 */
export type TestPages = {
  homePage: HomePage;
  reservePage: ReservePage;
  purchasePage: PurchasePage;
  confirmationPage: ConfirmationPage;
};

/**
 * Custom Playwright test fixture injecting Page Objects.
 */
export const test = baseTest.extend<TestPages>({
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
  reservePage: async ({ page }, use) => {
    await use(new ReservePage(page));
  },
  purchasePage: async ({ page }, use) => {
    await use(new PurchasePage(page));
  },
  confirmationPage: async ({ page }, use) => {
    await use(new ConfirmationPage(page));
  },
});

export { expect };
