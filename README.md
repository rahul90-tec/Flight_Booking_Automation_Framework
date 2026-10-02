# BlazeDemo Flight Booking Automation Framework (Scenario 4)

A lightweight, robust Playwright with TypeScript test automation framework implementing the **Page Object Model (POM)** pattern for **Scenario 4: Travel Booking System ([BlazeDemo](https://blazedemo.com/))**.

---

## 🎯 Scope & Requirements Automated

This framework automates the flight booking journey and asserts the 4 validation criteria:

### Phase 1: Search Flights
- **Step 1:** Launch BlazeDemo.
- **Step 2:** Select Departure City: `Boston`.
- **Step 3:** Select Destination City: `London`.
- **Step 4:** Click Find Flights.
- **Step 5:** Verify flights are displayed.
  - 👉 **Validation Criterion 1:** Minimum one flight is available (`expect(count).toBeGreaterThanOrEqual(1)`).

### Phase 2: Flight Analysis
- **Step 6:** Capture all available flight details (Airline, Flight Number, Price).
- **Step 7:** Identify the cheapest flight dynamically.
  - 👉 **Validation Criterion 2:** Cheapest flight is identified correctly (`expect(cheapestFlight.price).toBe(Math.min(...prices))`).
- **Step 8:** Log all flight details in the report (console table + JSON report attachment).

### Phase 3: Purchase Flight
- **Step 9:** Select the cheapest flight.
- **Step 10:** Fill passenger details (Name, Address, City, State, Zip Code, Credit Card Information).
- **Step 11:** Click Purchase Flight.

### Phase 4: Booking Confirmation
- **Step 12:** Verify confirmation page is displayed (`Thank you for your purchase today!`).
- **Step 13:** Capture Booking ID, Amount, Card Number (masked).
- **Step 14:** 👉 **Validation Criterion 3:** Validate Booking ID is generated (`expect(bookingId).toMatch(/^\d+$/)`).
- **Step 15:** 👉 **Validation Criterion 4:** Validate Amount matches the selected flight price.
  - Logs detailed price comparison between selected flight price and confirmation page amount.
  - Formally documents the BlazeDemo mock server static output (`555 USD`) in test annotations and attachments.

---

## 📁 Project Structure

```text
Assignment_1/
├── src/
│   ├── pages/                   # Page Object Models
│   │   ├── BasePage.ts          # Core navigation & wait methods
│   │   ├── HomePage.ts          # Origin & destination dropdowns, Find Flights
│   │   ├── ReservePage.ts       # Flights table, cheapest flight detection & selection
│   │   ├── PurchasePage.ts      # Passenger details form & purchase button
│   │   └── ConfirmationPage.ts  # Confirmation details & receipt extraction
│   ├── fixtures/
│   │   └── testFixtures.ts      # Playwright test fixture injecting POM instances
│   ├── models/                  # TypeScript interfaces
│   │   ├── flight.model.ts      # Flight criteria, flight info & confirmation models
│   │   └── passenger.model.ts   # Passenger details & card types
│   ├── data/
│   │   └── testData.ts          # Boston -> London search data & passenger payload
│   └── utils/
│       └── config.ts            # Base URL & timeout settings
├── tests/
│   └── flight-booking.spec.ts   # Single, comprehensive spec for Scenario 4 (Steps 1-15)
├── playwright.config.ts         # Runner configuration (Chromium, HTML reporter, traces)
├── tsconfig.json                # TypeScript compiler config
└── package.json                 # Execution scripts
```

---

## 🚀 How to Run the Tests

```bash
# 1. Install dependencies (if not already done)
npm install
npx playwright install chromium

# 2. Run the Scenario 4 test in headless mode
npm test

# 3. Run the test in headed (browser UI visible) mode
npm run test:headed

# 4. Run in interactive Playwright UI mode
npm run test:ui

# 5. View the HTML execution report
npm run report
```
