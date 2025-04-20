import { Page, Locator, expect } from "@playwright/test";
import { BasePage } from "../base/BasePage";

export class PropertyDetailsPage extends BasePage {
  private readonly propertyName: Locator;
  private readonly propertyLocation: Locator;
  private readonly ratingArea: Locator;
  private readonly photoWrapper: Locator;
  private readonly galleryModal: Locator;
  private readonly galleryImageList: Locator;

  private readonly photoModal: Locator;
  private readonly modalPhotosList: Locator;
  private readonly nextPhotoArrow: Locator;
  private readonly previousPhotoArrow: Locator;
  private readonly closeModalButton: Locator;

  private readonly facilitiesTab: Locator;
  private readonly facilitiesGroup: Locator;

  private readonly reviewScoreComponent: Locator;
  private readonly reviewsBlockTitle: Locator;
  private readonly featuredReviews: Locator;

  private readonly mapWrapper: Locator;
  private readonly propertyMarker: Locator;

  constructor(page: Page) {
    super(page);

    this.propertyName = this.page.locator("[id='hp_hotel_name'] h2");
    this.propertyLocation = this.page.locator(
      "[data-testid='PropertyHeaderAddressDesktop-wrapper']"
    );
    this.ratingArea = this.page.locator(
      "[data-testid='review-score-right-component']"
    );
    this.photoWrapper = this.page.locator("[id='photo_wrapper']");
    this.galleryModal = this.page.locator(
      "[data-testid='GalleryGridViewModal-wrapper']"
    );
    this.galleryImageList = this.page.locator(
      "img[data-testid='lazy-image-image']"
    );

    this.photoModal = this.page.locator("[data-component='bh-photo-modal']");
    this.modalPhotosList = this.page.locator("[data-layout='photo-view'] img");
    this.nextPhotoArrow = this.page.locator("[aria-label='Next photo']");
    this.previousPhotoArrow = this.page.locator(
      "[aria-label='Previous photo']"
    );
    this.closeModalButton = this.page.getByRole("button", {
      name: "Close",
      exact: true,
    });

    this.facilitiesTab = this.page.locator("[id='facilities-tab-trigger']");
    this.facilitiesGroup = this.page.locator(
      "[data-testid='facility-group-container']"
    );

    this.reviewScoreComponent = this.page.locator(
      "[data-testid='review-score-component']"
    );
    this.reviewsBlockTitle = this.page.locator(
      "[data-testid='reviews-block-title']"
    );
    this.featuredReviews = this.page.locator("[data-testid='featuredreview']");

    this.mapWrapper = this.page.locator(
      "[data-testid='MapEntryPointDesktop-wrapper']"
    );
    this.propertyMarker = this.page.locator(
      "[data-testid='map-entry-point-marker']"
    );
  }

  async clickFirstImageFromGallery() {
    const firstImageLocator = this.page.getByRole("button", {
      name: "Photo 1 of",
    });

    await firstImageLocator.waitFor();

    await firstImageLocator.click();
  }

  async clickFirstImage() {
    await this.photoWrapper.waitFor();
    await this.photoWrapper.first().click();
  }

  async closePhotoGalleryModal() {
    await this.closeModalButton.click();
  }

  async verifyEssentialInformation() {
    await this.page.waitForLoadState("networkidle");

    await expect
      .soft(this.propertyName, "Hotel name should be visible")
      .toBeVisible();

    await expect
      .soft(this.propertyLocation, "Hotel location should be visible")
      .toBeVisible();

    await expect
      .soft(this.ratingArea, "Star rating should be visible")
      .toBeVisible();

    await expect(
      this.photoWrapper,
      "Photo Wrapper should be visible"
    ).toBeVisible();
  }

  async verifyImagesNavigation() {
    await this.photoModal.waitFor();

    await expect(
      this.photoModal,
      "Photo modal should be visible"
    ).toBeVisible();

    await this.modalPhotosList.first().waitFor();

    await expect(
      this.modalPhotosList.first(),
      "Photos in modal should be visible"
    ).toBeVisible();

    const currentImageURL = await this.modalPhotosList
      .first()
      .getAttribute("src");

    await this.nextPhotoArrow.click();

    const nextImageURL = await this.modalPhotosList.first().getAttribute("src");

    expect(
      currentImageURL,
      "Clicking Next arrow did not update the image"
    ).not.toEqual(nextImageURL);

    await this.previousPhotoArrow.click();

    const prevImageURL = await this.modalPhotosList.first().getAttribute("src");

    expect(
      prevImageURL,
      "Clicking Previous arrow did not update the image"
    ).not.toEqual(nextImageURL);
  }

  async verifyGalleryModalIsDisplayed() {
    await this.page.waitForLoadState("networkidle");

    await this.galleryModal.waitFor();

    await expect(
      this.galleryModal,
      "Gallery modal should be displayed."
    ).toBeVisible();
  }

  async verifyAmenitiesAreDisplayed() {
    const propertyName = await this.propertyName.textContent();

    await this.facilitiesTab.click();

    // Use a regex pattern to match either "Facilities" or "Amenities"
    const headerPattern = new RegExp(
      `(Facilities|Amenities) of ${propertyName}`
    );

    await expect(
      this.page.getByText(headerPattern),
      "Facilities/Amenities header is not displayed"
    ).toBeVisible();

    await expect(
      this.facilitiesGroup.getByText("Wifi").first(),
      "Wifi should be displayed in the Amenities area"
    ).toBeVisible();
  }

  async softVerifyPropertyLocationInMap() {
    await expect.soft(this.mapWrapper, "Map should be visible").toBeVisible();

    await expect
      .soft(this.propertyMarker, "Property marker should be visible")
      .toBeVisible();
  }

  async verifyReviewsAndRatingsAreDisplayed(): Promise<void> {
    // 1. Verify the review score component is visible
    await expect(
      this.reviewScoreComponent,
      "Review score component should be visible"
    ).toBeVisible();

    // 2. Verify review block title/section is present
    await expect(
      this.reviewsBlockTitle,
      "Reviews block title should be visible"
    ).toBeVisible();

    // 3. Verify actual review items/content is displayed
    const reviewCount = await this.featuredReviews.count();
    expect(reviewCount, "Should display at least one review").toBeGreaterThan(
      0
    );

    // Check that the first review has content
    const firstReview = this.featuredReviews.first();
    await expect(firstReview, "Review text should be visible").toBeVisible();
  }
}
