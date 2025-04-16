import { Page, Locator, expect } from "@playwright/test";
import { ai } from "@zerostep/playwright";
import { BasePage } from "../base/BasePage";

export class SearchResultsPage extends BasePage {
  readonly searchResultHeading: Locator;
  readonly hotelResults: Locator;
  readonly hotelLocations: Locator;

  constructor(page: Page) {
    super(page);
    this.searchResultHeading = page.getByRole("heading", { name: /New York/ });
    this.hotelResults = page.locator('[data-testid="property-card"]');
    this.hotelLocations = page.locator(
      '[data-testid="property-card"] [data-testid="location"]'
    );
  }

  async getResultsCount() {
    return await this.hotelResults.count();
  }

  async getSearchResultHeading(expectedLocation: string): Promise<Locator> {
    return this.page.getByRole("heading", { name: expectedLocation }).first();
  }

  async getPropertiesFoundCount(test: any): Promise<number> {
    if (!test) {
      throw new Error(
        "ZeroStep requires a valid test object. Please pass the test object from your test function."
      );
    }
    // Use 0step ai to extract the property count
    const countText = await ai("Extract the number of properties found", {
      page: this.page,
      test,
    });

    // Parse the result to a number, handling potential non-numeric responses
    const count = parseInt(countText, 10);
    return isNaN(count) ? 0 : count;
  }

  // async areAllHotelsInLocation(location: string) {
  //   const count = await this.hotelLocations.count();
  //   for (let i = 0; i < count; i++) {
  //     const locationText = await this.hotelLocations.nth(i).textContent();
  //     if (!locationText?.toLowerCase().includes(location.toLowerCase())) {
  //       return false;
  //     }
  //   }
  //   return true;
  // }

  async verifySearchResultsByLocation(expectedLocation: string) {
    // Verify heading contains the search term
    const heading = await this.getSearchResultHeading(expectedLocation);
    await expect(
      heading,
      `Results heading is not visible for the location: ${expectedLocation}`
    ).toBeVisible();

    const resultsCount = await this.getResultsCount();
    expect(resultsCount).toBeGreaterThan(0);
  }

  async verifyResultsCountIsGreaterThan0() {
    const resultsCount = await this.getResultsCount();
    expect(resultsCount, "Expected to find hotel results").toBeGreaterThan(0);
  }
}
