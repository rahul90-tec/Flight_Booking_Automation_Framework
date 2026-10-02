import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class HomePage extends BasePage {
  readonly heading: Locator;
  readonly departureSelect: Locator;
  readonly destinationSelect: Locator;
  readonly findFlightsButton: Locator;

  constructor(page: Page) {
    super(page);
    this.heading = page.locator('h1');
    this.departureSelect = page.locator('select[name="fromPort"]');
    this.destinationSelect = page.locator('select[name="toPort"]');
    this.findFlightsButton = page.locator('input[type="submit"][value="Find Flights"]');
  }

  /**
   * Launch BlazeDemo homepage.
   */
  async open(): Promise<void> {
    await this.navigateTo('/');
    await this.waitForReady();
  }

  /**
   * Select departure city from dropdown.
   */
  async selectDepartureCity(city: string): Promise<void> {
    await this.departureSelect.selectOption({ label: city });
  }

  /**
   * Select destination city from dropdown.
   */
  async selectDestinationCity(city: string): Promise<void> {
    await this.destinationSelect.selectOption({ label: city });
  }

  /**
   * Click the "Find Flights" button.
   */
  async clickFindFlights(): Promise<void> {
    await this.findFlightsButton.click();
  }
}
