import { test } from "@playwright/test";
import { HomePage } from "../page-objects/homepage/HomePage";
import { SearchBoxPage } from "../page-objects/common/SearchBoxPage";
import { TestData } from "../test-data/test-data";

test.describe("User Story 1: Hotel Search & Filtering", () => {
  let homePage: HomePage;
  let searchBox: SearchBoxPage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    searchBox = homePage.getSearchBox();
    await homePage.goto();
  });

  test('TC-S-001 - Verify searching for hotels in "New York" displays relevant results', async ({}) => {
    const searchLocation = TestData.locations.AMERICAS.USA.NEW_YORK;

    await searchBox.fillSearchDestination(searchLocation);

    await searchBox.selectStartDateInXDays();
    await searchBox.selectEndDateInXDays();
    const searchResultsPage = await searchBox.clickSearchButton();

    await searchResultsPage.verifySearchResultsByLocation(searchLocation);
  });

  test("TC-D-001 - Verify selecting check-in and check-out dates updates availability", async ({}) => {
    const destination = TestData.locations.EUROPE.SPAIN.VALENCIA;

    await searchBox.fillSearchDestination(destination);
    await searchBox.selectStartDateInXDays(1);
    await searchBox.selectEndDateInXDays(10);

    let searchResultsPage = await searchBox.clickSearchButton();

    await searchResultsPage.verifySearchResultsByLocation(destination);

    await searchResultsPage.verifyResultsCountIsGreaterThan0(test);

    await searchBox.clickDatesContainer();
    await searchBox.selectStartDateInXDays(1);
    await searchBox.selectEndDateInXDays(5);
    searchResultsPage = await searchBox.clickSearchButton();

    // New properties count should be higher or equal to previous selection, since date range is shorter
    await searchResultsPage.verifyNewResultsCountIsEqualOrHigher(test);
  });

  test("TC-F-001 - Verify applying Guest Rating: 8+ filter updates results correctly", async ({}) => {
    const filterArea = homePage.getFilterArea();

    const destination = TestData.locations.AMERICAS.PERU.AREQUIPA;

    await searchBox.fillSearchDestination(destination);
    await searchBox.selectStartDateInXDays(1);
    await searchBox.selectEndDateInXDays(10);

    let searchResultsPage = await searchBox.clickSearchButton();

    const propertiesCount = await searchResultsPage.getPropertiesFoundCount(
      test
    );

    await filterArea.filterByVeryGood8Plus();

    await filterArea.verifyVeryGood8PlusFilterIsChecked();

    await searchResultsPage.verifyNewPropertiesCountIsEqualOrHigherThan(
      test,
      propertiesCount
    );
  });

  test("TC-SO-001 - Verify sorting by 'Lowest Price' reorders results as expected", async ({}) => {
    const destination = TestData.locations.AMERICAS.PERU.AYACUCHO;

    await searchBox.fillSearchDestination(destination);
    await searchBox.selectStartDateInXDays(1);
    await searchBox.selectEndDateInXDays(5);

    let searchResultsPage = await searchBox.clickSearchButton();

    await searchResultsPage.selectLowestPriceFirstOption();

    await searchResultsPage.verifySortingByLowestPriceReordersResults();
  });
});
