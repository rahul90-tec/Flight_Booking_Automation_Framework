import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';
import { FlightInfo } from '../models/flight.model';

export class ReservePage extends BasePage {
  // Locators
  readonly header: Locator;
  readonly table: Locator;
  readonly flightRows: Locator;

  constructor(page: Page) {
    super(page);
    this.header = page.locator('h3');
    this.table = page.locator('table.table');
    this.flightRows = page.locator('table.table tbody tr');
  }

  /**
   * Get the reservation page header text (e.g., "Flights from Paris to Rome:").
   */
  async getHeaderText(): Promise<string> {
    return (await this.header.textContent())?.trim() ?? '';
  }

  /**
   * Get count of available flights listed.
   */
  async getFlightCount(): Promise<number> {
    return await this.flightRows.count();
  }

  /**
   * Parse all flights from the table into strongly-typed FlightInfo objects.
   */
  async getAllFlights(): Promise<FlightInfo[]> {
    const flights: FlightInfo[] = [];
    const count = await this.getFlightCount();

    for (let i = 0; i < count; i++) {
      const row = this.flightRows.nth(i);
      const cells = row.locator('td');

      const flightNumber = (await cells.nth(1).textContent())?.trim() ?? '';
      const airline = (await cells.nth(2).textContent())?.trim() ?? '';
      const departs = (await cells.nth(3).textContent())?.trim() ?? '';
      const arrives = (await cells.nth(4).textContent())?.trim() ?? '';
      const priceText = (await cells.nth(5).textContent())?.trim() ?? '$0';
      const price = parseFloat(priceText.replace('$', ''));

      flights.push({
        flightNumber,
        airline,
        departs,
        arrives,
        price,
      });
    }

    return flights;
  }

  /**
   * Choose a flight by its row index (0-based).
   */
  async chooseFlightByIndex(index: number = 0): Promise<void> {
    const row = this.flightRows.nth(index);
    await row.locator('input[type="submit"][value="Choose This Flight"]').click();
  }

  /**
   * Choose a flight by airline name (e.g., "Virgin America").
   */
  async chooseFlightByAirline(airlineName: string): Promise<void> {
    const row = this.flightRows.filter({ hasText: airlineName }).first();
    await row.locator('input[type="submit"][value="Choose This Flight"]').click();
  }

  /**
   * Choose a flight by flight number (e.g., "43").
   */
  async chooseFlightByNumber(flightNumber: string): Promise<void> {
    const row = this.flightRows.filter({
      has: this.page.locator('td', { hasText: flightNumber }),
    }).first();
    await row.locator('input[type="submit"][value="Choose This Flight"]').click();
  }

  /**
   * Identify the cheapest flight from the list without selecting it.
   */
  async findCheapestFlight(): Promise<{ flight: FlightInfo; index: number }> {
    const flights = await this.getAllFlights();
    if (flights.length === 0) {
      throw new Error('No flights available to choose from.');
    }

    let minPriceIndex = 0;
    for (let i = 1; i < flights.length; i++) {
      if (flights[i].price < flights[minPriceIndex].price) {
        minPriceIndex = i;
      }
    }

    return { flight: flights[minPriceIndex], index: minPriceIndex };
  }

  /**
   * Finds the flight with the lowest price and clicks "Choose This Flight" for it.
   * Returns the selected FlightInfo.
   */
  async chooseCheapestFlight(): Promise<FlightInfo> {
    const { flight, index } = await this.findCheapestFlight();
    await this.chooseFlightByIndex(index);
    return flight;
  }
}
