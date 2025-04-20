import { Page, Locator, expect, BrowserContext } from "@playwright/test";
import { ai } from "@zerostep/playwright";
import { BasePage } from "../base/BasePage";
import { PropertyDetailsPage } from "../properties/PropertyDetailsPage";

export class SearchResultsPage extends BasePage {
  private readonly searchResultHeading: Locator;
  private readonly propertyCards: Locator;
  private readonly hotelLocations: Locator;
  private readonly allPropertiesPrices: Locator;
  private readonly sortersDropdown: Locator;
  private readonly priceLowersFirstOption: Locator;
  private readonly context: BrowserContext;

  private propertiesCount: Number;
  private newPropertiesCount: Number;

  constructor(page: Page) {
    super(page);
    this.context = page.context();
    this.propertyCards = page.locator("[data-testid='property-card']");
    this.hotelLocations = page.locator(
      "[data-testid='property-card'] [data-testid='location']"
    );
    this.allPropertiesPrices = page.locator(
      "[data-testid='price-and-discounted-price']"
    );

    // sortersDropdown
    this.sortersDropdown = page.locator(
      "[data-testid='sorters-dropdown-trigger']"
    );
    this.priceLowersFirstOption = page.locator("[data-id='price']");

    this.propertiesCount = 0;
    this.newPropertiesCount = 0;
  }

  async clickFirstProperty() {
    // Create a promise that will resolve when a new page is created
    const pagePromise = this.context.waitForEvent("page");

    // Click on the first property (this will open a new tab)
    await this.propertyCards.first().click();

    // Wait for the new page to be created and load
    const newPage = await pagePromise;
    await newPage.waitForLoadState("networkidle");

    // Return a new HotelDetailsPage instance with the new page
    return new PropertyDetailsPage(newPage);
  }

  async clickSortersDropdown() {
    await this.sortersDropdown.click();
  }

  async getResultsCount() {
    return await this.propertyCards.count();
  }

  async getSearchResultHeading(expectedLocation: string) {
    // Find all heading elements first
    const headings = this.page.getByRole("heading");

    // Create a locator that contains the expected text (partial match)
    return headings
      .filter({
        hasText: expectedLocation,
      })
      .first();
  }

  async getPropertiesFoundCount(test: any): Promise<number> {
    if (!test) {
      throw new Error(
        "ZeroStep requires a valid test object. Please pass the test object from your test function."
      );
    }

    // Use zerostep ai to extract the property count
    const countText = await ai("Extract the number of properties found", {
      page: this.page,
      test,
    });

    // Parse the result to a number, handling potential non-numeric responses
    const count = parseInt(countText, 10);
    return isNaN(count) ? 0 : count;
  }

  async selectLowestPriceFirstOption() {
    await this.clickSortersDropdown();

    await this.priceLowersFirstOption.click();
  }

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

  async verifyNewResultsCountIsEqualOrHigher(test: any) {
    this.newPropertiesCount = await this.getPropertiesFoundCount(test);

    expect(
      this.newPropertiesCount >= this.propertiesCount,
      "New properties count should be higher or equal to previous selection, since date range is shorter"
    ).toBeTruthy();
  }

  async verifyResultsCountIsGreaterThan0(test: any) {
    this.propertiesCount = await this.getPropertiesFoundCount(test);

    expect(
      this.propertiesCount,
      "Expected to find hotel results"
    ).toBeGreaterThan(0);
  }

  async verifyNewPropertiesCountIsEqualOrHigherThan(
    test: any,
    propertiesCount: number
  ) {
    const newPropertiesCount = await this.getPropertiesFoundCount(test);

    expect(
      propertiesCount >= newPropertiesCount,
      "Selecting 8+ star rating did not update the results."
    ).toBeTruthy();
  }

  async verifySortingByLowestPriceReordersResults() {
    // Wait for prices to be visible after sorting
    await this.allPropertiesPrices.first().waitFor();

    // Get all prices
    const count = await this.allPropertiesPrices.count();
    const prices: number[] = [];

    // Extract and convert prices to numbers
    for (let i = 0; i < count; i++) {
      const priceText = await this.allPropertiesPrices.nth(i).textContent();
      if (priceText) {
        // Extract numeric value from price text
        const numericPrice = this.extractNumericPrice(priceText);
        prices.push(numericPrice);
      }
    }

    // Ensure we actually had prices to compare
    expect(
      prices.length,
      "No prices were found to verify sorting"
    ).toBeGreaterThan(0);

    // Create a sorted copy to compare against
    const sortedPrices = [...prices].sort((a, b) => a - b);

    // Compare the original prices array with the sorted one
    for (let i = 0; i < prices.length; i++) {
      expect(
        prices[i],
        `Price at index ${i} is not in ascending order`
      ).toEqual(sortedPrices[i]);
    }
  }

  // Helper method to extract numeric value from price string
  private extractNumericPrice(priceText: string): number {
    // Remove currency symbols and spaces
    const cleanText = priceText.trim();

    // Try to extract numbers with commas and decimal points
    const matches = cleanText.match(/[\d,.]+/g);

    if (!matches || matches.length === 0) {
      console.warn(`Could not extract numeric price from: ${priceText}`);
      return 0;
    }

    // Get the first match that's likely to be the price
    let numericString = matches[0];

    // Handle thousand separators (commas)
    // If the string has commas, remove them assuming they're thousand separators
    if (numericString.includes(",") && !numericString.includes(".")) {
      numericString = numericString.replace(/,/g, "");
    }
    // If the string has both commas and periods, assume comma is thousand separator
    else if (numericString.includes(",") && numericString.includes(".")) {
      numericString = numericString.replace(/,/g, "");
    }

    const numericValue = parseFloat(numericString);

    if (isNaN(numericValue)) {
      console.warn(`Failed to convert price text to number: ${priceText}`);
      return 0;
    }

    return numericValue;
  }
}
