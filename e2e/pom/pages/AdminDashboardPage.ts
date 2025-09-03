import { getProtectedPaths, PAGE_TITLES } from "@/data/constants";
import { Locator, Page } from "@playwright/test";
import { PageHelpers } from "@utils/core.utils";
import {
  expectToBeGreaterThan,
  expectToBeVisible,
  expectToContainText,
  expectToEqual,
  expectToHaveText,
} from "@utils/expect";
import { BasePage } from "./BasePage";

/**
 * Page Object Model for the Admin Dashboard Page
 * Uses data-testid attributes for stable element identification
 */
export class AdminDashboardPage extends BasePage {
  // Main page structure
  readonly pageWrapper: Locator;
  readonly headerWrapper: Locator;
  readonly headerContainer: Locator;
  readonly header: Locator;
  readonly container: Locator;

  // Header elements
  readonly title: Locator;
  readonly headerActions: Locator;

  // Action buttons in header
  readonly newPostButton: Locator;
  readonly usersButton: Locator;
  readonly securityButton: Locator;
  readonly backupButton: Locator;
  readonly logoutButton: Locator;

  // Statistics section
  readonly statsSection: Locator;
  readonly totalPostsCard: Locator;
  readonly publishedPostsCard: Locator;
  readonly draftPostsCard: Locator;
  readonly totalLikesCard: Locator;

  // Stat values and labels
  readonly totalPostsValue: Locator;
  readonly totalPostsLabel: Locator;
  readonly publishedPostsValue: Locator;
  readonly publishedPostsLabel: Locator;
  readonly draftPostsValue: Locator;
  readonly draftPostsLabel: Locator;
  readonly totalLikesValue: Locator;
  readonly totalLikesLabel: Locator;

  // Posts table section
  readonly postsTable: Locator;
  readonly postsTableHeader: Locator;
  readonly postsTableTitle: Locator;
  readonly postsTableContent: Locator;
  readonly postsLoading: Locator;

  // Table header columns
  readonly headerTitleColumn: Locator;
  readonly headerStatusColumn: Locator;
  readonly headerLikesColumn: Locator;
  readonly headerViewsColumn: Locator;
  readonly headerEditColumn: Locator;
  readonly headerActionsColumn: Locator;

  constructor(protected readonly page: Page) {
    super(page);

    // Main page structure
    this.pageWrapper = this.page.locator(
      '[data-testid="admin-dashboard-page"]'
    );
    this.headerWrapper = this.page.locator(
      '[data-testid="admin-dashboard-header-wrapper"]'
    );
    this.headerContainer = this.page.locator(
      '[data-testid="admin-dashboard-header-container"]'
    );
    this.header = this.page.locator('[data-testid="admin-dashboard-header"]');
    this.container = this.page.locator(
      '[data-testid="admin-dashboard-container"]'
    );

    // Header elements
    this.title = this.page.locator('[data-testid="admin-dashboard-title"]');
    this.headerActions = this.page.locator(
      '[data-testid="admin-dashboard-header-actions"]'
    );

    // Action buttons in header
    this.newPostButton = this.page.locator(
      '[data-testid="admin-dashboard-new-post-button"]'
    );
    this.usersButton = this.page.locator(
      '[data-testid="admin-dashboard-users-button"]'
    );
    this.securityButton = this.page.locator(
      '[data-testid="admin-dashboard-security-button"]'
    );
    this.backupButton = this.page.locator(
      '[data-testid="admin-dashboard-backup-button"]'
    );
    this.logoutButton = this.page.locator(
      '[data-testid="admin-dashboard-logout-button"]'
    );

    // Statistics section
    this.statsSection = this.page.locator(
      '[data-testid="admin-dashboard-stats"]'
    );
    this.totalPostsCard = this.page.locator(
      '[data-testid="admin-dashboard-stat-total-posts"]'
    );
    this.publishedPostsCard = this.page.locator(
      '[data-testid="admin-dashboard-stat-published-posts"]'
    );
    this.draftPostsCard = this.page.locator(
      '[data-testid="admin-dashboard-stat-draft-posts"]'
    );
    this.totalLikesCard = this.page.locator(
      '[data-testid="admin-dashboard-stat-total-likes"]'
    );

    // Stat values and labels
    this.totalPostsValue = this.page.locator(
      '[data-testid="admin-dashboard-stat-total-posts-value"]'
    );
    this.totalPostsLabel = this.page.locator(
      '[data-testid="admin-dashboard-stat-total-posts-label"]'
    );
    this.publishedPostsValue = this.page.locator(
      '[data-testid="admin-dashboard-stat-published-posts-value"]'
    );
    this.publishedPostsLabel = this.page.locator(
      '[data-testid="admin-dashboard-stat-published-posts-label"]'
    );
    this.draftPostsValue = this.page.locator(
      '[data-testid="admin-dashboard-stat-draft-posts-value"]'
    );
    this.draftPostsLabel = this.page.locator(
      '[data-testid="admin-dashboard-stat-draft-posts-label"]'
    );
    this.totalLikesValue = this.page.locator(
      '[data-testid="admin-dashboard-stat-total-likes-value"]'
    );
    this.totalLikesLabel = this.page.locator(
      '[data-testid="admin-dashboard-stat-total-likes-label"]'
    );

    // Posts table section
    this.postsTable = this.page.locator(
      '[data-testid="admin-dashboard-posts-table"]'
    );
    this.postsTableHeader = this.page.locator(
      '[data-testid="admin-dashboard-posts-table-header"]'
    );
    this.postsTableTitle = this.page.locator(
      '[data-testid="admin-dashboard-posts-table-title"]'
    );
    this.postsTableContent = this.page.locator(
      '[data-testid="admin-dashboard-posts-table-content"]'
    );
    this.postsLoading = this.page.locator(
      '[data-testid="admin-dashboard-posts-loading"]'
    );

    // Table header columns
    this.headerTitleColumn = this.page.locator(
      '[data-testid="admin-dashboard-posts-table-header-title"]'
    );
    this.headerStatusColumn = this.page.locator(
      '[data-testid="admin-dashboard-posts-table-header-status"]'
    );
    this.headerLikesColumn = this.page.locator(
      '[data-testid="admin-dashboard-posts-table-header-likes"]'
    );
    this.headerViewsColumn = this.page.locator(
      '[data-testid="admin-dashboard-posts-table-header-views"]'
    );
    this.headerEditColumn = this.page.locator(
      '[data-testid="admin-dashboard-posts-table-header-edit"]'
    );
    this.headerActionsColumn = this.page.locator(
      '[data-testid="admin-dashboard-posts-table-header-actions"]'
    );
  }

  /**
   * Post row elements (dynamic - use with post ID)
   */
  postRow(postId: string): Locator {
    return this.page.locator(
      `[data-testid="admin-dashboard-post-row-${postId}"]`
    );
  }

  postTitle(postId: string): Locator {
    return this.page.locator(
      `[data-testid="admin-dashboard-post-title-${postId}"]`
    );
  }

  postTitleText(postId: string): Locator {
    return this.page.locator(
      `[data-testid="admin-dashboard-post-title-text-${postId}"]`
    );
  }

  postMeta(postId: string): Locator {
    return this.page.locator(
      `[data-testid="admin-dashboard-post-meta-${postId}"]`
    );
  }

  postStatus(postId: string): Locator {
    return this.page.locator(
      `[data-testid="admin-dashboard-post-status-${postId}"]`
    );
  }

  postLikes(postId: string): Locator {
    return this.page.locator(
      `[data-testid="admin-dashboard-post-likes-${postId}"]`
    );
  }

  postViews(postId: string): Locator {
    return this.page.locator(
      `[data-testid="admin-dashboard-post-views-${postId}"]`
    );
  }

  /**
   * Post action buttons (dynamic - use with post ID)
   */
  editPostButton(postId: string): Locator {
    return this.page.locator(
      `[data-testid="admin-dashboard-post-edit-${postId}"]`
    );
  }

  viewPostButton(postId: string): Locator {
    return this.page.locator(
      `[data-testid="admin-dashboard-post-view-${postId}"]`
    );
  }

  pinPostButton(postId: string): Locator {
    return this.page.locator(
      `[data-testid="admin-dashboard-post-pin-${postId}"]`
    );
  }

  unpinPostButton(postId: string): Locator {
    return this.page.locator(
      `[data-testid="admin-dashboard-post-unpin-${postId}"]`
    );
  }

  deletePostButton(postId: string): Locator {
    return this.page.locator(
      `[data-testid="admin-dashboard-post-delete-${postId}"]`
    );
  }

  /**
   * Generic post row selectors
   */
  allPostRows(): Locator {
    return this.page.locator('[data-testid*="admin-dashboard-post-row-"]');
  }

  allEditButtons(): Locator {
    return this.page.locator('[data-testid*="admin-dashboard-post-edit-"]');
  }

  allDeleteButtons(): Locator {
    return this.page.locator('[data-testid*="admin-dashboard-post-delete-"]');
  }

  allViewButtons(): Locator {
    return this.page.locator('[data-testid*="admin-dashboard-post-view-"]');
  }

  allPinButtons(): Locator {
    return this.page.locator('[data-testid*="admin-dashboard-post-pin-"]');
  }

  /**
   * Navigation methods
   */
  async goto(): Promise<void> {
    const protectedPaths = getProtectedPaths();
    await this.page.goto(protectedPaths.PROTECTED_DASHBOARD);
    await PageHelpers.waitForPageLoad(this.page);
  }

  async goToNewPost(): Promise<void> {
    await this.newPostButton.click();
    await PageHelpers.waitForPageLoad(this.page);
  }

  async goToUsers(): Promise<void> {
    await this.usersButton.click();
    await PageHelpers.waitForPageLoad(this.page);
  }

  async goToSecurity(): Promise<void> {
    await this.securityButton.click();
    await PageHelpers.waitForPageLoad(this.page);
  }

  async goToBackup(): Promise<void> {
    await this.backupButton.click();
    await PageHelpers.waitForPageLoad(this.page);
  }

  async logout(): Promise<void> {
    await PageHelpers.handleDialog(this.page, "accept"); // Handle logout confirmation
    await this.logoutButton.click();
    await PageHelpers.waitForPageLoad(this.page);
  }

  /**
   * Post management methods
   */
  async editPost(postId: string): Promise<void> {
    await this.editPostButton(postId).click();
    await PageHelpers.waitForPageLoad(this.page);
  }

  async viewPost(postId: string): Promise<void> {
    await this.viewPostButton(postId).click();
    await PageHelpers.waitForPageLoad(this.page);
  }

  async pinPost(postId: string): Promise<void> {
    await this.pinPostButton(postId).click();
    // Wait for the action to complete
    await this.page.waitForTimeout(1000);
  }

  async unpinPost(postId: string): Promise<void> {
    await this.unpinPostButton(postId).click();
    // Wait for the action to complete
    await this.page.waitForTimeout(1000);
  }

  async deletePost(postId: string): Promise<void> {
    // Handle the delete confirmation dialog
    await PageHelpers.handleDialog(this.page, "accept", "delete");
    await this.deletePostButton(postId).click();

    // Wait for the deletion to complete
    await this.page.waitForTimeout(2000);
  }

  /**
   * Data retrieval methods
   */
  async getStatistics(): Promise<{
    totalPosts: number;
    publishedPosts: number;
    draftPosts: number;
    totalLikes: number;
  }> {
    const totalPosts = parseInt(
      (await this.totalPostsValue.textContent()) ?? "0"
    );
    const publishedPosts = parseInt(
      (await this.publishedPostsValue.textContent()) ?? "0"
    );
    const draftPosts = parseInt(
      (await this.draftPostsValue.textContent()) ?? "0"
    );
    const totalLikes = parseInt(
      (await this.totalLikesValue.textContent()) ?? "0"
    );

    return {
      totalPosts,
      publishedPosts,
      draftPosts,
      totalLikes,
    };
  }

  async getPostCount(): Promise<number> {
    return await this.allPostRows().count();
  }

  async getPostTitles(): Promise<string[]> {
    const titleElements = this.page.locator(
      '[data-testid*="admin-dashboard-post-title-text-"]'
    );
    return await titleElements.allTextContents();
  }

  async getPostStatuses(): Promise<string[]> {
    const statusElements = this.page.locator(
      '[data-testid*="admin-dashboard-post-status-"]'
    );
    return await statusElements.allTextContents();
  }

  async getFirstPostId(): Promise<string | null> {
    const firstRow = this.allPostRows().first();
    if ((await firstRow.count()) === 0) return null;

    const testId = await firstRow.getAttribute("data-testid");
    if (!testId) return null;

    // Extract post ID from data-testid like "admin-dashboard-post-row-{id}"
    const match = testId.match(/admin-dashboard-post-row-(.+)/);
    return match ? match[1] : null;
  }

  /**
   * Assertion methods
   */
  async assertLoaded(): Promise<void> {
    await expectToBeVisible(this.pageWrapper);
    await expectToBeVisible(this.title);
    await expectToBeVisible(this.headerActions);
    // Verify the logout button is present
    await expectToBeVisible(this.logoutButton);
  }

  async assertTitle(): Promise<void> {
    await expectToContainText(this.title, PAGE_TITLES.ADMIN.DASHBOARD);
  }

  async assertHeaderButtons(): Promise<void> {
    await expectToBeVisible(this.newPostButton);
    await expectToBeVisible(this.usersButton);
    await expectToBeVisible(this.securityButton);
    await expectToBeVisible(this.backupButton);
    await expectToBeVisible(this.logoutButton);
  }

  async assertStatisticsSection(): Promise<void> {
    await expectToBeVisible(this.statsSection);
    await expectToBeVisible(this.totalPostsCard);
    await expectToBeVisible(this.publishedPostsCard);
    await expectToBeVisible(this.draftPostsCard);
    await expectToBeVisible(this.totalLikesCard);

    // Assert that each stat has a value and label
    await expectToBeVisible(this.totalPostsValue);
    await expectToBeVisible(this.totalPostsLabel);
    await expectToBeVisible(this.publishedPostsValue);
    await expectToBeVisible(this.publishedPostsLabel);
    await expectToBeVisible(this.draftPostsValue);
    await expectToBeVisible(this.draftPostsLabel);
    await expectToBeVisible(this.totalLikesValue);
    await expectToBeVisible(this.totalLikesLabel);
  }

  async assertPostsTable(): Promise<void> {
    await expectToBeVisible(this.postsTable);
    await expectToBeVisible(this.postsTableHeader);
    await expectToBeVisible(this.postsTableTitle);
  }

  async assertTableHeaders(): Promise<void> {
    await expectToBeVisible(this.headerTitleColumn);
    await expectToBeVisible(this.headerStatusColumn);
    await expectToBeVisible(this.headerLikesColumn);
    await expectToBeVisible(this.headerViewsColumn);
    await expectToBeVisible(this.headerEditColumn);
    await expectToBeVisible(this.headerActionsColumn);
  }

  async assertHasPosts(): Promise<void> {
    const postCount = await this.getPostCount();
    await expectToBeGreaterThan(postCount, 0);

    // Assert first post has required elements
    const firstPostId = await this.getFirstPostId();
    if (firstPostId) {
      await expectToBeVisible(this.postTitle(firstPostId));
      await expectToBeVisible(this.postStatus(firstPostId));
    }
  }

  async assertNoPosts(): Promise<void> {
    const postCount = await this.getPostCount();
    await expectToEqual(postCount, 0);
  }

  async assertPostExists(postId: string): Promise<void> {
    await expectToBeVisible(this.postRow(postId));
    await expectToBeVisible(this.postTitle(postId));
    await expectToBeVisible(this.postStatus(postId));
  }

  async assertPostNotExists(postId: string): Promise<void> {
    const postRowCount = await this.postRow(postId).count();
    await expectToEqual(postRowCount, 0);
  }

  async assertPostStatus(
    postId: string,
    expectedStatus: "Published" | "Draft"
  ): Promise<void> {
    await expectToHaveText(this.postStatus(postId), expectedStatus);
  }

  async assertStatValues(
    expectedStats: Partial<{
      totalPosts: number;
      publishedPosts: number;
      draftPosts: number;
      totalLikes: number;
    }>
  ): Promise<void> {
    const actualStats = await this.getStatistics();

    if (expectedStats.totalPosts !== undefined) {
      await expectToEqual(actualStats.totalPosts, expectedStats.totalPosts);
    }
    if (expectedStats.publishedPosts !== undefined) {
      await expectToEqual(
        actualStats.publishedPosts,
        expectedStats.publishedPosts
      );
    }
    if (expectedStats.draftPosts !== undefined) {
      await expectToEqual(actualStats.draftPosts, expectedStats.draftPosts);
    }
    if (expectedStats.totalLikes !== undefined) {
      await expectToEqual(actualStats.totalLikes, expectedStats.totalLikes);
    }
  }

  async assertLoadingState(): Promise<void> {
    await expectToBeVisible(this.postsLoading);
  }

  /**
   * Mobile-specific methods
   */
  async assertMobileLayout(): Promise<void> {
    const viewport = this.page.viewportSize();
    if (viewport && viewport.width <= 768) {
      // Mobile-specific assertions
      await expectToBeVisible(this.headerContainer);
      await expectToBeVisible(this.statsSection);
    }
  }

  /**
   * Implementation of abstract method from BasePage
   */
  async assertPageLoaded(): Promise<void> {
    await this.assertLoaded();
    await this.assertTitle();
  }

  /**
   * Comprehensive page validation
   */
  async validateFullPage(): Promise<void> {
    // Core page elements
    await this.assertLoaded();
    await this.assertTitle();
    await this.assertHeaderButtons();
    await this.assertStatisticsSection();
    await this.assertPostsTable();
    await this.assertTableHeaders();

    // Check if posts exist
    const postCount = await this.getPostCount();
    if (postCount > 0) {
      await this.assertHasPosts();
    } else {
      await this.assertNoPosts();
    }

    // Mobile-specific validation
    await this.assertMobileLayout();
  }
}
