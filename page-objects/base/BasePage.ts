import { Page, Locator, expect } from "@playwright/test";

export class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Navigate to the base URL defined in your Playwright config
   */
  async goto(path: string = "/") {
    await this.page.goto(path);
    // await this.dismissPopups();
  }

  /**
   * Pause the execution for debugging purposes
   */
  async pause() {
    await this.page.pause();
  }

  /**
   * Wait for a specific load state
   */
  async waitForLoadState(
    state: "networkidle" | "load" | "domcontentloaded" = "networkidle"
  ) {
    await this.page.waitForLoadState(state);
  }

  /**
   * Get a text value from a locator
   */
  async getText(locator: Locator): Promise<string> {
    return (await locator.textContent()) || "";
  }

  /**
   * Check if an element is visible
   */
  async isVisible(locator: Locator, timeout: number = 5000): Promise<boolean> {
    try {
      await locator.waitFor({ state: "visible", timeout });
      return true;
    } catch (error) {
      return false;
    }
  }

  /**
   * Fill a form field with text
   */
  async fillField(locator: Locator, text: string) {
    await locator.click();
    await locator.clear();
    await locator.fill(text);
  }

  async handleGeniusModal() {
    try {
      // Check for the specific Genius modal with the "Sign in, save money" text
      const geniusModal = this.page
        .locator('div[role="dialog"]')
        .filter({ hasText: "Sign in, save money" });

      if (await this.isVisible(geniusModal, 2000)) {
        // Look for close buttons within the modal
        const closeButton = geniusModal.locator("button").first();
        await closeButton.click();
      }
    } catch (error) {
      // Continue if we can't handle this specific popup
      console.log("Genius modal either not present or could not be closed");
    }
  }

  /**
   * Click a button or link and wait for a specific load state
   */
  async clickAndWaitForLoadState(
    locator: Locator,
    state: "networkidle" | "load" | "domcontentloaded" = "networkidle"
  ) {
    await locator.click();
    await this.page.waitForLoadState(state);
  }
}
