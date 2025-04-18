import { Page, Locator, expect } from "@playwright/test";
import { BasePage } from "../base/BasePage";

export class FlightsPage extends BasePage {
  private readonly _url = "/flights";

  private readonly roundTripRadioButton: Locator;
  private readonly originInput: Locator;
  private readonly destinationField: Locator;
  private readonly destinationInput: Locator;
  private readonly flightsSearchBoxSuggestionsList: Locator;
  private readonly datesField: Locator;
  private readonly calendarContainer: Locator;
  private readonly monthHeaders: Locator;
  private readonly searchButton: Locator;
  private readonly flightCardsList: Locator;
  private readonly invalidDateErrorMessage: Locator;

  readonly monthNames: string[] = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  constructor(page: Page) {
    super(page);

    this.roundTripRadioButton = this.page.getByText("Round-trip", {
      exact: true,
    });
    this.originInput = this.page.locator(
      "[data-ui-name='input_location_from_segment_0']"
    );
    this.destinationField = this.page.locator(
      "[data-ui-name='input_location_to_segment_0']"
    );
    this.destinationInput = this.page.locator(
      "[data-ui-name='input_text_autocomplete']"
    );
    this.flightsSearchBoxSuggestionsList = this.page.locator(
      "[id='flights-searchbox_suggestions'] li"
    );
    this.datesField = this.page.locator(
      "[data-ui-name='button_date_segment_0']"
    );
    this.calendarContainer = this.page.locator(
      "[data-ui-name='calendar_body']"
    );
    this.monthHeaders = this.page.locator("h3[aria-live='polite']");

    this.searchButton = this.page.locator(
      "[data-ui-name='button_search_submit']"
    );

    this.flightCardsList = this.page.locator(
      "[data-testid='searchresults_card']"
    );

    this.invalidDateErrorMessage = this.page.getByRole("button", {
      name: "Add your flight dates",
    });
  }

  async goto() {
    await super.goto(this._url);
    await this.page.waitForLoadState();
  }

  async clickDatesField() {
    await this.datesField.click();
  }

  async clickRoundTrip() {
    await this.roundTripRadioButton.click();
  }

  async clickSearchButton() {
    await this.searchButton.click();
  }

  async enterOrigin(origin: string) {
    await this.originInput.click();
    // WIP
  }

  async enterDestination(destination: string) {
    await this.destinationField.click();
    await this.destinationInput.fill(destination);

    // for simplicity we will select the first option
    await this.flightsSearchBoxSuggestionsList.first().click();
  }

  async selectStartDate(daysFromToday: number = 7) {
    await this.clickDatesField();
    await this.calendarContainer.waitFor();

    // Calculate future date
    const today = new Date();
    const futureDate = new Date(today);
    futureDate.setDate(today.getDate() + daysFromToday);

    // Format as YYYY-MM-DD for the data-date attribute
    const formattedDate = futureDate.toISOString().split("T")[0];

    // Try to find and click the date
    const dateElement = this.page.locator(`[data-date="${formattedDate}"]`);

    // If the date exists, click it
    if ((await dateElement.count()) > 0) {
      await dateElement.click();
    } else {
      // If not found, just click the first available date
      await this.page.locator("[data-date]").first().click();
    }

    // Return the formatted display date
    const day = futureDate.getDate();
    const month = this.monthNames[futureDate.getMonth()];
    const year = futureDate.getFullYear();

    return `${day} ${month} ${year}`;
  }

  async selectEndDate(daysFromToday: number = 14): Promise<string> {
    // await this.clickEndDateField();

    // Calculate future date
    const today = new Date();
    const futureDate = new Date(today);
    futureDate.setDate(today.getDate() + daysFromToday);

    // Select the date
    return await this.selectDate(futureDate);
  }

  async verifyAvailableFlights() {
    // Wait for at least one card to be available
    await this.flightCardsList.first().waitFor({ state: "visible" });

    const count = await this.flightCardsList.count();

    expect(count, "No available flights after search.").toBeGreaterThan(0);
  }

  async verifyInvalidDateErrorMessageIsDisplayed() {
    await expect(
      this.invalidDateErrorMessage,
      "Invalid date error message was not displayed."
    ).toBeVisible();
  }

  async verifyReturnDateSelectionEnabled() {
    await expect(
      this.datesField,
      "Return date selection is not enabled."
    ).toContainText("Return", { ignoreCase: true });
  }

  private async selectDate(date: Date): Promise<string> {
    // Format the date as YYYY-MM-DD for the data-date attribute
    const formattedDate = date.toISOString().split("T")[0]; // "2025-04-09"

    // Use locator with data-date attribute
    const dateElement = this.page.locator(`[data-date="${formattedDate}"]`);
    await dateElement.click();

    // Return formatted display date (for verification if needed)
    const day = date.getDate();
    const month = this.monthNames[date.getMonth()];
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  }
}
