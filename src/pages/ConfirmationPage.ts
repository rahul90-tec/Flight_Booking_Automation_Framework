import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';
import { BookingConfirmation } from '../models/flight.model';

export class ConfirmationPage extends BasePage {
  // Locators
  readonly confirmationHeading: Locator;
  readonly detailsTable: Locator;
  readonly jsonReceiptPre: Locator;

  constructor(page: Page) {
    super(page);
    this.confirmationHeading = page.locator('h1');
    this.detailsTable = page.locator('table.table');
    this.jsonReceiptPre = page.locator('pre');
  }

  /**
   * Get the primary confirmation heading text.
   */
  async getConfirmationHeading(): Promise<string> {
    return (await this.confirmationHeading.textContent())?.trim() ?? '';
  }

  /**
   * Extract a table value corresponding to a specific row label.
   */
  async getDetailValueByLabel(label: string): Promise<string> {
    const row = this.detailsTable.locator('tr', {
      has: this.page.locator(`td:first-child:has-text("${label}")`),
    });
    const valueCell = row.locator('td').nth(1);
    return (await valueCell.textContent())?.trim() ?? '';
  }

  /**
   * Get the generated Booking ID.
   */
  async getBookingId(): Promise<string> {
    return await this.getDetailValueByLabel('Id');
  }

  /**
   * Get the Amount displayed on the confirmation page.
   */
  async getAmount(): Promise<string> {
    return await this.getDetailValueByLabel('Amount');
  }

  /**
   * Get the masked Card Number displayed on the confirmation page.
   */
  async getMaskedCardNumber(): Promise<string> {
    return await this.getDetailValueByLabel('Card Number');
  }

  /**
   * Parse the full confirmation table into a BookingConfirmation object.
   */
  async getBookingConfirmationDetails(): Promise<BookingConfirmation> {
    const id = await this.getBookingId();
    const status = await this.getDetailValueByLabel('Status');
    const amount = await this.getAmount();
    const cardNumber = await this.getMaskedCardNumber();
    const expiration = await this.getDetailValueByLabel('Expiration');
    const authCode = await this.getDetailValueByLabel('Auth Code');
    const date = await this.getDetailValueByLabel('Date');

    return {
      id,
      status,
      amount,
      cardNumber,
      expiration,
      authCode,
      date,
    };
  }

  /**
   * Parse the raw JSON payload displayed in the pre element.
   */
  async getJsonReceipt(): Promise<Record<string, unknown>> {
    const rawText = (await this.jsonReceiptPre.textContent())?.trim() ?? '{}';
    try {
      return JSON.parse(rawText);
    } catch {
      return {};
    }
  }
}
