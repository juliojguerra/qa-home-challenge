import { test } from "@playwright/test";
import { FlightsPage } from "../page-objects/flights/FlightsPage";
import { TestData } from "../test-data/test-data";

test.describe("User Story 2: Flight/Car Booking Process", () => {
  let flightsPage: FlightsPage;

  test.beforeEach(async ({ page }) => {
    flightsPage = new FlightsPage(page);
    await flightsPage.goto();
  });

  test("TC-FB-001 - Verify searching for round-trip flight enables return date selection", async ({}) => {
    await flightsPage.enterDestination(TestData.locations.EUROPE.POLAND.WARSAW);

    await flightsPage.selectStartDateInXDays(1);

    await flightsPage.verifyReturnDateSelectionEnabled();
  });

  test("TC-FB-002 - Verify selecting departure & destination displays available flights", async ({}) => {
    await flightsPage.enterDestination(
      TestData.locations.EUROPE.NETHERLANDS.AMSTERDAM
    );

    await flightsPage.clickSearchButton();

    await flightsPage.verifyAvailableFlights();
  });

  test("TC-FB-003 - Verify invalid date range triggers error message", async ({}) => {
    await flightsPage.clickRoundTrip();

    await flightsPage.enterDestination(
      TestData.locations.AMERICAS.COLOMBIA.MEDELLIN
    );

    await flightsPage.selectStartDateInXDays();

    await flightsPage.clickSearchButton();

    await flightsPage.verifyInvalidDateErrorMessageIsDisplayed();
  });

  // Need clarification for this test:
  // Proceeding to checkout should display a booking summary.
});
