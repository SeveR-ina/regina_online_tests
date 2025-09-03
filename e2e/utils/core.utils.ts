/**
 * Core utility functions for E2E testing framework
 * Provides common functionality for test execution, data management, and assertions
 */

import { ENV_VARS, TEST_DATA, TIMEOUTS } from "@/data/constants";
import { expect, Locator, Page } from "@playwright/test";
import { v4 as uuidv4 } from "uuid";
import * as winston from "winston";

// Logger configuration
export const logger = winston.createLogger({
  level: process.env[ENV_VARS.LOG_LEVEL] ?? "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.printf(({ timestamp, level, message, stack }) => {
      return `${timestamp} [${level.toUpperCase()}]: ${message}${stack ? `\n${stack}` : ""}`;
    })
  ),
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      ),
    }),
    new winston.transports.File({
      filename: "test-results/test-execution.log",
      level: "debug",
    }),
  ],
});

/**
 * Environment and configuration helpers
 */
export class TestConfig {
  static get baseURL(): string {
    const target = process.env[ENV_VARS.TARGET] ?? "local";
    const urlKey = `TEST_BASE_URL_${target.toUpperCase()}`;
    return (
      process.env[urlKey] ??
      (target === "prod" ? "https://reginaonline.de" : "http://localhost:3000")
    );
  }

  static get apiURL(): string {
    const target = process.env[ENV_VARS.TARGET] ?? "local";
    const urlKey = `API_BASE_URL_${target.toUpperCase()}`;
    return (
      process.env[urlKey] ??
      (target === "prod"
        ? "https://reginaonline.de/api"
        : "http://localhost:3000/api")
    );
  }

  static get isCI(): boolean {
    return !!process.env[ENV_VARS.CI];
  }

  static get isDocker(): boolean {
    return !!process.env[ENV_VARS.DOCKER];
  }

  static get target(): string {
    return process.env[ENV_VARS.TARGET] ?? "local";
  }

  static get adminCredentials() {
    return {
      email: process.env[ENV_VARS.ADMIN_EMAIL] ?? "",
      password: process.env[ENV_VARS.ADMIN_PASSWORD] ?? "",
    };
  }

  static get testUser() {
    return {
      email: process.env[ENV_VARS.TEST_USER_EMAIL] ?? "",
      password: process.env[ENV_VARS.TEST_USER_PASSWORD] ?? "",
    };
  }
}

/**
 * Test data generation utilities
 */
export class TestDataGenerator {
  /**
   * Generate unique test blog post data
   */
  static generateBlogPost(
    options: {
      title?: string;
      content?: string;
      excerpt?: string;
      status?: "draft" | "published";
    } = {}
  ) {
    const uniqueId = uuidv4().slice(0, 8);
    const timestamp = new Date().toISOString().slice(0, 10);

    return {
      title:
        options.title ??
        `${TEST_DATA.BLOG.SAMPLE_TITLE} ${uniqueId} - ${timestamp}`,
      content:
        options.content ??
        `# Test Content\n\nThis is a test blog post created at ${new Date().toISOString()}.\n\n## Features\n\n- Automated content generation\n- Unique identifier: ${uniqueId}\n- Timestamp: ${timestamp}`,
      excerpt:
        options.excerpt ?? `${TEST_DATA.BLOG.SAMPLE_EXCERPT} ${uniqueId}`,
      status: options.status ?? TEST_DATA.BLOG.STATUS.DRAFT,
      featured_image:
        "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=600&fit=crop",
      external_link: "https://github.com/reginachepkunova",
      hide_link: false,
      seo_meta: {
        title: `SEO Title for ${uniqueId}`,
        description: `SEO description for test blog post ${uniqueId}`,
        keywords: `test, blog, automation, ${uniqueId}`,
      },
    };
  }

  /**
   * Generate test user data
   */
  static generateUser(role: "admin" | "user" = "user") {
    const uniqueId = uuidv4().slice(0, 8);
    return {
      name: `Test User ${uniqueId}`,
      email: `testuser${uniqueId}@example.com`,
      password: `TestPassword${uniqueId}!`,
      role,
    };
  }

  /**
   * Generate search terms for testing
   */
  static generateSearchTerms() {
    return {
      valid: [
        "react",
        "typescript",
        "javascript",
        "web development",
        "frontend",
      ],
      invalid: ["", "   ", "\n\t", "<script>", "SELECT * FROM"],
      special: ["café", "naïve", "Москва", "東京", "🔥", "test@example.com"],
    };
  }
}

/**
 * Page interaction utilities
 */
export class PageHelpers {
  /**
   * Wait for page to be fully loaded
   */
  static async waitForPageLoad(
    page: Page,
    timeout: number = TIMEOUTS.PAGE_LOAD
  ): Promise<void> {
    await Promise.all([
      page.waitForLoadState("networkidle", { timeout }),
      page.waitForFunction(() => document.readyState === "complete", {
        timeout,
      }),
    ]);
  }

  /**
   * Safely click an element with retry mechanism
   */
  static async safeClick(
    locator: Locator,
    options: {
      timeout?: number;
      retries?: number;
      waitForVisible?: boolean;
    } = {}
  ): Promise<void> {
    const {
      timeout = TIMEOUTS.CLICK,
      retries = 3,
      waitForVisible = true,
    } = options;

    for (let i = 0; i < retries; i++) {
      try {
        if (waitForVisible) {
          await locator.waitFor({ state: "visible", timeout });
        }

        await locator.scrollIntoViewIfNeeded();
        await locator.click({ timeout });
        return;
      } catch (error) {
        if (i === retries - 1) throw error;
        await new Promise(resolve => setTimeout(resolve, TIMEOUTS.RETRY_DELAY));
        logger.warn(`Click attempt ${i + 1} failed, retrying...`);
      }
    }
  }

  /**
   * Safely fill input with validation
   */
  static async safeFill(
    locator: Locator,
    text: string,
    options: {
      timeout?: number;
      clear?: boolean;
      validate?: boolean;
    } = {}
  ): Promise<void> {
    const { timeout = TIMEOUTS.FILL, clear = true, validate = true } = options;

    await locator.waitFor({ state: "visible", timeout });

    if (clear) {
      await locator.clear();
    }

    await locator.fill(text);

    if (validate) {
      await expect(locator).toHaveValue(text);
    }
  }

  /**
   * Take screenshot with descriptive name
   */
  static async takeScreenshot(page: Page, name: string): Promise<void> {
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    const filename = `screenshot-${name}-${timestamp}.png`;
    await page.screenshot({
      path: `test-results/screenshots/${filename}`,
      fullPage: true,
    });
  }

  /**
   * Wait for element to be stable (no animations)
   */
  static async waitForStable(
    locator: Locator,
    timeout: number = TIMEOUTS.MEDIUM
  ): Promise<void> {
    let previousBox = await locator.boundingBox();
    const startTime = Date.now();

    while (Date.now() - startTime < timeout) {
      await new Promise(resolve => setTimeout(resolve, 100));
      const currentBox = await locator.boundingBox();

      if (
        previousBox &&
        currentBox &&
        previousBox.x === currentBox.x &&
        previousBox.y === currentBox.y &&
        previousBox.width === currentBox.width &&
        previousBox.height === currentBox.height
      ) {
        return;
      }

      previousBox = currentBox;
    }
  }

  /**
   * Handle modal dialogs
   */
  static async handleDialog(
    page: Page,
    action: "accept" | "dismiss",
    message?: string
  ): Promise<void> {
    return new Promise(resolve => {
      page.on("dialog", async dialog => {
        if (message && !dialog.message().includes(message)) {
          logger.warn(`Unexpected dialog message: ${dialog.message()}`);
        }

        if (action === "accept") {
          await dialog.accept();
        } else {
          await dialog.dismiss();
        }

        resolve();
      });
    });
  }
}

/**
 * Performance monitoring utilities
 */
export class PerformanceHelpers {
  /**
   * Measure page load time
   */
  static async measurePageLoad(page: Page): Promise<number> {
    const startTime = Date.now();
    await PageHelpers.waitForPageLoad(page);
    const endTime = Date.now();
    const loadTime = endTime - startTime;
    return loadTime;
  }

  /**
   * Get Core Web Vitals
   */
  static async getCoreWebVitals(page: Page): Promise<{
    LCP?: number;
    FID?: number;
    CLS?: number;
  }> {
    return await page.evaluate(() => {
      return new Promise(resolve => {
        const vitals: any = {};

        // Largest Contentful Paint
        new PerformanceObserver(list => {
          const entries = list.getEntries();
          if (entries.length > 0) {
            vitals.LCP = entries[entries.length - 1].startTime;
          }
        }).observe({ entryTypes: ["largest-contentful-paint"] });

        // First Input Delay
        new PerformanceObserver(list => {
          const entries = list.getEntries();
          if (entries.length > 0) {
            // FID calculation using available timing properties
            const entry = entries[0] as any;
            vitals.FID =
              (entry.processingStart ?? entry.startTime) - entry.startTime;
          }
        }).observe({ entryTypes: ["first-input"] });

        // Cumulative Layout Shift
        let cls = 0;
        new PerformanceObserver(list => {
          const entries = list.getEntries();
          entries.forEach((entry: any) => {
            if (!entry.hadRecentInput) {
              cls += entry.value;
            }
          });
          vitals.CLS = cls;
        }).observe({ entryTypes: ["layout-shift"] });

        // Return vitals after a delay
        setTimeout(() => resolve(vitals), TIMEOUTS.SHORT);
      });
    });
  }
}

/**
 * Mobile testing utilities
 */
export class MobileHelpers {
  /**
   * Simulate mobile gestures
   */
  static async swipe(
    page: Page,
    direction: "up" | "down" | "left" | "right",
    distance: number = 300
  ): Promise<void> {
    const viewport = page.viewportSize();
    if (!viewport) return;

    const startX = viewport.width / 2;
    const startY = viewport.height / 2;

    let endX = startX;
    let endY = startY;

    switch (direction) {
      case "up":
        endY = startY - distance;
        break;
      case "down":
        endY = startY + distance;
        break;
      case "left":
        endX = startX - distance;
        break;
      case "right":
        endX = startX + distance;
        break;
    }

    await page.touchscreen.tap(startX, startY);
    await page.touchscreen.tap(endX, endY);
  }

  /**
   * Test responsive breakpoints
   */
  static async testResponsiveBreakpoints(
    page: Page,
    callback: () => Promise<void>
  ): Promise<void> {
    const breakpoints = [
      { width: 320, height: 568, name: "Mobile Small" },
      { width: 375, height: 667, name: "Mobile Medium" },
      { width: 768, height: 1024, name: "Tablet" },
      { width: 1024, height: 768, name: "Desktop Small" },
      { width: 1440, height: 900, name: "Desktop Large" },
    ];

    for (const breakpoint of breakpoints) {
      await page.setViewportSize({
        width: breakpoint.width,
        height: breakpoint.height,
      });
      await PageHelpers.waitForPageLoad(page);
      await callback();
    }
  }
}
