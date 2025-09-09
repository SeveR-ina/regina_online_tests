/**
 * Global Setup for Playwright Tests
 * Handles authentication and global test preparation using Page Object Model
 * Creates authenticated browser contexts for test reuse
 */

import { chromium, FullConfig } from "@playwright/test";
import { AdminDashboardPage } from "@pom/pages/AdminDashboardPage";
import { AdminLoginPage } from "@pom/pages/AdminLoginPage";
import { getProtectedPaths, TIMEOUT } from "@test-data/constants";
import { PAGE_OBJECT_MESSAGES } from "@test-data/logger-messages";
import { logger, TestConfig } from "@utils/core.utils";
import "dotenv/config";

const AUTH_FILE = "e2e/.auth/admin.json";

export default async function globalSetup(config: FullConfig) {
  try {
    // Check if any admin projects are being run
    const adminProjectsRunning = config.projects.some(project => {
      if (project.name.includes("admin") || project.name === "api") {
        return true;
      }

      // Check testMatch patterns if they exist
      if (project.testMatch) {
        const patterns = Array.isArray(project.testMatch)
          ? project.testMatch
          : [project.testMatch];
        return patterns.some((pattern: string | RegExp) => {
          const patternStr =
            typeof pattern === "string" ? pattern : pattern.toString();
          return patternStr.includes("admin");
        });
      }

      return false;
    });

    if (!adminProjectsRunning) {
      return;
    }

    // Check if admin credentials are configured
    const credentials = TestConfig.adminCredentials;
    if (!credentials.email || credentials.email === "admin@example.com") {
      logger.warn(PAGE_OBJECT_MESSAGES.SETUP.ADMIN_CREDENTIALS_WARNING);
      return;
    }

    // Get base URL from config or environment
    const baseURL = config.projects[0].use?.baseURL ?? TestConfig.baseURL;

    // Launch browser and create context
    const browser = await chromium.launch({
      headless: !!process.env.CI || !!process.env.HEADLESS,
    });

    const context = await browser.newContext({
      baseURL,
      // Set reasonable timeouts
      // Enable tracing in CI for debugging
      ...(process.env.CI && {
        recordVideo: {
          dir: "test-results/global-setup-videos/",
          size: { width: 1280, height: 720 },
        },
      }),
    });

    const page = await context.newPage();

    // Initialize page objects
    const loginPage = new AdminLoginPage(page);
    const dashboardPage = new AdminDashboardPage(page);

    // Navigate to login page
    await loginPage.gotoLogin();

    // Perform login with admin credentials
    const protectedPaths = getProtectedPaths();
    await loginPage.loginAsAdmin({
      waitForRedirect: true,
      expectedRedirectUrl: protectedPaths.PROTECTED_DASHBOARD,
      timeout: TIMEOUT,
    });

    // Verify login was successful
    await dashboardPage.assertLoaded();

    // Save authentication state for test reuse
    await context.storageState({ path: AUTH_FILE });

    // Close browser
    await browser.close();
  } catch (error) {
    logger.error(PAGE_OBJECT_MESSAGES.SETUP.FAILED(error));

    // Ensure we clean up even if setup fails
    try {
      const browser = await chromium.launch();
      const context = await browser.newContext();
      const page = await context.newPage();

      // Take a screenshot for debugging
      await page.screenshot({
        path: `test-results/global-setup-failure-${Date.now()}.png`,
        fullPage: true,
      });

      await browser.close();
    } catch (screenshotError) {
      logger.error(`Failed to take debug screenshot: ${screenshotError}`);
    }

    throw error;
  }
}
