import { TEST_DATA } from "@/data/constants";
import { Locator, Page } from "@playwright/test";
import {
  expectToBeGreaterThan,
  expectToBeTruthy,
  expectToBeVisible,
} from "@utils/expect";
import { BasePage } from "./BasePage";
/**
 * Page Object Model for the Home Page
 * Extends BasePage with home-specific functionality
 * Uses data-testid attributes for stable element identification
 */
export class HomePage extends BasePage {
  // Hero section
  readonly heroSubtitle: Locator;
  readonly heroDescription: Locator;

  // Main content sections
  readonly exploreSection: Locator;
  readonly aboutMeBtn: Locator;
  readonly cvBtn: Locator;
  readonly linksBtn: Locator;
  readonly blogBtn: Locator;

  constructor(page: Page) {
    super(page);

    // Hero section
    this.heroSubtitle = page.locator('[data-testid="hero-subtitle"]');
    this.heroDescription = page.locator('[data-testid="hero-description"]');

    // Main content sections
    this.exploreSection = page.locator(
      '[data-testid="home-navigation-section"]'
    );
    this.aboutMeBtn = page.locator('[data-testid="home-about-button"]');
    this.cvBtn = page.locator('[data-testid="home-cv-button"]');
    this.linksBtn = page.locator('[data-testid="home-links-button"]');
    this.blogBtn = page.locator('[data-testid="home-blog-button"]');
  }

  /**
   * Card interaction methods
   */
  async clickAboutMeCard(): Promise<void> {
    await this.safeClick(this.aboutMeBtn);
    await this.waitForPageLoad();
  }

  async clickBlogCard(): Promise<void> {
    await this.safeClick(this.blogBtn);
    await this.waitForPageLoad();
  }

  async clickCVCard(): Promise<void> {
    await this.safeClick(this.cvBtn);
    await this.waitForPageLoad();
  }

  async clickLinksCard(): Promise<void> {
    await this.safeClick(this.linksBtn);
    await this.waitForPageLoad();
  }

  /**
   * Assertion methods (implements BasePage abstract method)
   */
  async assertPageLoaded(): Promise<void> {
    await expectToBeVisible(this.navigation);
  }

  async assertHeroContent(): Promise<void> {
    await expectToBeVisible(this.heroDescription);
  }

  async assertExploreSectionVisible(): Promise<void> {
    await expectToBeVisible(this.exploreSection);
    await expectToBeVisible(this.aboutMeBtn);
    await expectToBeVisible(this.cvBtn);
    await expectToBeVisible(this.linksBtn);
    await expectToBeVisible(this.blogBtn);
  }

  /**
   * SEO-related methods
   */
  async getMetaDescription(): Promise<string | null> {
    return await this.metaDescription.getAttribute("content");
  }

  async getOpenGraphTitle(): Promise<string | null> {
    return await this.openGraphTitle.getAttribute("content");
  }

  async assertSEOElements(): Promise<void> {
    // Check meta description exists and has minimum length
    const metaDescription = await this.getMetaDescription();
    await expectToBeTruthy(metaDescription);
    if (metaDescription) {
      await expectToBeGreaterThan(
        metaDescription.length,
        TEST_DATA.SITE_INFO.DEFAULT_DESCRIPTION_MIN_LENGTH
      );
    }

    // Check Open Graph title if exists
    const ogTitle = await this.getOpenGraphTitle();
    if (ogTitle) {
      await expectToBeGreaterThan(
        ogTitle.length,
        TEST_DATA.SITE_INFO.OG_TITLE_MIN_LENGTH
      );
    }
  }

  /**
   * Comprehensive page validation
   */
  async validateFullPage(): Promise<void> {
    // Core page elements
    await this.assertPageLoaded();
    await this.assertNavigationVisible();
    await this.assertExploreSectionVisible();
    await this.assertFooterVisible();

    // SEO elements
    await this.assertHomePageTitle(TEST_DATA.SITE_INFO.SITE_TITLE);

    // Mobile-specific elements (if applicable)
    await this.assertMobileNavigationVisible();
  }
}
