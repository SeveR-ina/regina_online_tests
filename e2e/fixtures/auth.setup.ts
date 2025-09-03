/**
 * Authentication Setup
 * Creates and saves authenticated admin session state for reuse across tests
 * Uses Page Object Model for better maintainability and reliability
 */

import { FIXTURES, TIMEOUTS, getProtectedPaths } from "@/data/constants";
import { PAGE_OBJECT_MESSAGES } from "@/data/logger-messages";
import { test as setup } from "@playwright/test";
import { AdminDashboardPage } from "@pom/pages/AdminDashboardPage";
import { AdminLoginPage } from "@pom/pages/AdminLoginPage";
import { TestConfig, logger } from "@utils/core.utils";

const ADMIN_FILE = FIXTURES.STORAGE_STATE.ADMIN;

/**
 * Setup authentication state for admin user
 * This will be reused across tests that require admin access
 */
setup("authenticate as admin", async ({ page }) => {
  try {
    const loginPage = new AdminLoginPage(page);
    const dashboardPage = new AdminDashboardPage(page);

    // Navigate to login page and verify it loaded
    await loginPage.gotoLogin();

    // Perform admin login
    const protectedPaths = getProtectedPaths();
    await loginPage.loginAsAdmin({
      waitForRedirect: true,
      expectedRedirectUrl: protectedPaths.PROTECTED_DASHBOARD,
      timeout: TIMEOUTS.LONG,
    });

    // Verify we're successfully logged in by checking dashboard
    await dashboardPage.assertLoaded();
    await dashboardPage.assertTitle();

    // Save the authentication state for reuse
    await page.context().storageState({ path: ADMIN_FILE });
  } catch (error) {
    logger.error(PAGE_OBJECT_MESSAGES.SETUP.ADMIN_AUTH_FAILED(error));

    // Take screenshot for debugging
    await page.screenshot({
      path: `test-results/auth-setup-failure-${Date.now()}.png`,
      fullPage: true,
    });

    throw error;
  }
});

/**
 * Setup test user authentication (optional)
 * Creates auth state for regular test user if credentials are available
 */
setup("authenticate as test user", async ({ page }) => {
  const testUser = TestConfig.testUser;

  try {
    const loginPage = new AdminLoginPage(page);

    await loginPage.gotoLogin();
    await loginPage.login(testUser.email, testUser.password, {
      waitForRedirect: false, // Test user might redirect differently
      timeout: TIMEOUTS.LOGIN,
    });

    // Save test user auth state
    const testUserFile = FIXTURES.STORAGE_STATE.TEST_USER;
    await page.context().storageState({ path: testUserFile });
  } catch (error) {
    logger.warn(PAGE_OBJECT_MESSAGES.SETUP.TEST_USER_FAILED(error));
  }
});

/**
 * Create authentication directory if it doesn't exist
 * Ensures the .auth directory structure is ready
 */
setup("create auth directory", async () => {
  try {
    const fs = await import("fs");
    const path = await import("path");

    const authDir = path.dirname(ADMIN_FILE);

    if (!fs.existsSync(authDir)) {
      fs.mkdirSync(authDir, { recursive: true });
    }

    // Ensure screenshots directory also exists
    const screenshotsDir = "test-results/screenshots";
    if (!fs.existsSync(screenshotsDir)) {
      fs.mkdirSync(screenshotsDir, { recursive: true });
    }
  } catch (error) {
    logger.error(PAGE_OBJECT_MESSAGES.SETUP.FAILED_CREATE_AUTH_DIR(error));
    throw error;
  }
});

/**
 * Validate authentication setup
 * Verifies that the created auth files are valid
 */
setup("validate auth files", async ({ browser }) => {
  try {
    const fs = await import("fs");

    // Check if admin auth file exists and is valid
    if (fs.existsSync(ADMIN_FILE)) {
      const authData = JSON.parse(fs.readFileSync(ADMIN_FILE, "utf8"));

      if (!authData.cookies || !authData.origins) {
        throw new Error(FIXTURES.ERROR_MESSAGES.AUTH_FILE_INVALID_FORMAT);
      }

      // Test the auth state by creating a new context with it
      const context = await browser.newContext({ storageState: ADMIN_FILE });
      const page = await context.newPage();

      // Try to access admin dashboard to verify auth is working
      const protectedPaths = getProtectedPaths();
      await page.goto(protectedPaths.PROTECTED_DASHBOARD);

      // Should not redirect to login page
      const currentUrl = page.url();
      if (currentUrl.includes(protectedPaths.PROTECTED_LOGIN)) {
        throw new Error(FIXTURES.ERROR_MESSAGES.AUTH_STATE_INVALID);
      }

      await context.close();
    } else {
      throw new Error(FIXTURES.ERROR_MESSAGES.ADMIN_AUTH_FILE_NOT_FOUND);
    }
  } catch (error) {
    logger.error(PAGE_OBJECT_MESSAGES.SETUP.AUTH_VALIDATION_FAILED(error));
    throw error;
  }
});
