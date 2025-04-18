import { Page, Locator } from "@playwright/test";
import { BasePage } from "../base/BasePage";
import { SearchBoxPage } from "../common/SearchBoxPage";
import { FiltersPage } from "../common/FiltersPage";

export class HomePage extends BasePage {
  private readonly destinationSearchField: Locator;
  private readonly searchButton: Locator;
  private readonly datesContainer: Locator;
  private readonly startDateField: Locator;
  private readonly endDateField: Locator;

  private readonly monthNames: string[] = [
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

  async goto() {
    await super.goto("/");
    const searchBox = this.getSearchBox();
    await searchBox.handleGeniusModal();
  }

  getSearchBox(): SearchBoxPage {
    return new SearchBoxPage(this.page);
  }

  getFilterArea(): FiltersPage {
    return new FiltersPage(this.page);
  }
}
