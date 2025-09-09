import { defineConfig, devices } from "@playwright/test";
import "dotenv/config";
import { getReporterConfig } from "./reportConfig";

// Environment configuration
const TARGET = process.env.TARGET ?? "local";
const IS_CI = !!process.env.CI;
const IS_DOCKER = !!process.env.DOCKER;
const IS_PRODUCTION = TARGET === "prod";

// Production safety - grep pattern to exclude destructive tests on prod
const getTestGrepPattern = () => {
  if (IS_PRODUCTION) {
    // On production: exclude all destructive tests
    return {
      grepInvert: /@create|@update|@delete|@remove|@modify|@crud/,
    };
  }
  return {}; // No filtering on local
};

// URL configuration helper
const getBaseURL = (key: "TEST_BASE_URL" | "API_BASE_URL"): string => {
  const envKey = `${key}_${TARGET.toUpperCase()}`;
  const envValue = process.env[envKey];

  if (envValue) return envValue;

  // Fallback defaults
  if (TARGET === "prod") {
    return key === "TEST_BASE_URL"
      ? "https://reginaonline.de"
      : "https://reginaonline.de/api";
  }

  return key === "TEST_BASE_URL"
    ? "http://localhost:3000"
    : "http://localhost:3000/api";
};

// Test execution configuration
const getTestConfig = () => {
  if (IS_DOCKER) {
    return {
      workers: 1,
      retries: 1, // Only 1 retry in Docker
      timeout: 90_000,
      headless: true,
    };
  }

  if (IS_CI) {
    return {
      workers: "50%",
      retries: 1, // Only 1 retry in CI
      timeout: 60_000,
      headless: true,
    };
  }

  return {
    workers: undefined,
    retries: 1, // Only 1 retry locally
    timeout: 60_000,
    headless: !process.env.HEADED,
  };
};

const testConfig = getTestConfig();
const grepPattern = getTestGrepPattern();

export default defineConfig({
  testDir: "./src",
  timeout: testConfig.timeout,
  ...grepPattern, // Apply production safety filtering
  expect: {
    timeout: 15_000,
    toHaveScreenshot: { threshold: 0.3 },
    toMatchSnapshot: { threshold: 0.3 },
  },
  fullyParallel: true,
  forbidOnly: IS_CI || IS_PRODUCTION, // Forbid .only on production
  retries: testConfig.retries,
  workers: testConfig.workers,

  // Enhanced reporting configuration with Allure
  reporter: getReporterConfig(),

  // Global test configuration
  use: {
    baseURL: getBaseURL("TEST_BASE_URL"),
    headless: testConfig.headless,

    // Tracing and debugging
    trace: IS_CI ? "retain-on-failure" : "on-first-retry",
    screenshot: {
      mode: "only-on-failure",
      fullPage: true,
    },
    video: {
      mode: "retain-on-failure",
      size: { width: 1280, height: 720 },
    },

    // Timeouts
    actionTimeout: 15_000,
    navigationTimeout: 30_000,

    // Locale and timezone
    locale: "en-US",
    timezoneId: "Europe/Berlin",

    // Performance optimizations
    ignoreHTTPSErrors: true,
    acceptDownloads: false,
  },

  // Test projects for different browsers and devices
  projects: [
    // Setup project for authentication
    {
      name: "setup",
      testMatch: "**/auth.setup.ts",
      teardown: "cleanup",
    },
    {
      name: "cleanup",
      testMatch: "**/global.teardown.ts",
    },

    // Guest tests (UI tests that don't require admin authentication)
    // Note: Some tests may still use API fixtures that handle auth gracefully
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
        viewport: { width: 1280, height: 720 },
      },
      dependencies: ["setup"], // Needed for API tests that run in this project
      testIgnore: [
        "**/setup/**",
        "**/teardown/**",
        "**/admin*.spec.ts",
        "**/admin/**",
      ],
    },
    {
      name: "webkit",
      use: {
        ...devices["Desktop Safari"],
        viewport: { width: 1280, height: 720 },
      },
      dependencies: ["setup"], // May include API smoke tests
      testIgnore: [
        "**/setup/**",
        "**/teardown/**",
        "**/admin*.spec.ts",
        "**/admin/**",
      ],
    },

    // Admin tests (with authentication)
    {
      name: "chromium-admin",
      use: {
        ...devices["Desktop Chrome"],
        viewport: { width: 1280, height: 720 },
        storageState: "src/.auth/admin.json",
      },
      dependencies: ["setup"],
      testMatch: ["**/admin*.spec.ts", "**/admin/**/*.spec.ts"],
      testIgnore: ["**/setup/**", "**/teardown/**"],
    },
    {
      name: "webkit-admin",
      use: {
        ...devices["Desktop Safari"],
        viewport: { width: 1280, height: 720 },
        storageState: "src/.auth/admin.json",
      },
      dependencies: ["setup"],
      testMatch: ["**/admin*.spec.ts", "**/admin/**/*.spec.ts"],
      testIgnore: ["**/setup/**", "**/teardown/**"],
    },

    // Mobile devices (guest tests)
    {
      name: "iphone",
      use: {
        ...devices["iPhone 14"],
      },
      dependencies: ["setup"], // May include API smoke tests
      testIgnore: [
        "**/setup/**",
        "**/teardown/**",
        "**/admin*.spec.ts",
        "**/admin/**",
      ],
    },
    {
      name: "ipad-mini",
      use: {
        ...devices["iPad Mini"],
      },
      dependencies: ["setup"], // May include API smoke tests
      testIgnore: [
        "**/setup/**",
        "**/teardown/**",
        "**/admin*.spec.ts",
        "**/admin/**",
      ],
    },

    // API-only tests (no browser needed)
    {
      name: "api",
      testMatch: "**/tests/api/**/*.spec.ts",
      use: {
        baseURL: getBaseURL("API_BASE_URL"),
      },
      dependencies: ["setup"],
    },
  ],

  // Test output directories
  outputDir: "test-results/artifacts/",

  // Global teardown only (setup is handled via project dependencies)
  globalTeardown: "./src/fixtures/global.teardown.ts",

  // Web server configuration disabled - assuming server is already running

  // Metadata for reporting
  metadata: {
    target: TARGET,
    testBaseURL: getBaseURL("TEST_BASE_URL"),
    apiBaseURL: getBaseURL("API_BASE_URL"),
    ci: IS_CI,
    docker: IS_DOCKER,
    timestamp: new Date().toISOString(),
  },
});
