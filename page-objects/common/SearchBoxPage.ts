import { Page, Locator } from "@playwright/test";
import { BasePage } from "../base/BasePage";
import { SearchResultsPage } from "../search-results/SearchResultsPages";

export class SearchBoxPage extends BasePage {
  readonly destinationSearchField: Locator;
  readonly searchButton: Locator;
  readonly datesContainer: Locator;
  readonly startDateField: Locator;
  readonly endDateField: Locator;

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
    this.destinationSearchField = page.getByPlaceholder("Where are you going?");
    this.searchButton = page.getByRole("button", { name: "Search" });
    this.datesContainer = page.getByTestId("searchbox-dates-container");
    this.startDateField = page.getByTestId("date-display-field-start");
    this.endDateField = page.getByTestId("date-display-field-end");
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
    // div[data-testid='autocomplete-results-options']
    await this.page.waitForSelector(
      'div[data-testid="autocomplete-results-options"]',
      {
        state: "visible",
      }
    );

    // This locator will find any descendant element within the autocomplete container
    // that contains the destination text (not requiring direct child relationship)
    await this.page
      .locator(
        `div[data-testid="autocomplete-results-options"] :text("${destination}")`
      )
      .first()
      .click();
  }

  async selectStartDate(daysFromToday: number = 7): Promise<string> {
    // await this.clickStartDateField();
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

  async selectEndDate(daysFromToday: number = 14): Promise<string> {
    // await this.clickEndDateField();

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
