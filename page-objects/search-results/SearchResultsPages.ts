import { Page, Locator, expect } from "@playwright/test";
import { ai } from "@zerostep/playwright";
import { BasePage } from "../base/BasePage";

export class SearchResultsPage extends BasePage {
  private readonly searchResultHeading: Locator;
  private readonly hotelResults: Locator;
  private readonly hotelLocations: Locator;
  private readonly allPropertiesPrices: Locator;
  private readonly sortersDropdown: Locator;
  private readonly priceLowersFirstOption: Locator;

  constructor(page: Page) {
    super(page);
    this.hotelResults = page.locator("[data-testid='property-card']");
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
  }

  async clickSortersDropdown() {
    this.sortersDropdown.click();
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

  async selectLowestPriceFirstOption() {
    await this.clickSortersDropdown();

    await this.priceLowersFirstOption.click();
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
