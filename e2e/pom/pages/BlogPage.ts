import { PATHS } from "@/data/constants";
import { Locator, Page } from "@playwright/test";
import { PageHelpers } from "@utils/core.utils";
import {
  expectToBeGreaterThan,
  expectToBeVisible,
  expectToContainText,
  expectToEqual,
} from "@utils/expect";
import { BasePage } from "./BasePage";

/**
 * Page Object Model for the Blog Page
 * Uses data-testid attributes for stable element identification
 */
export class BlogPage extends BasePage {
  protected readonly page: Page;

  // Page container and main sections
  readonly pageContainer: Locator;
  readonly heroTitle: Locator;
  readonly heroDescription: Locator;

  // Search functionality
  readonly searchSection: Locator;
  readonly searchContainer: Locator;
  readonly searchInput: Locator;
  readonly searchButton: Locator;
  readonly clearSearchButton: Locator;

  // Search results and info
  readonly searchResultsHeader: Locator;
  readonly searchResultsTitle: Locator;
  readonly postsInfo: Locator;

  // Blog posts grid and cards
  readonly blogGrid: Locator;
  readonly loadingGrid: Locator;
  readonly blogCards: Locator;

  // Individual blog card elements
  readonly blogCardTitles: Locator;
  readonly blogCardTitleLinks: Locator;
  readonly blogCardExcerpts: Locator;
  readonly blogCardDates: Locator;
  readonly blogCardImages: Locator;
  readonly blogCardTags: Locator;
  readonly readMoreLinks: Locator;
  readonly likeButtons: Locator;

  // Pagination
  readonly paginationWrapper: Locator;
  readonly paginationInfo: Locator;
  readonly paginationPrev: Locator;
  readonly paginationNext: Locator;
  readonly paginationPages: Locator;

  // Empty states
  readonly emptyState: Locator;
  readonly noPostsTitle: Locator;
  readonly noPostsDescription: Locator;
  readonly noSearchResultsTitle: Locator;
  readonly noSearchResultsDescription: Locator;

  constructor(page: Page) {
    super(page);

    this.page = page;

    // Page container and main sections
    this.pageContainer = page.locator('[data-testid="blog-page-container"]');
    this.heroTitle = page.locator('[data-testid="blog-hero-title"]');
    this.heroDescription = page.locator(
      '[data-testid="blog-hero-description"]'
    );

    // Search functionality
    this.searchSection = page.locator('[data-testid="blog-search-section"]');
    this.searchContainer = page.locator(
      '[data-testid="blog-search-container"]'
    );
    this.searchInput = page.locator('[data-testid="blog-search-input"]');
    this.searchButton = page.locator('[data-testid="blog-search-button"]');
    this.clearSearchButton = page.locator('[data-testid="blog-clear-search"]');

    // Search results and info
    this.searchResultsHeader = page.locator(
      '[data-testid="blog-search-results-header"]'
    );
    this.searchResultsTitle = page.locator(
      '[data-testid="blog-search-results-title"]'
    );
    this.postsInfo = page.locator('[data-testid="blog-posts-info"]');

    // Blog posts grid and cards
    this.blogGrid = page.locator('[data-testid="blog-posts-grid"]');
    this.loadingGrid = page.locator('[data-testid="blog-loading-grid"]');
    this.blogCards = page.locator('[data-testid*="blog-card"]');

    // Individual blog card elements
    this.blogCardTitles = page.locator('[data-testid="blog-card-title"]');
    this.blogCardTitleLinks = page.locator(
      '[data-testid="blog-card-title-link"]'
    );
    this.blogCardExcerpts = page.locator('[data-testid*="blog-card-excerpt"]');
    this.blogCardDates = page.locator('[data-testid*="blog-card-date"]');
    this.blogCardImages = page.locator('[data-testid*="blog-card-image"]');
    this.blogCardTags = page.locator('[data-testid*="blog-card-tags"]');
    this.readMoreLinks = page.locator('[data-testid*="blog-card-read-more"]');
    this.likeButtons = page.locator('[data-testid*="blog-card-like"]');

    // Pagination
    this.paginationWrapper = page.locator(
      '[data-testid="blog-pagination-wrapper"]'
    );
    this.paginationInfo = page.locator('[data-testid="blog-pagination-info"]');
    this.paginationPrev = page.locator('[data-testid="blog-pagination-prev"]');
    this.paginationNext = page.locator('[data-testid="blog-pagination-next"]');
    this.paginationPages = page.locator(
      '[data-testid*="blog-pagination-page"]'
    );

    // Empty states
    this.emptyState = page.locator('[data-testid="blog-empty-state"]');
    this.noPostsTitle = page.locator('[data-testid="blog-no-posts-title"]');
    this.noPostsDescription = page.locator(
      '[data-testid="blog-no-posts-description"]'
    );
    this.noSearchResultsTitle = page.locator(
      '[data-testid="blog-no-search-results-title"]'
    );
    this.noSearchResultsDescription = page.locator(
      '[data-testid="blog-no-search-results-description"]'
    );
  }

  /**
   * Navigation methods
   */
  async goto(): Promise<void> {
    await this.page.goto(PATHS.BLOG);
    await PageHelpers.waitForPageLoad(this.page);
  }

  /**
   * Search methods
   */
  async search(term: string): Promise<void> {
    await PageHelpers.safeFill(this.searchInput, term);
    await PageHelpers.safeClick(this.searchButton);
    await PageHelpers.waitForPageLoad(this.page);
  }

  async searchByEnter(term: string): Promise<void> {
    await PageHelpers.safeFill(this.searchInput, term);
    await this.page.keyboard.press("Enter");
    await PageHelpers.waitForPageLoad(this.page);
  }

  async clearSearch(): Promise<void> {
    if (await this.clearSearchButton.isVisible()) {
      await PageHelpers.safeClick(this.clearSearchButton);
      await PageHelpers.waitForPageLoad(this.page);
    }
  }

  async getSearchInputValue(): Promise<string> {
    return await this.searchInput.inputValue();
  }

  /**
   * Blog card interaction methods
   */
  async clickFirstBlogCard(): Promise<void> {
    const firstCard = this.blogCards.first();
    await PageHelpers.safeClick(firstCard);
    await PageHelpers.waitForPageLoad(this.page);
  }

  async clickBlogCardByTitle(title: string): Promise<void> {
    const card = this.blogCards.filter({ hasText: title }).first();
    await PageHelpers.safeClick(card);
    await PageHelpers.waitForPageLoad(this.page);
  }

  async clickReadMore(index: number = 0): Promise<void> {
    const readMoreButton = this.readMoreLinks.nth(index);
    await PageHelpers.safeClick(readMoreButton);
    await PageHelpers.waitForPageLoad(this.page);
  }

  async likeBlogPost(index: number = 0): Promise<void> {
    const likeButton = this.likeButtons.nth(index);
    await PageHelpers.safeClick(likeButton);
  }

  /**
   * Pagination methods
   */
  async goToNextPage(): Promise<void> {
    if (await this.paginationNext.isEnabled()) {
      await PageHelpers.safeClick(this.paginationNext);
      await PageHelpers.waitForPageLoad(this.page);
    }
  }

  async goToPreviousPage(): Promise<void> {
    if (await this.paginationPrev.isEnabled()) {
      await PageHelpers.safeClick(this.paginationPrev);
      await PageHelpers.waitForPageLoad(this.page);
    }
  }

  async goToPage(pageNumber: number): Promise<void> {
    const pageButton = this.page.locator(
      `[data-testid="blog-pagination-page-${pageNumber}"]`
    );
    if (await pageButton.isVisible()) {
      await PageHelpers.safeClick(pageButton);
      await PageHelpers.waitForPageLoad(this.page);
    }
  }

  /**
   * Data retrieval methods
   */
  async getBlogCardCount(): Promise<number> {
    return await this.blogCards.count();
  }

  async getBlogCardTitles(): Promise<string[]> {
    const titles = await this.blogCardTitles.allTextContents();
    return titles.filter((title: string) => title.trim().length > 0);
  }

  async getBlogCardExcerpts(): Promise<string[]> {
    const excerpts = await this.blogCardExcerpts.allTextContents();
    return excerpts.filter((excerpt: string) => excerpt.trim().length > 0);
  }

  async getPaginationInfo(): Promise<string> {
    return (await this.paginationInfo.textContent()) ?? "";
  }

  /**
   * Assertion methods
   */
  async assertLoaded(): Promise<void> {
    await expectToBeVisible(this.pageContainer);
    await expectToBeVisible(this.heroTitle);
  }

  /**
   * Implementation of abstract method from BasePage
   */
  async assertPageLoaded(): Promise<void> {
    await this.assertLoaded();
    await this.assertHeroContent();
  }

  async assertHeroContent(): Promise<void> {
    await expectToBeVisible(this.heroTitle);
    await expectToBeVisible(this.heroDescription);
    await expectToContainText(this.heroTitle, "Blog");
  }

  async assertSearchFunctionality(): Promise<void> {
    await expectToBeVisible(this.searchContainer);
    await expectToBeVisible(this.searchInput);
    await expectToBeVisible(this.searchButton);
  }

  async assertHasPosts(): Promise<void> {
    await expectToBeVisible(this.blogGrid);
    const postCount = await this.getBlogCardCount();
    await expectToBeGreaterThan(postCount, 0);
  }

  async assertNoPosts(): Promise<void> {
    await expectToBeVisible(this.emptyState);
    await expectToBeVisible(this.noPostsTitle);
  }

  async assertSearchResults(query: string): Promise<void> {
    await expectToBeVisible(this.searchResultsHeader);
    await expectToContainText(this.searchResultsTitle, query);
  }

  async assertNoSearchResults(query: string): Promise<void> {
    await expectToBeVisible(this.emptyState);
    await expectToBeVisible(this.noSearchResultsTitle);
    await expectToContainText(this.noSearchResultsTitle, query);
  }

  async assertPaginationVisible(): Promise<void> {
    await expectToBeVisible(this.paginationWrapper);
    await expectToBeVisible(this.paginationInfo);
  }

  async assertPaginationHidden(): Promise<void> {
    const paginationCount = await this.paginationWrapper.count();
    await expectToEqual(paginationCount, 0);
  }

  async assertBlogCardStructure(index: number = 0): Promise<void> {
    const card = this.blogCards.nth(index);
    await expectToBeVisible(card);

    // Check for essential elements within the card using class locators
    const cardTitleHeading = this.blogCardTitles.nth(index);
    const cardTitleLink = this.blogCardTitleLinks.nth(index);
    const cardExcerpt = this.blogCardExcerpts.nth(index);
    const cardDate = this.blogCardDates.nth(index);

    // Check for title elements (either heading or link should be present)
    if ((await cardTitleHeading.count()) > 0) {
      await expectToBeVisible(cardTitleHeading);
    }
    if ((await cardTitleLink.count()) > 0) {
      await expectToBeVisible(cardTitleLink);
    }
    if ((await cardExcerpt.count()) > 0) {
      await expectToBeVisible(cardExcerpt);
    }
    if ((await cardDate.count()) > 0) {
      await expectToBeVisible(cardDate);
    }
  }

  async assertSearchInputValue(expectedValue: string): Promise<void> {
    const actualValue = await this.getSearchInputValue();
    await expectToEqual(actualValue, expectedValue);
  }

  async assertLoadingState(): Promise<void> {
    await expectToBeVisible(this.loadingGrid);
  }

  /**
   * Mobile-specific methods
   */
  async assertMobileLayout(): Promise<void> {
    const viewport = this.page.viewportSize();
    if (viewport && viewport.width <= 768) {
      // Mobile-specific assertions
      await expectToBeVisible(this.searchContainer);
      await expectToBeVisible(this.blogGrid);
    }
  }

  /**
   * Comprehensive page validation
   */
  async validateFullPage(): Promise<void> {
    // Core page elements
    await this.assertLoaded();
    await this.assertHeroContent();
    await this.assertSearchFunctionality();

    // Check if posts exist and validate structure
    const postCount = await this.getBlogCardCount();
    if (postCount > 0) {
      await this.assertHasPosts();
      await this.assertBlogCardStructure(0);

      // Check pagination if multiple posts
      if (postCount > 6) {
        // Assuming 6 posts per page
        await this.assertPaginationVisible();
      }
    } else {
      await this.assertNoPosts();
    }

    // Mobile-specific validation
    await this.assertMobileLayout();
  }

  /**
   * Performance testing methods
   */
  async measureSearchPerformance(query: string): Promise<number> {
    const startTime = Date.now();
    await this.search(query);
    const endTime = Date.now();
    const searchTime = endTime - startTime;
    return searchTime;
  }

  async measurePageLoadPerformance(): Promise<number> {
    const startTime = Date.now();
    await this.goto();
    const endTime = Date.now();
    const loadTime = endTime - startTime;
    return loadTime;
  }
}
