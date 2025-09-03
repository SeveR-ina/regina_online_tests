/**
 * Example Test Suite
 * Demonstrates the enhanced fixture architecture with Page Object Model integration
 * Shows different testing scenarios: guest, authenticated, and API-only tests
 */

import { PATHS, getProtectedPaths } from "@/data/constants";
import TEST_MESSAGES from "@/data/logger-messages";
import MESSAGES from "@/data/messages";
import { apiTest, guestTest, test } from "@fixtures/test-fixtures";
import { ApiClient } from "@utils/api.utils";
import { logger } from "@utils/core.utils";
import {
  expectNotToBeNull,
  expectResponseStatusToBeOneOf,
  expectToBeGreaterThanOrEqual,
  expectToBeInstanceOf,
  expectToBeTruthy,
} from "@utils/expect";

test.describe("🔧 Fixture Architecture Examples", () => {
  test.describe("👤 Guest (Unauthenticated) Tests", () => {
    guestTest("should load home page for guest users", async ({ homePage }) => {
      // Navigate to home page
      await homePage.gotoHome();

      // Verify page loaded correctly
      await homePage.assertPageLoaded();
      await homePage.assertNavigationVisible();
    });

    guestTest("should allow guest users to view blog", async ({ blogPage }) => {
      // Navigate to blog page
      await blogPage.goto();
      await blogPage.assertLoaded();
      await blogPage.assertHeroContent();

      // Check if posts are available
      const postCount = await blogPage.getBlogCardCount();
      if (postCount > 0) {
        await blogPage.assertHasPosts();
      } else {
        await blogPage.assertNoPosts();
      }
    });

    guestTest(
      "should show login page to guests trying to access admin",
      async ({ adminLoginPage }) => {
        // Try to access admin dashboard as guest - should redirect to login
        const protectedPaths = getProtectedPaths();
        await adminLoginPage.goto(protectedPaths.PROTECTED_DASHBOARD);

        // Should be redirected to login page or show login form
        await adminLoginPage.assertPageLoaded();

        // Verify login form is visible
        const isLoginFormVisible = await adminLoginPage.isLoginFormVisible();
        await expectToBeTruthy(isLoginFormVisible, {
          message: MESSAGES.UI.LOGIN_FORM_VISIBLE,
        });
      }
    );
  });

  test.describe("🔐 Authenticated Admin Tests", () => {
    test("should access admin dashboard when authenticated", async ({
      adminDashboardPage,
    }) => {
      // Navigate to admin dashboard (should work with pre-auth)
      await adminDashboardPage.goto();

      // Verify dashboard loaded
      await adminDashboardPage.assertLoaded();
      await adminDashboardPage.assertTitle();
      await adminDashboardPage.assertHeaderButtons();
      await adminDashboardPage.assertStatisticsSection();

      // Check statistics
      const stats = await adminDashboardPage.getStatistics();

      await expectToBeGreaterThanOrEqual(stats.totalPosts, 0, {
        message: MESSAGES.UI.TOTAL_POSTS_NON_NEGATIVE,
      });
      await expectToBeGreaterThanOrEqual(stats.publishedPosts, 0, {
        message: MESSAGES.UI.PUBLISHED_POSTS_NON_NEGATIVE,
      });
      await expectToBeGreaterThanOrEqual(stats.draftPosts, 0, {
        message: MESSAGES.UI.DRAFT_POSTS_NON_NEGATIVE,
      });
    });

    test("should create and edit blog post", async ({
      blogEditorPage,
      adminDashboardPage,
    }) => {
      // First, go to dashboard
      await adminDashboardPage.goto();
      await adminDashboardPage.assertLoaded();

      // Navigate to new post creation
      await adminDashboardPage.goToNewPost();

      // Create a test blog post
      const testTitle = `E2E Test Post ${Date.now()}`;
      const testContent =
        "This is a test blog post created by automated testing.";

      await blogEditorPage.create(testTitle, testContent);

      // Verify we can see the post (implementation depends on your app flow)
    });

    test("should handle admin navigation flows", async ({
      adminDashboardPage,
      homePage,
    }) => {
      // Start from dashboard
      await adminDashboardPage.goto();
      await adminDashboardPage.assertLoaded();

      // Test navigation to different admin sections

      await adminDashboardPage.goToUsers();

      // Navigate back to public site
      await homePage.gotoHome();
      await homePage.assertPageLoaded();
    });
  });

  test.describe("🌐 API-Only Tests", () => {
    apiTest(
      "should authenticate and access API endpoints",
      async ({ apiClient }) => {
        // Test health endpoint
        const isHealthy = await apiClient.checkHealth();
        await expectToBeTruthy(isHealthy, {
          message: MESSAGES.API.HEALTH_CHECK_TRUTHY,
        });

        // Test blog posts endpoint
        const postsResult = await apiClient.getBlogPosts({ limit: 5 });
        await expectNotToBeNull(postsResult, {
          message: MESSAGES.API.SHOULD_RETURN_OBJECT,
        });

        if (postsResult) {
          await expectToBeInstanceOf(postsResult.posts, Array, {
            message: MESSAGES.API.POSTS_AS_ARRAY,
          });

          // Validate first post structure if any posts exist
          if (postsResult.posts.length > 0) {
            ApiClient.validateBlogPostStructure(postsResult.posts[0]);
          }
        }
      }
    );

    apiTest("should handle API error cases", async ({ api }) => {
      // Test non-existent endpoint
      const response = await api.get("/non-existent-endpoint");
      await expectResponseStatusToBeOneOf(response, [404, 405], {
        message: MESSAGES.API.NON_EXISTENT_ENDPOINT,
      });

      // Test invalid blog post ID
      const invalidPostResponse = await api.get(
        `${PATHS.BLOG}/invalid-id-12345`
      );
      await expectResponseStatusToBeOneOf(invalidPostResponse, [404, 400], {
        message: MESSAGES.API.INVALID_BLOG_POST_ID,
      });
    });
  });

  test.describe("🔄 Mixed Scenarios", () => {
    test("should work with multiple page objects", async ({
      homePage,
      blogPage,
      adminDashboardPage,
      apiClient,
    }) => {
      // Start with API call to get blog post count
      const apiPosts = await apiClient.getBlogPosts({ limit: 1 });
      const hasApiPosts = apiPosts && apiPosts.total > 0;

      // Navigate through public pages
      await homePage.gotoHome();
      await homePage.assertPageLoaded();

      // Go to blog from home page
      await homePage.goToBlog();
      await blogPage.assertLoaded();

      // Check if UI matches API data
      const uiPostCount = await blogPage.getBlogCardCount();

      if (hasApiPosts && uiPostCount === 0) {
        logger.warn(TEST_MESSAGES.WARNING.API_UI_MISMATCH);
      }

      // Access admin dashboard (pre-authenticated)
      await adminDashboardPage.goto();
      await adminDashboardPage.assertLoaded();
    });
  });

  test.describe("📱 Mobile and Responsive Tests", () => {
    test("should work on mobile viewport", async ({ homePage }) => {
      // Set mobile viewport
      await homePage.setViewportSize(375, 667); // iPhone SE

      // Navigate and test mobile-specific features
      await homePage.gotoHome();
      await homePage.assertPageLoaded();
      await homePage.assertMobileNavigationVisible();

      // Test mobile menu if available
      if (await homePage.isMobileViewport()) {
        await homePage.openMobileMenu();
        await homePage.closeMobileMenu();
      }
    });
  });

  test.afterEach(async ({ page }, testInfo) => {
    // Capture screenshot on failure for debugging
    if (testInfo.status !== testInfo.expectedStatus) {
      const screenshotPath = `test-results/fixture-example-failure-${testInfo.title.replace(/\s+/g, "-")}.png`;
      await page.screenshot({
        path: screenshotPath,
        fullPage: true,
      });
      logger.error(TEST_MESSAGES.ERROR.TEST_FAILED_SCREENSHOT(screenshotPath));
    }
  });
});
