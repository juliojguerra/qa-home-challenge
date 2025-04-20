import { Page, Locator } from "@playwright/test";
import { BasePage } from "../base/BasePage";
import { SearchResultsPage } from "../search-results/SearchResultsPages";

export class SearchBoxPage extends BasePage {
  private readonly destinationSearchField: Locator;
  private readonly searchButton: Locator;
  private readonly datesContainer: Locator;
  private readonly startDateField: Locator;
  private readonly endDateField: Locator;
  private readonly autocompleteResultsDropdown: Locator;
  private readonly autocompleteResultOptions: Locator;

  private readonly autocompleteResultOptionsSelector: string =
    "[data-testid='autocomplete-result']";

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
    this.destinationSearchField = this.page.getByPlaceholder(
      "Where are you going?"
    );
    this.searchButton = this.page.getByRole("button", { name: "Search" });
    this.datesContainer = this.page.getByTestId("searchbox-dates-container");
    this.startDateField = this.page.getByTestId("date-display-field-start");
    this.endDateField = this.page.getByTestId("date-display-field-end");
    this.autocompleteResultsDropdown = this.page.locator(
      "[data-testid='autocomplete-results']"
    );
    this.autocompleteResultOptions = this.page.locator(
      this.autocompleteResultOptionsSelector
    );
  }

  async clickSearchButton() {
    await this.clickAndWaitForLoadState(this.searchButton);
    await this.handleGeniusModal();
    return new SearchResultsPage(this.page);
  }

  async clickDatesContainer() {
    await this.datesContainer.click();
  }

  async clickStartDateField() {
    await this.startDateField.click();
  }

  async clickEndDateField() {
    await this.endDateField.click();
  }

  async fillSearchDestination(destination: string) {
    await this.fillField(this.destinationSearchField, destination);

    // wait for the first option to be displayed
    await this.autocompleteResultsDropdown.waitFor();

    // Wait for the content to update with matching results
    // This uses the first word of the destination as a check
    const firstWord = destination.split(/[\s,]+/)[0];
    await this.page.waitForSelector(
      `${this.autocompleteResultOptionsSelector}:has-text("${firstWord}")`,
      { state: "visible", timeout: 5000 }
    );

    // Get all autocomplete options
    const optionsCount = await this.autocompleteResultOptions.count();

    // Try to find an option containing the destination text
    let found = false;
    for (let i = 0; i < optionsCount; i++) {
      const option = this.autocompleteResultOptions.nth(i);
      const optionText = await option.textContent();

      // Check if this option contains our destination text
      if (optionText && optionText.includes(destination)) {
        await option.click();
        found = true;
        break;
      }
    }

    // If no exact match is found, just click the first option
    if (!found && optionsCount > 0) {
      await this.autocompleteResultOptions.first().click();
    }
  }

  async selectStartDateInXDays(daysFromToday: number = 7): Promise<string> {
    await this.page.waitForSelector("nav[data-testid='datepicker-tabs']", {
      state: "visible",
    });

    // Calculate future date
    const today = new Date();
    const futureDate = new Date(today);
    futureDate.setDate(today.getDate() + daysFromToday);

    // Select the date
    return await this.selectDate(futureDate);
  }

  async selectEndDateInXDays(daysFromToday: number = 14): Promise<string> {
    // Calculate future date
    const today = new Date();
    const futureDate = new Date(today);
    futureDate.setDate(today.getDate() + daysFromToday);

    // Select the date
    return await this.selectDate(futureDate);
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
