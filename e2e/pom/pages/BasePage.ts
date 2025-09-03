import { PATHS, TIMEOUTS } from "@/data/constants";
import { PAGE_OBJECT_MESSAGES } from "@/data/logger-messages";
import {
  expectPageToHaveTitle,
  expectToBeTruthy,
  expectToBeVisible,
} from "@/utils/expect";
import { expect, Locator, Page } from "@playwright/test";
import { logger } from "@utils/core.utils";

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

  // Footer elements
  readonly footer: Locator;
  readonly footerText: Locator;
  readonly emailLink: Locator;
  readonly linkedinLink: Locator;

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
    this.footer = page.locator('[data-testid="footer"]');
    this.footerText = page.locator('[data-testid="footer-text"]');
    this.emailLink = page.locator('[data-testid="footer-email"]');
    this.linkedinLink = page.locator('[data-testid="footer-linkedin"]');

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
  async waitForPageLoad(timeout: number = TIMEOUTS.PAGE_LOAD): Promise<void> {
    await Promise.all([
      this.page.waitForLoadState("networkidle", { timeout }),
      this.page.waitForFunction(() => document.readyState === "complete", {
        timeout,
      }),
    ]);
  }

  async waitForElement(
    selector: string,
    timeout: number = TIMEOUTS.ELEMENT_VISIBLE
  ): Promise<Locator> {
    const element = this.page.locator(selector);
    await element.waitFor({ state: "visible", timeout });
    return element;
  }

  async waitForUrl(
    urlPattern: string | RegExp,
    timeout: number = TIMEOUTS.NAVIGATION
  ): Promise<void> {
    await this.page.waitForURL(urlPattern, { timeout });
  }

  /**
   * Common interaction methods
   */
  async safeClick(
    locator: Locator,
    options: {
      timeout?: number;
      retries?: number;
      waitForVisible?: boolean;
      scrollIntoView?: boolean;
    } = {}
  ): Promise<void> {
    const {
      timeout = TIMEOUTS.CLICK,
      retries = 3,
      waitForVisible = true,
      scrollIntoView = true,
    } = options;

    for (let i = 0; i < retries; i++) {
      try {
        if (waitForVisible) {
          await locator.waitFor({ state: "visible", timeout });
        }

        if (scrollIntoView) {
          await locator.scrollIntoViewIfNeeded();
        }

        await locator.click({ timeout });
        return;
      } catch (error) {
        if (i === retries - 1) throw error;
        await this.page.waitForTimeout(TIMEOUTS.POLLING_INTERVAL);
        logger.warn(PAGE_OBJECT_MESSAGES.BASE_PAGE.CLICK_RETRY(i + 1));
      }
    }
  }

  async safeFill(
    locator: Locator,
    text: string,
    options: {
      timeout?: number;
      clear?: boolean;
      validate?: boolean;
    } = {}
  ): Promise<void> {
    const { timeout = TIMEOUTS.FILL, clear = true, validate = true } = options;

    await locator.waitFor({ state: "visible", timeout });

    if (clear) {
      await locator.clear();
    }

    await locator.fill(text);

    if (validate) {
      await expect(locator).toHaveValue(text);
    }
  }

  async safeType(
    locator: Locator,
    text: string,
    options: {
      delay?: number;
      timeout?: number;
    } = {}
  ): Promise<void> {
    const { delay = 100, timeout = TIMEOUTS.TYPE } = options;

    await locator.waitFor({ state: "visible", timeout });
    await locator.type(text, { delay });
  }

  async safeSelectOption(
    locator: Locator,
    option: string | string[],
    timeout: number = TIMEOUTS.SELECT
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
    await this.safeClick(this.aboutLink);
    await this.waitForPageLoad();
  }

  async goToBlog(): Promise<void> {
    await this.safeClick(this.blogLink);
    await this.waitForPageLoad();
  }

  async goToCV(): Promise<void> {
    await this.safeClick(this.cvLink);
    await this.waitForPageLoad();
  }

  async goToLinks(): Promise<void> {
    await this.safeClick(this.linksLink);
    await this.waitForPageLoad();
  }

  /**
   * Language switching methods
   */
  async switchToEnglish(): Promise<void> {
    if (await this.isElementVisible(this.englishLink)) {
      await this.safeClick(this.englishLink);
      await this.waitForPageLoad();
    }
  }

  async switchToGerman(): Promise<void> {
    if (await this.isElementVisible(this.germanLink)) {
      await this.safeClick(this.germanLink);
      await this.waitForPageLoad();
    }
  }

  /**
   * Mobile navigation methods
   */
  async openMobileMenu(): Promise<void> {
    if (await this.isElementVisible(this.navigationToggle)) {
      await this.safeClick(this.navigationToggle);
    }
  }

  async closeMobileMenu(): Promise<void> {
    if (await this.isElementVisible(this.navigationToggle)) {
      await this.safeClick(this.navigationToggle);
    }
  }

  /**
   * Footer interaction methods
   */
  async clickEmailLink(): Promise<void> {
    await this.safeClick(this.emailLink);
  }

  async clickLinkedInLink(): Promise<void> {
    await this.safeClick(this.linkedinLink);
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

  async assertFooterVisible(): Promise<void> {
    await expectToBeVisible(this.footer);
    await expectToBeVisible(this.footerText);
  }

  async assertLanguageSwitcherVisible(): Promise<void> {
    if (await this.isElementVisible(this.languageSwitcher)) {
      await expectToBeVisible(this.languageSwitcher);
    }
  }

  async assertHomePageTitle(expectedTitle?: string): Promise<void> {
    if (expectedTitle) {
      await expectPageToHaveTitle(this.page, expectedTitle);
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
    timeout: number = TIMEOUTS.SHORT
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
    delay: number = TIMEOUTS.POLLING_INTERVAL
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
      await this.safeFill(locator, value);
    }
  }

  async submitForm(
    submitSelector: string = 'button[type="submit"], input[type="submit"]'
  ): Promise<void> {
    const submitButton = this.page.locator(submitSelector);
    await this.safeClick(submitButton);
  }

  /**
   * Abstract method that child classes must implement
   */
  abstract assertPageLoaded(): Promise<void>;
}
