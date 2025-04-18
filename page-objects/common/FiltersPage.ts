import { Page, Locator } from "@playwright/test";
import { BasePage } from "../base/BasePage";
import { ai } from "@zerostep/playwright";

export class FiltersPage extends BasePage {
  // Main filter container
  readonly filtersContainer: Locator;

  // Review score filters
  readonly reviewScoreSection: Locator;
  readonly wonderful9PlusFilter: Locator;
  readonly veryGood8PlusFilter: Locator;
  readonly good7PlusFilter: Locator;
  readonly pleasant6PlusFilter: Locator;

  constructor(page: Page) {
    super(page);

    // Review score section
    this.reviewScoreSection = this.page.locator(
      "[data-filters-group='review_score']"
    );

    // Review score filters - using data attributes for more reliable selection
    this.wonderful9PlusFilter = page
      .locator(
        "//div[@data-filters-group='review_score']//div[@data-testid='filters-group-label-content'][contains(text(), 'Wonderful: 9+')]"
      )
      .first();

    this.veryGood8PlusFilter = page
      .locator(
        "//div[@data-filters-group='review_score']//div[@data-testid='filters-group-label-content'][contains(text(), 'Very Good: 8+')]"
      )
      .first();

    this.good7PlusFilter = page
      .locator(
        "//div[@data-filters-group='review_score']//div[@data-testid='filters-group-label-content'][contains(text(), 'Good: 7+')]"
      )
      .first();

    this.pleasant6PlusFilter = page
      .locator(
        "//div[@data-filters-group='review_score']//div[@data-testid='filters-group-label-content'][contains(text(), 'Pleasant: 6+')]"
      )
      .first();
  }

  // Generic methods
  async waitForFiltersToLoad() {
    await this.reviewScoreSection.waitFor({ state: "visible", timeout: 5000 });
  }

  // Method to click a review score filter
  async clickReviewScoreFilter(filterLocator: Locator) {
    await filterLocator.scrollIntoViewIfNeeded();
    await filterLocator.click();

    // Wait for results to update
    await this.page.waitForLoadState("networkidle");
  }

  // Method to get the property count for a review score filter
  async getReviewScoreFilterCount(filterLocator: Locator): Promise<number> {
    // Find the parent label
    const parentLabel = await filterLocator
      .locator("xpath=./ancestor::label")
      .first();
    // Find the count element
    const countElement = await parentLabel.locator(".abf093bdfe");
    const countText = await countElement.textContent();
    return parseInt(countText?.replace(/,/g, "") || "0", 10);
  }

  // Method to check if a review score filter is applied
  async isReviewScoreFilterChecked(filterLocator: Locator): Promise<boolean> {
    await filterLocator.scrollIntoViewIfNeeded();
    return await filterLocator.isChecked();
  }

  // Review score filter methods
  async filterByWonderful9Plus() {
    await this.clickReviewScoreFilter(this.wonderful9PlusFilter);
  }

  async filterByVeryGood8Plus() {
    await this.clickReviewScoreFilter(this.veryGood8PlusFilter);
  }

  async filterByVeryGood8PlusWithAi(test: any) {
    if (!test) {
      throw new Error(
        "ZeroStep requires a valid test object. Please pass the test object from your test function."
      );
    }

    // Make sure review score section is visible
    await this.reviewScoreSection.scrollIntoViewIfNeeded();

    // Use ZeroStep AI to click the "Very Good: 8+" checkbox
    await ai("Scroll into the Review score section", {
      page: this.page,
      test,
    });

    await ai("Click on the Very Good: 8+ checkbox", {
      page: this.page,
      test,
    });

    // Wait for results to update
    await this.page.waitForLoadState("networkidle");
  }

  async filterByGood7Plus() {
    await this.clickReviewScoreFilter(this.good7PlusFilter);
  }

  async filterByPleasant6Plus() {
    await this.clickReviewScoreFilter(this.pleasant6PlusFilter);
  }

  // Helper method to filter by minimum review score
  async filterByMinimumScore(minScore: number) {
    let filterLocator: Locator;

    if (minScore >= 9) {
      filterLocator = this.wonderful9PlusFilter;
    } else if (minScore >= 8) {
      filterLocator = this.veryGood8PlusFilter;
    } else if (minScore >= 7) {
      filterLocator = this.good7PlusFilter;
    } else if (minScore >= 6) {
      filterLocator = this.pleasant6PlusFilter;
    } else {
      throw new Error(
        `Invalid minimum score: ${minScore}. Available options are 6+, 7+, 8+, or 9+.`
      );
    }

    await this.clickReviewScoreFilter(filterLocator);
  }

  // Get property counts for each review score filter
  async getWonderful9PlusCount(): Promise<number> {
    const parentElement = this.wonderful9PlusFilter.locator("xpath=./../..");
    const countElement = parentElement.locator("span.abf093bdfe");
    const countText = await countElement.textContent();
    return parseInt(countText?.replace(/,/g, "") || "0", 10);
  }

  async getVeryGood8PlusCount(): Promise<number> {
    const parentElement = this.veryGood8PlusFilter.locator("xpath=./../..");
    const countElement = parentElement.locator("span.abf093bdfe");
    const countText = await countElement.textContent();
    return parseInt(countText?.replace(/,/g, "") || "0", 10);
  }

  async getGood7PlusCount(): Promise<number> {
    const parentElement = this.good7PlusFilter.locator("xpath=./../..");
    const countElement = parentElement.locator("span.abf093bdfe");
    const countText = await countElement.textContent();
    return parseInt(countText?.replace(/,/g, "") || "0", 10);
  }

  async getPleasant6PlusCount(): Promise<number> {
    const parentElement = this.pleasant6PlusFilter.locator("xpath=./../..");
    const countElement = parentElement.locator("span.abf093bdfe");
    const countText = await countElement.textContent();
    return parseInt(countText?.replace(/,/g, "") || "0", 10);
  }

  // Check if review score filters are applied
  async isWonderful9PlusFilterChecked(): Promise<boolean> {
    return this.isReviewScoreFilterChecked(this.wonderful9PlusFilter);
  }

  async isVeryGood8PlusFilterChecked(): Promise<boolean> {
    return this.isReviewScoreFilterChecked(this.veryGood8PlusFilter);
  }

  async isGood7PlusFilterChecked(): Promise<boolean> {
    return this.isReviewScoreFilterChecked(this.good7PlusFilter);
  }

  async isPleasant6PlusFilterChecked(): Promise<boolean> {
    return this.isReviewScoreFilterChecked(this.pleasant6PlusFilter);
  }
}
