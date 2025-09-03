/**
 * Test Fixtures
 * Extended Playwright fixtures with Page Object Model integration
 * Provides pre-configured page objects and API clients for tests
 */

import { FIXTURES, getProtectedPaths } from "@/data/constants";
import { PAGE_OBJECT_MESSAGES } from "@/data/logger-messages";
import { APIRequestContext, Page, test as base } from "@playwright/test";
import { ApiClient } from "@utils/api.utils";
import { TestConfig, logger } from "@utils/core.utils";

// Import page objects
import { AdminDashboardPage } from "@pom/pages/AdminDashboardPage";
import { AdminLoginPage } from "@pom/pages/AdminLoginPage";
import { BlogEditorPage } from "@pom/pages/BlogEditorPage";
import { BlogPage } from "@pom/pages/BlogPage";
import { HomePage } from "@pom/pages/HomePage";

/**
 * Extended fixture types
 * Includes both raw pages and page object instances
 */
type Fixtures = {
  // Raw pages
  adminPage: Page;
  guestPage: Page;

  // API contexts
  api: APIRequestContext;
  apiClient: ApiClient;

  // Page Objects
  homePage: HomePage;
  blogPage: BlogPage;
  adminLoginPage: AdminLoginPage;
  adminDashboardPage: AdminDashboardPage;
  blogEditorPage: BlogEditorPage;
};

/**
 * Extended test with custom fixtures
 */
export const test = base.extend<Fixtures>({
  // Use admin storage state by default
  storageState: FIXTURES.STORAGE_STATE.ADMIN,

  /**
   * Pre-authenticated admin page
   * Uses admin authentication state
   */
  adminPage: async ({ page }, use) => {
    // Verify admin auth is working by checking we can access admin routes
    try {
      const protectedPaths = getProtectedPaths();
      await page.goto(protectedPaths.PROTECTED_DASHBOARD);

      // Should not redirect to login if properly authenticated
      const currentUrl = page.url();
      if (currentUrl.includes(protectedPaths.PROTECTED_LOGIN)) {
        throw new Error(FIXTURES.ERROR_MESSAGES.ADMIN_AUTH_INVALID);
      }
    } catch (error) {
      logger.error(
        PAGE_OBJECT_MESSAGES.FIXTURES.ADMIN_PAGE_SETUP_FAILED(error)
      );
      throw error;
    }

    await use(page);
  },

  /**
   * Guest page without authentication
   * Uses a fresh context without auth state
   */
  guestPage: async ({ browser }, use) => {
    const context = await browser.newContext({
      // No storage state - fresh session
      storageState: undefined,
    });

    const page = await context.newPage();

    await use(page);

    // Cleanup
    await context.close();
  },

  /**
   * API request context
   * Configured for API testing
   */
  api: async ({ playwright }, use) => {
    const apiBase = TestConfig.apiURL;

    const ctx = await playwright.request.newContext({
      baseURL: apiBase,
      extraHTTPHeaders: FIXTURES.API_CONTEXT.DEFAULT_HEADERS,
      timeout: FIXTURES.API_CONTEXT.TIMEOUT,
    });

    await use(ctx);

    // Cleanup
    await ctx.dispose();
  },

  /**
   * API client with authentication
   * Ready-to-use API client for test operations
   */
  apiClient: async ({ api }, use) => {
    const client = new ApiClient(api);

    // Attempt to authenticate the API client
    try {
      const loginResult = await client.loginAsAdmin();
      if (!loginResult.success) {
        logger.warn(PAGE_OBJECT_MESSAGES.FIXTURES.API_CLIENT_AUTH_FAILED);
      }
    } catch (error) {
      logger.warn(PAGE_OBJECT_MESSAGES.FIXTURES.API_CLIENT_AUTH_ERROR(error));
    }

    await use(client);

    // Cleanup - logout if possible
    try {
      await client.logout();
    } catch (error) {
      logger.debug(PAGE_OBJECT_MESSAGES.FIXTURES.API_LOGOUT_ERROR(error));
    }
  },

  /**
   * Home Page Object
   */
  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page);
    await use(homePage);
  },

  /**
   * Blog Page Object
   */
  blogPage: async ({ page }, use) => {
    const blogPage = new BlogPage(page);
    await use(blogPage);
  },

  /**
   * Admin Login Page Object
   * Uses guest page to avoid auth conflicts
   */
  adminLoginPage: async ({ guestPage }, use) => {
    const loginPage = new AdminLoginPage(guestPage);
    await use(loginPage);
  },

  /**
   * Admin Dashboard Page Object
   * Uses pre-authenticated admin page
   */
  adminDashboardPage: async ({ adminPage }, use) => {
    const dashboardPage = new AdminDashboardPage(adminPage);
    await use(dashboardPage);
  },

  /**
   * Blog Editor Page Object
   * Uses pre-authenticated admin page
   */
  blogEditorPage: async ({ adminPage }, use) => {
    const editorPage = new BlogEditorPage(adminPage);
    await use(editorPage);
  },
});

/**
 * Specialized test variants for different scenarios
 */

/**
 * Test for guest/unauthenticated scenarios
 * Uses fresh browser context without auth state
 */
export const guestTest = base.extend<{
  homePage: HomePage;
  blogPage: BlogPage;
  adminLoginPage: AdminLoginPage;
}>({
  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page);
    await use(homePage);
  },

  blogPage: async ({ page }, use) => {
    const blogPage = new BlogPage(page);
    await use(blogPage);
  },

  adminLoginPage: async ({ page }, use) => {
    const loginPage = new AdminLoginPage(page);
    await use(loginPage);
  },
});

/**
 * Test for API-only scenarios
 * No browser pages, just API clients
 */
export const apiTest = base.extend<{
  apiClient: ApiClient;
  api: APIRequestContext;
}>({
  api: async ({ playwright }, use) => {
    const ctx = await playwright.request.newContext({
      baseURL: TestConfig.apiURL,
      extraHTTPHeaders: {
        Accept: FIXTURES.API_CONTEXT.DEFAULT_HEADERS.Accept,
        "Content-Type": FIXTURES.API_CONTEXT.DEFAULT_HEADERS["Content-Type"],
      },
    });

    await use(ctx);
    await ctx.dispose();
  },

  apiClient: async ({ api }, use) => {
    const client = new ApiClient(api);
    await use(client);
  },
});

// Export expect for convenience
export const expect = test.expect;
