import { expect, Locator, Page } from "@playwright/test";
import Footer from "@pom/components/footer";
import { PATHS, TIMEOUT } from "@test-data/constants";
import { PAGE_OBJECT_MESSAGES } from "@test-data/logger-messages";
import { logger } from "@utils/core.utils";
import { expectToBeTruthy, expectToBeVisible } from "@utils/expect";

/**
 * Base Page Object Model class
 * Contains common functionality shared across all page objects
 */
export abstract class BasePage {
  protected readonly page: Page;
  protected readonly baseURL: string;

  // Main navigation elements
  readonly navigation: Locator;
  readonly navigationMenu: Locator;
  readonly navigationToggle: Locator;

  // Navigation links
  readonly homeLink: Locator;
  readonly aboutLink: Locator;
  readonly cvLink: Locator;
  readonly blogLink: Locator;
  readonly linksLink: Locator;
  readonly techLink: Locator;

  // Language switcher
  readonly languageSwitcher: Locator;
  readonly englishLink: Locator;
  readonly germanLink: Locator;

  readonly footer: Footer;

  // SEO and meta elements (fallback to generic selectors)
  readonly pageTitle: Locator;
  readonly metaDescription: Locator;
  readonly openGraphTitle: Locator;

  constructor(page: Page) {
    this.page = page;
    this.baseURL = process.env.TEST_BASE_URL ?? "http://localhost:3000";

    // Main navigation elements
    this.navigation = page.locator("header");
    this.navigationMenu = page.locator('[data-testid="navigation-menu"]');
    this.navigationToggle = page.locator('[data-testid="navigation-toggle"]');

    // Navigation links
    this.homeLink = page.locator('[data-testid="nav-home-link"]');
    this.aboutLink = page.locator('[data-testid="nav-about-link"]');
    this.cvLink = page.locator('[data-testid="nav-cv-link"]');
    this.blogLink = page.locator('[data-testid="nav-blog-link"]');
    this.linksLink = page.locator('[data-testid="nav-links-link"]');
    this.techLink = page.locator('[data-testid="nav-tech-link"]');

    // Language switcher
    this.languageSwitcher = page.locator('[data-testid="language-switcher"]');
    this.englishLink = page.locator('[data-testid="lang-en"]');
    this.germanLink = page.locator('[data-testid="lang-de"]');

    // Footer elements
    this.footer = new Footer(page.locator('[data-testid="footer"]'));

    // SEO and meta elements (fallback to generic selectors)
    this.pageTitle = page.locator("title");
    this.metaDescription = page.locator('meta[name="description"]');
    this.openGraphTitle = page.locator('meta[property="og:title"]');
  }

  /**
   * Common navigation methods
   */
  async goto(path: string = ""): Promise<void> {
    const url = path.startsWith("/") ? path : `/${path}`;
    await this.page.goto(url);
    await this.waitForPageLoad();
  }

  async reload(): Promise<void> {
    await this.page.reload();
    await this.waitForPageLoad();
  }

  async goBack(): Promise<void> {
    await this.page.goBack();
    await this.waitForPageLoad();
  }

  async goForward(): Promise<void> {
    await this.page.goForward();
    await this.waitForPageLoad();
  }

  /**
   * Common waiting methods
   */
  async waitForPageLoad(timeout: number = TIMEOUT): Promise<void> {
    await Promise.all([
      this.page.waitForLoadState("networkidle", { timeout }),
      this.page.waitForFunction(() => document.readyState === "complete", {
        timeout,
      }),
    ]);
  }

  async waitForElement(
    selector: string,
    timeout: number = TIMEOUT
  ): Promise<Locator> {
    const element = this.page.locator(selector);
    await element.waitFor({ state: "visible", timeout });
    return element;
  }

  async waitForUrl(
    urlPattern: string | RegExp,
    timeout: number = TIMEOUT
  ): Promise<void> {
    await this.page.waitForURL(urlPattern, { timeout });
  }

  /**
   * Common interaction methods
   */

  async safeSelectOption(
    locator: Locator,
    option: string | string[],
    timeout: number = TIMEOUT
  ): Promise<void> {
    await locator.waitFor({ state: "visible", timeout });
    await locator.selectOption(option);
  }

  /**
   * Navigation methods
   */
  async gotoHome(): Promise<void> {
    await this.goto(PATHS.HOME);
    await this.assertPageLoaded();
  }

  async goToAbout(): Promise<void> {
    await this.aboutLink.click();
    await this.waitForPageLoad();
  }

  async goToBlog(): Promise<void> {
    await this.blogLink.click();
    await this.waitForPageLoad();
  }

  async goToCV(): Promise<void> {
    await this.cvLink.click();
    await this.waitForPageLoad();
  }

  async goToLinks(): Promise<void> {
    await this.linksLink.click();
    await this.waitForPageLoad();
  }

  /**
   * Language switching methods
   */
  async switchToEnglish(): Promise<void> {
    if (await this.isElementVisible(this.englishLink)) {
      await this.englishLink.click();
      await this.waitForPageLoad();
    }
  }

  async switchToGerman(): Promise<void> {
    if (await this.isElementVisible(this.germanLink)) {
      await this.germanLink.click();
      await this.waitForPageLoad();
    }
  }

  /**
   * Mobile navigation methods
   */
  async openMobileMenu(): Promise<void> {
    if (await this.isElementVisible(this.navigationToggle)) {
      await this.navigationToggle.click();
    }
  }

  async closeMobileMenu(): Promise<void> {
    if (await this.isElementVisible(this.navigationToggle)) {
      await this.navigationToggle.click();
    }
  }

  /**
   * Assertion methods (implements BasePage abstract method)
   */

  async assertNavigationVisible(): Promise<void> {
    await expectToBeVisible(this.navigation);
    await expectToBeVisible(this.homeLink);
    await expectToBeVisible(this.aboutLink);
    await expectToBeVisible(this.blogLink);
    await expectToBeVisible(this.cvLink);
    await expectToBeVisible(this.linksLink);
  }

  async assertLanguageSwitcherVisible(): Promise<void> {
    if (await this.isElementVisible(this.languageSwitcher)) {
      await expectToBeVisible(this.languageSwitcher);
    }
  }

  async assertMetaDescription(expectedDescription?: string): Promise<void> {
    if (expectedDescription) {
      const description = await this.metaDescription.getAttribute("content");
      await expectToBeTruthy(description);
      if (description) {
        expect(description).toContain(expectedDescription);
      }
    }
  }

  /**
   * Common utility methods
   */
  async getPageTitle(): Promise<string> {
    return await this.page.title();
  }

  async checkPageHasTitle(title: string, option = true): Promise<void> {
    let assert = expect(this.page);
    if (!option) {
      assert = assert.not;
    }
    return assert.toHaveTitle(title);
  }

  async getCurrentUrl(): Promise<string> {
    return this.page.url();
  }

  async getElementText(locator: Locator): Promise<string> {
    return (await locator.textContent()) ?? "";
  }

  async getElementValue(locator: Locator): Promise<string> {
    return await locator.inputValue();
  }

  async isElementVisible(
    locator: Locator,
    timeout: number = TIMEOUT
  ): Promise<boolean> {
    try {
      await locator.waitFor({ state: "visible", timeout });
      return true;
    } catch {
      return false;
    }
  }

  async isElementEnabled(locator: Locator): Promise<boolean> {
    return await locator.isEnabled();
  }

  async getElementCount(locator: Locator): Promise<number> {
    return await locator.count();
  }

  /**
   * Screenshot and debugging methods
   */
  async takeScreenshot(
    name: string,
    options: { fullPage?: boolean } = {}
  ): Promise<void> {
    const { fullPage = true } = options;
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    const filename = `screenshot-${name}-${timestamp}.png`;

    await this.page.screenshot({
      path: `test-results/screenshots/${filename}`,
      fullPage,
    });
  }

  async highlightElement(
    locator: Locator,
    color: string = "red"
  ): Promise<void> {
    await locator.evaluate((element, color) => {
      element.style.outline = `3px solid ${color}`;
      element.style.outlineOffset = "2px";
    }, color);
  }

  /**
   * Mobile and responsive methods
   */
  async setViewportSize(width: number, height: number): Promise<void> {
    await this.page.setViewportSize({ width, height });
  }

  async isMobileViewport(): Promise<boolean> {
    const viewport = this.page.viewportSize();
    return viewport ? viewport.width <= 768 : false;
  }

  async isTabletViewport(): Promise<boolean> {
    const viewport = this.page.viewportSize();
    return viewport ? viewport.width > 768 && viewport.width <= 1024 : false;
  }

  async isDesktopViewport(): Promise<boolean> {
    const viewport = this.page.viewportSize();
    return viewport ? viewport.width > 1024 : false;
  }

  /**
   * Mobile-specific assertions
   */
  async assertMobileNavigationVisible(): Promise<void> {
    await expectToBeVisible(this.navigationToggle);
  }

  /**
   * Performance monitoring
   */
  async measurePageLoadTime(): Promise<number> {
    const startTime = Date.now();
    await this.waitForPageLoad();
    const endTime = Date.now();
    const loadTime = endTime - startTime;
    return loadTime;
  }

  /**
   * Dialog handling
   */
  async handleDialog(
    action: "accept" | "dismiss",
    message?: string
  ): Promise<void> {
    return new Promise(resolve => {
      this.page.on("dialog", async dialog => {
        if (message && !dialog.message().includes(message)) {
          logger.warn(
            PAGE_OBJECT_MESSAGES.BASE_PAGE.UNEXPECTED_DIALOG(dialog.message())
          );
        }

        if (action === "accept") {
          await dialog.accept();
        } else {
          await dialog.dismiss();
        }

        resolve();
      });
    });
  }

  /**
   * Error handling and retry mechanisms
   */
  async retryAction<T>(
    action: () => Promise<T>,
    maxRetries: number = 3,
    delay: number = TIMEOUT
  ): Promise<T> {
    let lastError: Error;

    for (let i = 0; i < maxRetries; i++) {
      try {
        return await action();
      } catch (error) {
        lastError = error as Error;
        if (i < maxRetries - 1) {
          logger.warn(
            PAGE_OBJECT_MESSAGES.BASE_PAGE.ACTION_RETRY(i + 1, maxRetries)
          );
          await this.page.waitForTimeout(delay);
        }
      }
    }

    throw lastError!;
  }

  /**
   * Common form methods
   */
  async fillForm(formData: Record<string, string>): Promise<void> {
    for (const [field, value] of Object.entries(formData)) {
      const locator = this.page.locator(
        `[name="${field}"], [data-testid="${field}"], #${field}`
      );
      await locator.fill(value);
    }
  }

  async submitForm(
    submitSelector: string = 'button[type="submit"], input[type="submit"]'
  ): Promise<void> {
    const submitButton = this.page.locator(submitSelector);
    await submitButton.click();
  }

  /**
   * Abstract method that child classes must implement
   */
  abstract assertPageLoaded(): Promise<void>;
}
