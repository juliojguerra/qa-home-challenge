import { test, expect } from "@playwright/test";
import { HomePage } from "../page-objects/homepage/HomePage";
import { SearchResultsPage } from "../page-objects/search-results/SearchResultsPages";

test.describe("Hotel Search & Filtering", () => {
  test('TC-S-001 - Verify searching for hotels in "New York" displays relevant results', async ({
    page,
  }) => {
    const homePage = new HomePage(page);
    const searchResultsPage = new SearchResultsPage(page);
    const searchLocation = "New York, United States";

    await homePage.goto();

    await homePage.fillSearchDestination(searchLocation);

    await homePage.selectStartDate();

    await homePage.selectEndDate();

    await homePage.clickSearchButton();

    await searchResultsPage.verifySearchResultsByLocation(searchLocation);
  });

  // Selecting check-in and check-out dates should update availability.
  test("TC-D-001 - Verify selecting check-in and check-out dates updates availability", async ({
    page,
  }) => {
    const homePage = new HomePage(page);
    const searchResultsPage = new SearchResultsPage(page);
    const destination = "Valencia";

    await homePage.goto();
    await homePage.fillSearchDestination(destination);
    await homePage.selectStartDate(1);
    await homePage.selectEndDate(10);
    await homePage.clickSearchButton();

    await searchResultsPage.verifySearchResultsByLocation(destination);
    await searchResultsPage.verifyResultsCountIsGreaterThan0();

    const propertiesCount = await searchResultsPage.getPropertiesFoundCount(
      test
    );

    expect(propertiesCount, "Expected to find hotel results").toBeGreaterThan(
      0
    );

    // select new dates, with less range
    await homePage.clickDatesContainer();
    await homePage.selectStartDate(1);

    await homePage.selectEndDate(5);

    await homePage.clickSearchButton();

    await homePage.pause();

    const newPropertiesCount = await searchResultsPage.getPropertiesFoundCount(
      test
    );

    expect(
      newPropertiesCount >= propertiesCount,
      "New properties count should be higher or equal to previous selection, since date range is shorter"
    ).toBeTruthy();
  });
  // Applying a "Guest Rating: 8+" filter should update results correctly.
  // Sorting by "Lowest Price" should reorder results as expected.
});
