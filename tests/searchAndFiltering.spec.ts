import { test, expect } from "@playwright/test";
import { HomePage } from "../page-objects/homepage/HomePage";
import { SearchBoxPage } from "../page-objects/common/SearchBoxPage";

test.describe("User Story 1: Hotel Search & Filtering", () => {
  let homePage: HomePage;
  let searchBox: SearchBoxPage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    searchBox = homePage.getSearchBox();
    await homePage.goto();
  });

  test('TC-S-001 - Verify searching for hotels in "New York" displays relevant results', async ({}) => {
    const searchLocation = "New York, United States";

    await searchBox.fillSearchDestination(searchLocation);
    await searchBox.selectStartDate();
    await searchBox.selectEndDate();
    const searchResultsPage = await searchBox.clickSearchButton();

    await searchResultsPage.verifySearchResultsByLocation(searchLocation);
  });

  test("TC-D-001 - Verify selecting check-in and check-out dates updates availability", async ({}) => {
    const destination = "Valencia";

    await searchBox.fillSearchDestination(destination);
    await searchBox.selectStartDate(1);
    await searchBox.selectEndDate(10);

    let searchResultsPage = await searchBox.clickSearchButton();

    await searchResultsPage.verifySearchResultsByLocation(destination);
    await searchResultsPage.verifyResultsCountIsGreaterThan0();

    const propertiesCount = await searchResultsPage.getPropertiesFoundCount(
      test
    );

    expect(propertiesCount, "Expected to find hotel results").toBeGreaterThan(
      0
    );

    await searchBox.clickDatesContainer();
    await searchBox.selectStartDate(1);
    await searchBox.selectEndDate(5);
    searchResultsPage = await searchBox.clickSearchButton();

    const newPropertiesCount = await searchResultsPage.getPropertiesFoundCount(
      test
    );

    expect(
      newPropertiesCount >= propertiesCount,
      "New properties count should be higher or equal to previous selection, since date range is shorter"
    ).toBeTruthy();
  });

  test("TC-F-001 - Verify applying Guest Rating: 8+ filter updates results correctly", async ({}) => {
    const filterArea = homePage.getFilterArea();
    const destination = "Valencia";

    await searchBox.fillSearchDestination(destination);
    await searchBox.selectStartDate(1);
    await searchBox.selectEndDate(10);

    let searchResultsPage = await searchBox.clickSearchButton();

    const propertiesCount = await searchResultsPage.getPropertiesFoundCount(
      test
    );

    await filterArea.filterByVeryGood8Plus();

    const isVeryGood8PlusFilterChecked =
      await filterArea.isVeryGood8PlusFilterChecked();

    expect(
      isVeryGood8PlusFilterChecked,
      "8+ star rating should be checked"
    ).toBeTruthy();

    const newPropertiesCount = await searchResultsPage.getPropertiesFoundCount(
      test
    );

    expect(
      propertiesCount >= newPropertiesCount,
      "Selecting 8+ star rating did not update the results."
    ).toBeTruthy();
  });

  test("TC-SO-001 - Verify sorting by 'Lowest Price' reorders results as expected", async ({}) => {
    const destination = "Valencia";

    await searchBox.fillSearchDestination(destination);
    await searchBox.selectStartDate(1);
    await searchBox.selectEndDate(5);

    let searchResultsPage = await searchBox.clickSearchButton();

    await searchResultsPage.selectLowestPriceFirstOption();

    await searchResultsPage.verifySortingByLowestPriceReordersResults();
  });
});
