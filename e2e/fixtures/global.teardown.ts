/**
 * Global Teardown
 * Cleanup tasks that run after all tests complete
 * Handles file cleanup and resource cleanup
 */

import { logger } from "@utils/core.utils";

const AUTH_FILES = ["e2e/.auth/admin.json", "e2e/.auth/testuser.json"];

/**
 * Global teardown function that runs after all tests complete
 */
export default async function globalTeardown() {
  try {
    // Clean up authentication and temporary files
    await cleanupFiles();

    // Generate test run summary
    await generateTestSummary();
  } catch (error) {
    logger.warn(`Global teardown failed: ${error}`);
    // Don't fail the entire test run if cleanup fails
  }
}

/**
 * Clean up authentication and temporary files
 */
async function cleanupFiles() {
  try {
    const fs = await import("fs");

    // Clean up temporary test artifacts if configured
    if (process.env.CLEANUP_TEMP_FILES === "true") {
      const tempDirs = ["test-results/temp", "test-results/downloads"];

      for (const dir of tempDirs) {
        if (fs.existsSync(dir)) {
          try {
            fs.rmSync(dir, { recursive: true, force: true });
          } catch (error) {
            logger.warn(`Failed to clean temp directory ${dir}: ${error}`);
          }
        }
      }
    }
  } catch (error) {
    logger.warn(`File cleanup failed: ${error}`);
  }
}

/**
 * Generate test run summary
 */
async function generateTestSummary() {
  try {
    const fs = await import("fs");

    const summary = {
      timestamp: new Date().toISOString(),
      environment: {
        target: process.env.TARGET ?? "local",
        ci: !!process.env.CI,
        baseUrl: process.env.TEST_BASE_URL_LOCAL ?? "http://localhost:3000",
      },
      cleanup: {
        authFilesPreserved: AUTH_FILES.filter(file => fs.existsSync(file)),
        testResultsDir: fs.existsSync("test-results")
          ? "available"
          : "not found",
      },
    };

    // Ensure test-results directory exists
    if (!fs.existsSync("test-results")) {
      fs.mkdirSync("test-results", { recursive: true });
    }

    // Write summary to file
    const summaryPath = "test-results/test-run-summary.json";
    fs.writeFileSync(summaryPath, JSON.stringify(summary, null, 2));
  } catch (error) {
    logger.warn(`Test summary generation failed: ${error}`);
  }
}
