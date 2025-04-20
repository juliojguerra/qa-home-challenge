import { test } from "@playwright/test";
import { HomePage } from "../page-objects/homepage/HomePage";
import { TestData } from "../test-data/test-data";

test.describe("User Story 3: Hotel Details & Amenities Verification", () => {
  test("TC-E2E-001 - Verify end-to-end hotel search, details, and booking flow", async ({
    page,
  }) => {
    const homePage = new HomePage(page);
    const searchBox = homePage.getSearchBox();

    await homePage.goto();

    const searchLocation = TestData.locations.EUROPE.POLAND.KRAKOW;

    await searchBox.fillSearchDestination(searchLocation);
    await searchBox.selectStartDateInXDays();
    await searchBox.selectEndDateInXDays();

    let searchResultsPage = await searchBox.clickSearchButton();

    // From the hotel search results, select a hotel listing to navigate to its details page.
    // For simplicity we will select the first element in this and upcoming steps
    let propertyDetailsPage = await searchResultsPage.clickFirstProperty();

    // Verify that the hotel details page displays essential information such as the hotel name, location, and star rating.
    await propertyDetailsPage.verifyEssentialInformation();

    await propertyDetailsPage.clickFirstImage();

    await propertyDetailsPage.clickFirstImageFromGallery();

    await propertyDetailsPage.verifyImagesNavigation();

    await propertyDetailsPage.closePhotoGalleryModal();

    await propertyDetailsPage.verifyAmenitiesAreDisplayed();

    await propertyDetailsPage.verifyReviewsAndRatingsAreDisplayed();

    // Optionally, check that a map showing the hotel’s location is present.
    await propertyDetailsPage.softVerifyPropertyLocationInMap();
  });
});
