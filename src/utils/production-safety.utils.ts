/**
 * Production Safety Utilities
 * Provides runtime protection against running destructive tests on production
 */

import { test } from "@playwright/test";

/**
 * Checks if the current environment is production
 */
export const isProduction = (): boolean => {
  return (
    process.env.TARGET === "prod" ||
    process.env.NODE_ENV === "production" ||
    process.env.TEST_ENV === "production"
  );
};

/**
 * Skips test if running on production environment
 * Use this for destructive tests that should never run on prod
 *
 * @param reason - Optional reason for skipping (for logging)
 */
export const skipOnProduction = (reason?: string): void => {
  test.skip(
    isProduction(),
    reason ?? "Destructive test - skipped on production"
  );
};

/**
 * Helper function to wrap destructive tests with production safety
 * Usage: protectiveTest("create new post", async ({ page, productionGuard }) => { ... })
 */
export const protectiveTest = test.extend<{ productionGuard: void }>({
  // Add a fixture that automatically skips on production
  // eslint-disable-next-line no-empty-pattern
  productionGuard: async ({}, use) => {
    if (isProduction()) {
      test.skip(true, "Destructive test automatically skipped on production");
    }
    await use();
  },
});

/**
 * Constants for production safety messages
 */
export const PRODUCTION_SAFETY_MESSAGES = {
  SKIPPED_ON_PROD:
    "Test skipped: Destructive operations not allowed on production",
  ENVIRONMENT_CHECK:
    "Checking environment safety before running destructive test",
  PROD_PROTECTION_ACTIVE:
    "Production protection is active - destructive tests will be skipped",
};

/**
 * Runtime environment check with error throwing
 * Use in beforeEach or test setup for critical destructive operations
 */
export const assertNotProduction = (operation: string): void => {
  if (isProduction()) {
    throw new Error(
      `PRODUCTION SAFETY: Attempted to run destructive operation "${operation}" on production environment. This is not allowed.`
    );
  }
};
