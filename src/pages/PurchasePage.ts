import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';
import { PassengerDetails } from '../models/passenger.model';

export class PurchasePage extends BasePage {
  // Locators - Flight Summary
  readonly heading: Locator;
  readonly airlineInfo: Locator;
  readonly flightNumberInfo: Locator;
  readonly priceInfo: Locator;
  readonly feesInfo: Locator;
  readonly totalCostInfo: Locator;

  // Locators - Passenger & Payment Form
  readonly nameInput: Locator;
  readonly addressInput: Locator;
  readonly cityInput: Locator;
  readonly stateInput: Locator;
  readonly zipCodeInput: Locator;
  readonly cardTypeSelect: Locator;
  readonly cardNumberInput: Locator;
  readonly cardMonthInput: Locator;
  readonly cardYearInput: Locator;
  readonly nameOnCardInput: Locator;
  readonly rememberMeCheckbox: Locator;
  readonly purchaseButton: Locator;

  constructor(page: Page) {
    super(page);
    this.heading = page.locator('h2');
    this.airlineInfo = page.locator('p', { hasText: 'Airline:' });
    this.flightNumberInfo = page.locator('p', { hasText: 'Flight Number:' });
    this.priceInfo = page.locator('p', { hasText: 'Price:' });
    this.feesInfo = page.locator('p', { hasText: 'Arbitrary Fees and Taxes:' });
    this.totalCostInfo = page.locator('p', { hasText: 'Total Cost:' }).locator('em');

    this.nameInput = page.locator('input#inputName');
    this.addressInput = page.locator('input#address');
    this.cityInput = page.locator('input#city');
    this.stateInput = page.locator('input#state');
    this.zipCodeInput = page.locator('input#zipCode');
    this.cardTypeSelect = page.locator('select#cardType');
    this.cardNumberInput = page.locator('input#creditCardNumber');
    this.cardMonthInput = page.locator('input#creditCardMonth');
    this.cardYearInput = page.locator('input#creditCardYear');
    this.nameOnCardInput = page.locator('input#nameOnCard');
    this.rememberMeCheckbox = page.locator('input#rememberMe');
    this.purchaseButton = page.locator('input[type="submit"][value="Purchase Flight"]');
  }

  /**
   * Get the page heading text.
   */
  async getHeadingText(): Promise<string> {
    return (await this.heading.textContent())?.trim() ?? '';
  }

  /**
   * Extract flight summary details displayed on the purchase page.
   */
  async getFlightSummary(): Promise<{
    airline: string;
    flightNumber: string;
    price: string;
    totalCost: string;
  }> {
    const airline = (await this.airlineInfo.textContent())?.replace('Airline:', '').trim() ?? '';
    const flightNumber = (await this.flightNumberInfo.textContent())?.replace('Flight Number:', '').trim() ?? '';
    const price = (await this.priceInfo.textContent())?.replace('Price:', '').trim() ?? '';
    const totalCost = (await this.totalCostInfo.textContent())?.trim() ?? '';

    return { airline, flightNumber, price, totalCost };
  }

  /**
   * Fill all passenger and payment form fields.
   */
  async fillPassengerDetails(details: PassengerDetails): Promise<void> {
    await this.nameInput.fill(details.name);
    await this.addressInput.fill(details.address);
    await this.cityInput.fill(details.city);
    await this.stateInput.fill(details.state);
    await this.zipCodeInput.fill(details.zipCode);

    if (details.cardType) {
      await this.cardTypeSelect.selectOption({ value: details.cardType });
    }

    await this.cardNumberInput.fill(details.cardNumber);

    if (details.cardMonth) {
      await this.cardMonthInput.fill(details.cardMonth);
    }

    if (details.cardYear) {
      await this.cardYearInput.fill(details.cardYear);
    }

    await this.nameOnCardInput.fill(details.nameOnCard);

    if (details.rememberMe !== undefined) {
      const isChecked = await this.rememberMeCheckbox.isChecked();
      if (details.rememberMe && !isChecked) {
        await this.rememberMeCheckbox.check();
      } else if (!details.rememberMe && isChecked) {
        await this.rememberMeCheckbox.uncheck();
      }
    }
  }

  /**
   * Click the "Purchase Flight" submission button.
   */
  async clickPurchaseFlight(): Promise<void> {
    await this.purchaseButton.click();
  }

  /**
   * Fill details and submit in one high-level workflow action.
   */
  async completePurchase(details: PassengerDetails): Promise<void> {
    await this.fillPassengerDetails(details);
    await this.clickPurchaseFlight();
  }
}
