import type { ReporterDescription } from "@playwright/test";

/**
 * Reporter configurations for different environments
 * Based on best practices for CI/CD and local development
 */

export const REPORTS_CI: ReporterDescription[] = [
  ["line"],
  [
    "html",
    {
      outputFolder: "./test-results/html-report",
      open: "never",
      attachmentsBaseURL: process.env.CI ? "https://artifacts.url/" : undefined,
    },
  ],
  [
    "junit",
    {
      outputFile: "./test-results/junit-results.xml",
      includeProjectInTestName: true,
    },
  ],
  [
    "json",
    {
      outputFile: "./test-results/test-results.json",
    },
  ],
  [
    "allure-playwright",
    {
      resultsDir: "./test-results/allure-results",
      testPlan: false,
      links: [
        {
          type: "issue",
          urlTemplate: "https://github.com/your-org/repo/issues/%s",
        },
        {
          type: "tms",
          urlTemplate: "https://your-test-management-system.com/test/%s",
        },
      ],
      categories: [
        {
          name: "Ignored tests",
          messageRegex: ".*ignored.*",
          matchedStatuses: ["skipped"],
        },
        {
          name: "Infrastructure problems",
          messageRegex: ".*RuntimeException.*",
          matchedStatuses: ["broken"],
        },
        {
          name: "Outdated tests",
          messageRegex: ".*FileNotFound.*",
          matchedStatuses: ["broken"],
        },
        {
          name: "Timeout errors",
          messageRegex: ".*timeout.*",
          matchedStatuses: ["broken", "failed"],
        },
        {
          name: "Assertion failures",
          messageRegex: ".*assertion.*",
          matchedStatuses: ["failed"],
        },
      ],
    },
  ],
  ["github"],
  ["blob"],
];

export const REPORTS_LOCAL: ReporterDescription[] = [
  ["list", { printSteps: true }],
  [
    "html",
    {
      outputFolder: "./test-results/html-report",
      open: "on-failure",
    },
  ],
  [
    "allure-playwright",
    {
      resultsDir: "./test-results/allure-results",
      testPlan: false,
      categories: [
        {
          name: "Ignored tests",
          messageRegex: ".*ignored.*",
          matchedStatuses: ["skipped"],
        },
        {
          name: "Infrastructure problems",
          messageRegex: ".*RuntimeException.*",
          matchedStatuses: ["broken"],
        },
        {
          name: "Timeout errors",
          messageRegex: ".*timeout.*",
          matchedStatuses: ["broken", "failed"],
        },
        {
          name: "Assertion failures",
          messageRegex: ".*assertion.*",
          matchedStatuses: ["failed"],
        },
      ],
    },
  ],
];

export const REPORTS_DOCKER: ReporterDescription[] = [
  ["line"],
  [
    "html",
    {
      outputFolder: "./test-results/html-report",
      open: "never",
    },
  ],
  [
    "json",
    {
      outputFile: "./test-results/test-results.json",
    },
  ],
  [
    "allure-playwright",
    {
      resultsDir: "./test-results/allure-results",
      testPlan: false,
    },
  ],
];

/**
 * Get appropriate reporter configuration based on environment
 */
export const getReporterConfig = (): ReporterDescription[] => {
  if (process.env.CI) {
    return REPORTS_CI;
  }

  if (process.env.DOCKER) {
    return REPORTS_DOCKER;
  }

  return REPORTS_LOCAL;
};
