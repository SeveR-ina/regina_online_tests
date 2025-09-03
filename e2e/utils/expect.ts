/**
 * Custom expect utilities for E2E testing framework
 * Provides enhanced expect functions with logging and better error messages
 */

import { TIMEOUTS } from "@/data/constants";
import { APIResponse, expect, Locator, Page, Response } from "@playwright/test";
import { logger } from "./core.utils";

/**
 * Element visibility and state assertions
 */
export class ElementAssertions {
  /**
   * Assert element is visible
   */
  static async toBeVisible(
    locator: Locator,
    options: { timeout?: number; message?: string } = {}
  ): Promise<void> {
    const { timeout = TIMEOUTS.DEFAULT, message } = options;
    logger.debug(
      `Asserting element is visible: ${await locator.innerText().catch(() => "Unable to get text")}`
    );

    const expectWithMessage = message
      ? expect(locator, message)
      : expect(locator);
    await expectWithMessage.toBeVisible({ timeout });

    logger.debug("✅ Element visibility assertion passed");
  }

  /**
   * Assert element is hidden
   */
  static async toBeHidden(
    locator: Locator,
    options: { timeout?: number; message?: string } = {}
  ): Promise<void> {
    const { timeout = TIMEOUTS.ELEMENT_HIDDEN, message } = options;
    logger.debug("Asserting element is hidden");

    const expectWithMessage = message
      ? expect(locator, message)
      : expect(locator);
    await expectWithMessage.toBeHidden({ timeout });

    logger.debug("✅ Element hidden assertion passed");
  }

  /**
   * Assert element is attached to DOM
   */
  static async toBeAttached(
    locator: Locator,
    options: { timeout?: number; message?: string } = {}
  ): Promise<void> {
    const { timeout = TIMEOUTS.DEFAULT, message } = options;
    logger.debug("Asserting element is attached to DOM");

    const expectWithMessage = message
      ? expect(locator, message)
      : expect(locator);
    await expectWithMessage.toBeAttached({ timeout });

    logger.debug("✅ Element attachment assertion passed");
  }

  /**
   * Assert element is detached from DOM
   */
  static async toBeDetached(
    locator: Locator,
    options: { timeout?: number; message?: string } = {}
  ): Promise<void> {
    const { timeout = TIMEOUTS.DEFAULT, message } = options;
    logger.debug("Asserting element is detached from DOM");

    const expectWithMessage = message
      ? expect(locator, message)
      : expect(locator);
    await expectWithMessage.toBeAttached({ timeout, attached: false });

    logger.debug("✅ Element detachment assertion passed");
  }

  /**
   * Assert element is enabled
   */
  static async toBeEnabled(
    locator: Locator,
    options: { timeout?: number; message?: string } = {}
  ): Promise<void> {
    const { timeout = TIMEOUTS.DEFAULT, message } = options;
    logger.debug("Asserting element is enabled");

    const expectWithMessage = message
      ? expect(locator, message)
      : expect(locator);
    await expectWithMessage.toBeEnabled({ timeout });

    logger.debug("✅ Element enabled assertion passed");
  }

  /**
   * Assert element is disabled
   */
  static async toBeDisabled(
    locator: Locator,
    options: { timeout?: number; message?: string } = {}
  ): Promise<void> {
    const { timeout = TIMEOUTS.DEFAULT, message } = options;
    logger.debug("Asserting element is disabled");

    const expectWithMessage = message
      ? expect(locator, message)
      : expect(locator);
    await expectWithMessage.toBeDisabled({ timeout });

    logger.debug("✅ Element disabled assertion passed");
  }

  /**
   * Assert element is editable
   */
  static async toBeEditable(
    locator: Locator,
    options: { timeout?: number; message?: string } = {}
  ): Promise<void> {
    const { timeout = TIMEOUTS.DEFAULT, message } = options;
    logger.debug("Asserting element is editable");

    const expectWithMessage = message
      ? expect(locator, message)
      : expect(locator);
    await expectWithMessage.toBeEditable({ timeout });

    logger.debug("✅ Element editable assertion passed");
  }

  /**
   * Assert element is empty
   */
  static async toBeEmpty(
    locator: Locator,
    options: { timeout?: number; message?: string } = {}
  ): Promise<void> {
    const { timeout = TIMEOUTS.DEFAULT, message } = options;
    logger.debug("Asserting element is empty");

    const expectWithMessage = message
      ? expect(locator, message)
      : expect(locator);
    await expectWithMessage.toBeEmpty({ timeout });

    logger.debug("✅ Element empty assertion passed");
  }

  /**
   * Assert element is focused
   */
  static async toBeFocused(
    locator: Locator,
    options: { timeout?: number; message?: string } = {}
  ): Promise<void> {
    const { timeout = TIMEOUTS.DEFAULT, message } = options;
    logger.debug("Asserting element is focused");

    const expectWithMessage = message
      ? expect(locator, message)
      : expect(locator);
    await expectWithMessage.toBeFocused({ timeout });

    logger.debug("✅ Element focus assertion passed");
  }
}

/**
 * Text content assertions
 */
export class TextAssertions {
  /**
   * Assert element has exact text
   */
  static async toHaveText(
    locator: Locator,
    expectedText: string | RegExp | (string | RegExp)[],
    options: { timeout?: number; ignoreCase?: boolean; message?: string } = {}
  ): Promise<void> {
    const { timeout = TIMEOUTS.DEFAULT, ignoreCase, message } = options;
    logger.debug(`Asserting element has text: ${expectedText}`);

    const expectWithMessage = message
      ? expect(locator, message)
      : expect(locator);
    await expectWithMessage.toHaveText(expectedText, { timeout, ignoreCase });

    logger.debug("✅ Text assertion passed");
  }

  /**
   * Assert element contains text
   */
  static async toContainText(
    locator: Locator,
    expectedText: string | RegExp | (string | RegExp)[],
    options: { timeout?: number; ignoreCase?: boolean; message?: string } = {}
  ): Promise<void> {
    const { timeout = TIMEOUTS.DEFAULT, ignoreCase, message } = options;
    logger.debug(`Asserting element contains text: ${expectedText}`);

    const expectWithMessage = message
      ? expect(locator, message)
      : expect(locator);
    await expectWithMessage.toContainText(expectedText, {
      timeout,
      ignoreCase,
    });

    logger.debug("✅ Contains text assertion passed");
  }

  /**
   * Assert element has inner text
   */
  static async toHaveInnerText(
    locator: Locator,
    expectedText: string | RegExp,
    options: { timeout?: number; message?: string } = {}
  ): Promise<void> {
    const { timeout = TIMEOUTS.DEFAULT, message } = options;
    logger.debug(`Asserting element has inner text: ${expectedText}`);

    const expectWithMessage = message
      ? expect(locator, message)
      : expect(locator);
    await expectWithMessage.toHaveText(expectedText, {
      timeout,
      useInnerText: true,
    });

    logger.debug("✅ Inner text assertion passed");
  }
}

/**
 * Form input assertions
 */
export class InputAssertions {
  /**
   * Assert input has value
   */
  static async toHaveValue(
    locator: Locator,
    expectedValue: string | RegExp,
    options: { timeout?: number; message?: string } = {}
  ): Promise<void> {
    const { timeout = TIMEOUTS.DEFAULT, message } = options;
    logger.debug(`Asserting input has value: ${expectedValue}`);

    const expectWithMessage = message
      ? expect(locator, message)
      : expect(locator);
    await expectWithMessage.toHaveValue(expectedValue, { timeout });

    logger.debug("✅ Input value assertion passed");
  }

  /**
   * Assert input has values (for multi-select)
   */
  static async toHaveValues(
    locator: Locator,
    expectedValues: string[] | RegExp[],
    options: { timeout?: number; message?: string } = {}
  ): Promise<void> {
    const { timeout = TIMEOUTS.DEFAULT, message } = options;
    logger.debug(`Asserting input has values: ${expectedValues}`);

    const expectWithMessage = message
      ? expect(locator, message)
      : expect(locator);
    await expectWithMessage.toHaveValues(expectedValues, { timeout });

    logger.debug("✅ Input values assertion passed");
  }

  /**
   * Assert checkbox/radio is checked
   */
  static async toBeChecked(
    locator: Locator,
    options: { timeout?: number; checked?: boolean; message?: string } = {}
  ): Promise<void> {
    const { timeout = TIMEOUTS.DEFAULT, checked, message } = options;
    logger.debug(`Asserting element is checked: ${checked ?? true}`);

    const expectWithMessage = message
      ? expect(locator, message)
      : expect(locator);
    await expectWithMessage.toBeChecked({ timeout, checked });

    logger.debug("✅ Checked state assertion passed");
  }
}

/**
 * Attribute assertions
 */
export class AttributeAssertions {
  /**
   * Assert element has attribute
   */
  static async toHaveAttribute(
    locator: Locator,
    name: string,
    value?: string | RegExp,
    options: { timeout?: number; message?: string } = {}
  ): Promise<void> {
    const { timeout = TIMEOUTS.DEFAULT, message } = options;
    try {
      logger.debug(
        `Asserting element has attribute: ${name}${value ? ` = ${value}` : ""}`
      );
      if (value !== undefined) {
        await expect(locator).toHaveAttribute(name, value, { timeout });
      } else {
        await expect(locator).toHaveAttribute(name);
      }
      logger.debug("✅ Attribute assertion passed");
    } catch (_error) {
      const customMessage =
        message ??
        `Element should have attribute: ${name}${value ? ` = ${value}` : ""}`;
      logger.error(`❌ ${customMessage}: ${_error}`);
    }
  }

  /**
   * Assert element has class
   */
  static async toHaveClass(
    locator: Locator,
    expected: string | RegExp | (string | RegExp)[],
    options: { timeout?: number; message?: string } = {}
  ): Promise<void> {
    const { timeout = TIMEOUTS.DEFAULT, message } = options;
    try {
      logger.debug(`Asserting element has class: ${expected}`);
      await expect(locator).toHaveClass(expected, { timeout });
      logger.debug("✅ Class assertion passed");
    } catch (_error) {
      const customMessage = message ?? `Element should have class: ${expected}`;
      logger.error(`❌ ${customMessage}: ${_error}`);
    }
  }

  /**
   * Assert element has CSS property
   */
  static async toHaveCSS(
    locator: Locator,
    name: string,
    value: string | RegExp,
    options: { timeout?: number; message?: string } = {}
  ): Promise<void> {
    const { timeout = TIMEOUTS.DEFAULT, message } = options;
    try {
      logger.debug(`Asserting element has CSS: ${name} = ${value}`);
      await expect(locator).toHaveCSS(name, value, { timeout });
      logger.debug("✅ CSS assertion passed");
    } catch (_error) {
      const customMessage =
        message ?? `Element should have CSS: ${name} = ${value}`;
      logger.error(`❌ ${customMessage}: ${_error}`);
    }
  }

  /**
   * Assert element has ID
   */
  static async toHaveId(
    locator: Locator,
    id: string | RegExp,
    options: { timeout?: number; message?: string } = {}
  ): Promise<void> {
    const { timeout = TIMEOUTS.DEFAULT, message } = options;
    try {
      logger.debug(`Asserting element has ID: ${id}`);
      await expect(locator).toHaveId(id, { timeout });
      logger.debug("✅ ID assertion passed");
    } catch (_error) {
      const customMessage = message ?? `Element should have ID: ${id}`;
      logger.error(`❌ ${customMessage}: ${_error}`);
    }
  }
}

/**
 * Count and collection assertions
 */
export class CountAssertions {
  /**
   * Assert element count
   */
  static async toHaveCount(
    locator: Locator,
    count: number,
    options: { timeout?: number; message?: string } = {}
  ): Promise<void> {
    const { timeout = TIMEOUTS.DEFAULT, message } = options;
    try {
      logger.debug(`Asserting element count: ${count}`);
      await expect(locator).toHaveCount(count, { timeout });
      logger.debug("✅ Count assertion passed");
    } catch (_error) {
      const customMessage = message ?? `Should have ${count} elements`;
      logger.error(`❌ ${customMessage}: ${_error}`);
    }
  }

  /**
   * Assert element count is greater than
   */
  static async toHaveCountGreaterThan(
    locator: Locator,
    count: number,
    options: { timeout?: number; message?: string } = {}
  ): Promise<void> {
    const { message } = options;
    try {
      logger.debug(`Asserting element count is greater than: ${count}`);
      const actualCount = await locator.count();
      expect(actualCount).toBeGreaterThan(count);
      logger.debug("✅ Count greater than assertion passed");
    } catch (_error) {
      const customMessage =
        message ?? `Should have more than ${count} elements`;
      logger.error(`❌ ${customMessage}: ${_error}`);
    }
  }

  /**
   * Assert element count is less than
   */
  static async toHaveCountLessThan(
    locator: Locator,
    count: number,
    options: { timeout?: number; message?: string } = {}
  ): Promise<void> {
    const { message } = options;
    try {
      logger.debug(`Asserting element count is less than: ${count}`);
      const actualCount = await locator.count();
      expect(actualCount).toBeLessThan(count);
      logger.debug("✅ Count less than assertion passed");
    } catch (_error) {
      const customMessage =
        message ?? `Should have fewer than ${count} elements`;
      logger.error(`❌ ${customMessage}: ${_error}`);
    }
  }
}

/**
 * Page assertions
 */
export class PageAssertions {
  /**
   * Assert page has URL
   */
  static async toHaveURL(
    page: Page,
    url: string | RegExp,
    options: { timeout?: number; message?: string } = {}
  ): Promise<void> {
    const { timeout = TIMEOUTS.DEFAULT, message } = options;
    try {
      logger.debug(`Asserting page has URL: ${url}`);
      await expect(page).toHaveURL(url, { timeout });
      logger.debug("✅ URL assertion passed");
    } catch (_) {
      const customMessage = message ?? `Page should have URL: ${url}`;
      logger.error(`❌ ${customMessage}: Current URL: ${page.url()}`);
    }
  }

  /**
   * Assert page has title
   */
  static async toHaveTitle(
    page: Page,
    titleOrRegExp: string | RegExp,
    options: { timeout?: number; message?: string } = {}
  ): Promise<void> {
    const { timeout = TIMEOUTS.DEFAULT, message } = options;
    try {
      logger.debug(`Asserting page has title: ${titleOrRegExp}`);
      await expect(page).toHaveTitle(titleOrRegExp, { timeout });
      logger.debug("✅ Title assertion passed");
    } catch (_) {
      const customMessage =
        message ?? `Page should have title: ${titleOrRegExp}`;
      logger.error(`❌ ${customMessage}: Current title: ${await page.title()}`);
    }
  }

  /**
   * Assert URL contains text
   */
  static async toHaveURLContaining(
    page: Page,
    text: string,
    options: { timeout?: number; message?: string } = {}
  ): Promise<void> {
    const { message } = options;
    try {
      logger.debug(`Asserting URL contains: ${text}`);
      const currentUrl = page.url();

      if (!currentUrl.includes(text)) {
        // Use expect assertion instead of manual throw
        expect(currentUrl).toContain(text);
      }

      logger.debug("✅ URL contains assertion passed");
    } catch (_error) {
      const customMessage = message ?? `URL should contain: ${text}`;
      logger.error(`❌ ${customMessage}: Current URL: ${page.url()}`);
    }
  }
}

/**
 * API Response assertions
 */
export class ResponseAssertions {
  /**
   * Assert response is OK (status 200-299)
   */
  static async toBeOK(
    response: Response | APIResponse,
    options: { message?: string } = {}
  ): Promise<void> {
    const { message } = options;
    try {
      logger.debug(`Asserting response is OK: ${response.status()}`);
      expect(response.ok()).toBe(true);
      logger.debug("✅ Response OK assertion passed");
    } catch (_) {
      const customMessage = message ?? `Response should be OK`;
      logger.error(`❌ ${customMessage}: Status ${response.status()}`);
    }
  }

  /**
   * Assert response has specific status
   */
  static async toHaveStatus(
    response: Response | APIResponse,
    status: number,
    options: { message?: string } = {}
  ): Promise<void> {
    const { message } = options;
    try {
      logger.debug(`Asserting response has status: ${status}`);
      expect(response.status()).toBe(status);
      logger.debug("✅ Response status assertion passed");
    } catch (_) {
      const customMessage = message ?? `Response should have status: ${status}`;
      logger.error(`❌ ${customMessage}: Got ${response.status()}`);
    }
  }

  /**
   * Assert response contains header
   */
  static async toHaveHeader(
    response: Response | APIResponse,
    name: string,
    value?: string | RegExp,
    options: { message?: string } = {}
  ): Promise<void> {
    const { message } = options;
    try {
      logger.debug(
        `Asserting response has header: ${name}${value ? ` = ${value}` : ""}`
      );
      const headers = response.headers();
      const headerValue = headers[name.toLowerCase()];

      if (!headerValue) {
        // Use expect assertion instead of manual throw
        expect(headerValue).toBeDefined();
      }

      if (value) {
        if (typeof value === "string") {
          expect(headerValue).toBe(value);
        } else {
          expect(headerValue).toMatch(value);
        }
      }

      logger.debug("✅ Response header assertion passed");
    } catch (_error) {
      const customMessage =
        message ??
        `Response should have header: ${name}${value ? ` = ${value}` : ""}`;
      logger.error(`❌ ${customMessage}: ${_error}`);
    }
  }
}

/**
 * Screenshot assertions
 */
export class ScreenshotAssertions {
  /**
   * Assert element screenshot matches
   */
  static async toHaveScreenshot(
    locator: Locator,
    name: string | string[],
    options: {
      threshold?: number;
      maxDiffPixels?: number;
      animations?: "disabled" | "allow";
      timeout?: number;
      message?: string;
    } = {}
  ): Promise<void> {
    const { message } = options;
    try {
      logger.debug(`Asserting element screenshot matches: ${name}`);
      await expect(locator).toHaveScreenshot(name, options);
      logger.debug("✅ Screenshot assertion passed");
    } catch (_error) {
      const customMessage =
        message ?? `Element screenshot should match: ${name}`;
      logger.error(`❌ ${customMessage}: ${_error}`);
    }
  }

  /**
   * Assert page screenshot matches
   */
  static async toHavePageScreenshot(
    page: Page,
    name: string | string[],
    options: {
      fullPage?: boolean;
      clip?: { x: number; y: number; width: number; height: number };
      threshold?: number;
      maxDiffPixels?: number;
      animations?: "disabled" | "allow";
      timeout?: number;
      message?: string;
    } = {}
  ): Promise<void> {
    const { message } = options;
    try {
      logger.debug(`Asserting page screenshot matches: ${name}`);
      await expect(page).toHaveScreenshot(name, options);
      logger.debug("✅ Page screenshot assertion passed");
    } catch (_error) {
      const customMessage = message ?? `Page screenshot should match: ${name}`;
      logger.error(`❌ ${customMessage}: ${_error}`);
    }
  }
}

/**
 * Combined assertion utility class
 */
export class Assertions {
  static readonly element = ElementAssertions;
  static readonly text = TextAssertions;
  static readonly input = InputAssertions;
  static readonly attribute = AttributeAssertions;
  static readonly count = CountAssertions;
  static readonly page = PageAssertions;
  static readonly response = ResponseAssertions;
  static readonly screenshot = ScreenshotAssertions;

  /**
   * Convenience method - most common assertion
   */
  static async isVisible(
    locator: Locator,
    timeout: number = TIMEOUTS.DEFAULT,
    message?: string
  ): Promise<void> {
    await ElementAssertions.toBeVisible(locator, { timeout, message });
  }

  /**
   * Convenience method - text content assertion
   */
  static async hasText(
    locator: Locator,
    text: string | RegExp,
    timeout: number = TIMEOUTS.DEFAULT,
    message?: string
  ): Promise<void> {
    await TextAssertions.toHaveText(locator, text, { timeout, message });
  }

  /**
   * Convenience method - URL assertion
   */
  static async hasURL(
    page: Page,
    url: string | RegExp,
    timeout: number = TIMEOUTS.DEFAULT,
    message?: string
  ): Promise<void> {
    await PageAssertions.toHaveURL(page, url, { timeout, message });
  }

  /**
   * Soft assertions - don't stop test execution on failure
   */
  static async softAssert(
    assertion: () => Promise<void>,
    description: string
  ): Promise<boolean> {
    try {
      await assertion();
      return true;
    } catch (_error) {
      logger.warn(`⚠️ Soft assertion failed: ${description} - ${_error}`);
      return false;
    }
  }

  /**
   * Multiple assertions - run all and report results
   */
  static async assertAll(
    assertions: Array<{
      assertion: () => Promise<void>;
      description: string;
    }>
  ): Promise<{ passed: number; failed: number; results: boolean[] }> {
    const results: boolean[] = [];
    let passed = 0;
    let failed = 0;

    for (const { assertion, description } of assertions) {
      const result = await this.softAssert(assertion, description);
      results.push(result);
      if (result) {
        passed++;
      } else {
        failed++;
      }
    }
    return { passed, failed, results };
  }
}

// Direct assertion functions for easier use - no extra indirection
export async function expectToBeVisible(
  locator: Locator,
  options: { timeout?: number; message?: string } = {}
): Promise<void> {
  const { timeout = TIMEOUTS.ELEMENT_VISIBLE, message } = options;
  try {
    logger.debug(
      `Asserting element is visible: ${await locator.innerText().catch(() => "Unable to get text")}`
    );
    await expect(locator).toBeVisible({ timeout });
    logger.debug("✅ Element visibility assertion passed");
  } catch (_error) {
    const customMessage = message ?? `Element should be visible`;
    logger.error(`❌ ${customMessage}: ${_error}`);
  }
}

/**
 * Assert that at least one of the alternative locators is visible
 * Useful for fallback selectors like primary.or(alternative)
 */
export async function expectAlternativeLocatorToBeVisible(
  primaryLocator: Locator,
  alternativeLocator: Locator,
  options: { timeout?: number; message?: string } = {}
): Promise<void> {
  const { timeout = TIMEOUTS.ELEMENT_VISIBLE, message } = options;
  try {
    logger.debug(
      "Asserting alternative locator (primary or fallback) is visible"
    );
    await expect(primaryLocator.or(alternativeLocator)).toBeVisible({
      timeout,
    });
    logger.debug("✅ Alternative locator visibility assertion passed");
  } catch (_error) {
    const customMessage =
      message ?? `Either primary or alternative element should be visible`;
    logger.error(`❌ ${customMessage}: ${_error}`);
  }
}

export async function expectToBeHidden(
  locator: Locator,
  options: { timeout?: number; message?: string } = {}
): Promise<void> {
  const { timeout = TIMEOUTS.ELEMENT_HIDDEN, message } = options;
  try {
    logger.debug("Asserting element is hidden");
    await expect(locator).toBeHidden({ timeout });
    logger.debug("✅ Element hidden assertion passed");
  } catch (_error) {
    const customMessage = message ?? `Element should be hidden`;
    logger.error(`❌ ${customMessage}: ${_error}`);
  }
}

export async function expectToBeEnabled(
  locator: Locator,
  options: { timeout?: number; message?: string } = {}
): Promise<void> {
  const { timeout = TIMEOUTS.DEFAULT, message } = options;
  try {
    logger.debug("Asserting element is enabled");
    await expect(locator).toBeEnabled({ timeout });
    logger.debug("✅ Element enabled assertion passed");
  } catch (_error) {
    const customMessage = message ?? `Element should be enabled`;
    logger.error(`❌ ${customMessage}: ${_error}`);
  }
}

export async function expectToBeDisabled(
  locator: Locator,
  options: { timeout?: number; message?: string } = {}
): Promise<void> {
  const { timeout = TIMEOUTS.DEFAULT, message } = options;
  try {
    logger.debug("Asserting element is disabled");
    await expect(locator).toBeDisabled({ timeout });
    logger.debug("✅ Element disabled assertion passed");
  } catch (_error) {
    const customMessage = message ?? `Element should be disabled`;
    logger.error(`❌ ${customMessage}: ${_error}`);
  }
}

export async function expectToHaveText(
  locator: Locator,
  text: string | RegExp | (string | RegExp)[],
  options: { timeout?: number; ignoreCase?: boolean; message?: string } = {}
): Promise<void> {
  const { timeout = TIMEOUTS.DEFAULT, ignoreCase, message } = options;
  try {
    logger.debug(`Asserting element has text: ${text}`);
    await expect(locator).toHaveText(text, { timeout, ignoreCase });
    logger.debug("✅ Text assertion passed");
  } catch (_error) {
    const customMessage = message ?? `Element should have text: ${text}`;
    logger.error(`❌ ${customMessage}: ${_error}`);
  }
}

export async function expectToContainText(
  locator: Locator,
  text: string | RegExp | (string | RegExp)[],
  options: { timeout?: number; ignoreCase?: boolean; message?: string } = {}
): Promise<void> {
  const { timeout = TIMEOUTS.DEFAULT, ignoreCase, message } = options;
  try {
    logger.debug(`Asserting element contains text: ${text}`);
    await expect(locator).toContainText(text, { timeout, ignoreCase });
    logger.debug("✅ Contains text assertion passed");
  } catch (_error) {
    const customMessage = message ?? `Element should contain text: ${text}`;
    logger.error(`❌ ${customMessage}: ${_error}`);
  }
}

export async function expectToHaveValue(
  locator: Locator,
  value: string | RegExp,
  options: { timeout?: number; message?: string } = {}
): Promise<void> {
  const { timeout = TIMEOUTS.DEFAULT, message } = options;
  try {
    logger.debug(`Asserting input has value: ${value}`);
    await expect(locator).toHaveValue(value, { timeout });
    logger.debug("✅ Input value assertion passed");
  } catch (_error) {
    const customMessage = message ?? `Input should have value: ${value}`;
    logger.error(`❌ ${customMessage}: ${_error}`);
  }
}

export async function expectToBeChecked(
  locator: Locator,
  options: { timeout?: number; checked?: boolean; message?: string } = {}
): Promise<void> {
  const { timeout = TIMEOUTS.DEFAULT, checked, message } = options;
  try {
    logger.debug(`Asserting element is checked: ${checked ?? true}`);
    await expect(locator).toBeChecked({ timeout, checked });
    logger.debug("✅ Checked state assertion passed");
  } catch (_error) {
    const customMessage =
      message ?? `Element should be ${checked ? "checked" : "unchecked"}`;
    logger.error(`❌ ${customMessage}: ${_error}`);
  }
}

export async function expectToHaveAttribute(
  locator: Locator,
  name: string,
  value?: string | RegExp,
  options: { timeout?: number; message?: string } = {}
): Promise<void> {
  const { timeout = TIMEOUTS.DEFAULT, message } = options;
  try {
    logger.debug(
      `Asserting element has attribute: ${name}${value ? ` = ${value}` : ""}`
    );
    if (value !== undefined) {
      await expect(locator).toHaveAttribute(name, value, { timeout });
    } else {
      await expect(locator).toHaveAttribute(name);
    }
    logger.debug("✅ Attribute assertion passed");
  } catch (_error) {
    const customMessage =
      message ??
      `Element should have attribute: ${name}${value ? ` = ${value}` : ""}`;
    logger.error(`❌ ${customMessage}: ${_error}`);
  }
}

export async function expectToHaveClass(
  locator: Locator,
  className: string | RegExp | (string | RegExp)[],
  options: { timeout?: number; message?: string } = {}
): Promise<void> {
  const { timeout = TIMEOUTS.DEFAULT, message } = options;
  try {
    logger.debug(`Asserting element has class: ${className}`);
    await expect(locator).toHaveClass(className, { timeout });
    logger.debug("✅ Class assertion passed");
  } catch (_error) {
    const customMessage = message ?? `Element should have class: ${className}`;
    logger.error(`❌ ${customMessage}: ${_error}`);
  }
}

export async function expectToHaveCount(
  locator: Locator,
  count: number,
  options: { timeout?: number; message?: string } = {}
): Promise<void> {
  const { timeout = TIMEOUTS.DEFAULT, message } = options;
  try {
    logger.debug(`Asserting element count: ${count}`);
    await expect(locator).toHaveCount(count, { timeout });
    logger.debug("✅ Count assertion passed");
  } catch (_error) {
    const customMessage = message ?? `Should have ${count} elements`;
    logger.error(`❌ ${customMessage}: ${_error}`);
  }
}

export async function expectPageToHaveURL(
  page: Page,
  url: string | RegExp,
  options: { timeout?: number; message?: string } = {}
): Promise<void> {
  const { timeout = TIMEOUTS.DEFAULT, message } = options;
  try {
    logger.debug(`Asserting page has URL: ${url}`);
    await expect(page).toHaveURL(url, { timeout });
    logger.debug("✅ URL assertion passed");
  } catch (_error) {
    const customMessage = message ?? `Page should have URL: ${url}`;
    logger.error(`❌ ${customMessage}: Current URL: ${page.url()}`);
  }
}

export async function expectPageToHaveTitle(
  page: Page,
  title: string | RegExp,
  options: { timeout?: number; message?: string } = {}
): Promise<void> {
  const { timeout = TIMEOUTS.DEFAULT, message } = options;
  try {
    logger.debug(`Asserting page has title: ${title}`);
    await expect(page).toHaveTitle(title, { timeout });
    logger.debug("✅ Title assertion passed");
  } catch (_error) {
    const customMessage = message ?? `Page should have title: ${title}`;
    logger.error(`❌ ${customMessage}: Current title: ${await page.title()}`);
  }
}

export async function expectResponseToBeOK(
  response: Response | APIResponse,
  options: { message?: string } = {}
): Promise<void> {
  const { message } = options;
  try {
    logger.debug(`Asserting response is OK: ${response.status()}`);
    expect(response.ok()).toBe(true);
    logger.debug("✅ Response OK assertion passed");
  } catch (_error) {
    const customMessage = message ?? `Response should be OK`;
    logger.error(`❌ ${customMessage}: Status ${response.status()}`);
  }
}

export async function expectResponseToHaveStatus(
  response: Response | APIResponse,
  status: number,
  options: { message?: string } = {}
): Promise<void> {
  const { message } = options;
  try {
    logger.debug(`Asserting response has status: ${status}`);
    expect(response.status()).toBe(status);
    logger.debug("✅ Response status assertion passed");
  } catch (_error) {
    const customMessage = message ?? `Response should have status: ${status}`;
    logger.error(`❌ ${customMessage}: Got ${response.status()}`);
  }
}

export async function expectResponseStatusToBeLessThan(
  response: Response | APIResponse,
  status: number,
  options: { message?: string } = {}
): Promise<void> {
  const { message } = options;
  try {
    logger.debug(`Asserting response status is less than: ${status}`);
    expect(response.status()).toBeLessThan(status);
    logger.debug("✅ Response status less than assertion passed");
  } catch (_error) {
    const customMessage =
      message ?? `Response status should be less than ${status}`;
    logger.error(`❌ ${customMessage}: Got ${response.status()}`);
  }
}

export async function expectResponseStatusToBeOneOf(
  response: Response | APIResponse,
  statuses: number[],
  options: { message?: string } = {}
): Promise<void> {
  const { message } = options;
  try {
    logger.debug(`Asserting response status is one of: ${statuses.join(", ")}`);
    expect(statuses).toContain(response.status());
    logger.debug("✅ Response status in allowed list assertion passed");
  } catch (_error) {
    const customMessage =
      message ?? `Response status should be one of [${statuses.join(", ")}]`;
    logger.error(`❌ ${customMessage}: Got ${response.status()}`);
  }
}

export async function expectToBeArray(
  value: any,
  options: { message?: string } = {}
): Promise<void> {
  const { message } = options;
  try {
    logger.debug(`Asserting value is an array`);
    expect(Array.isArray(value)).toBeTruthy();
    logger.debug("✅ Array assertion passed");
  } catch (_error) {
    const customMessage = message ?? `Value should be an array`;
    logger.error(`❌ ${customMessage}: Got ${typeof value}`);
  }
}

export async function expectToBeArrayWithLength(
  value: any,
  length: number,
  options: { message?: string } = {}
): Promise<void> {
  const { message } = options;
  try {
    logger.debug(`Asserting value is an array with length ${length}`);
    expect(Array.isArray(value)).toBeTruthy();
    expect(value.length).toBe(length);
    logger.debug("✅ Array with length assertion passed");
  } catch (_error) {
    const customMessage =
      message ?? `Value should be an array with length ${length}`;
    logger.error(
      `❌ ${customMessage}: Got ${Array.isArray(value) ? `array with length ${value.length}` : typeof value}`
    );
  }
}

export async function expectToBeTruthy(
  value: any,
  options: { message?: string } = {}
): Promise<void> {
  const { message } = options;
  try {
    logger.debug(`Asserting value is truthy`);
    expect(value).toBeTruthy();
    logger.debug("✅ Truthy assertion passed");
  } catch (_error) {
    const customMessage = message ?? `Value should be truthy`;
    logger.error(`❌ ${customMessage}: Got ${value}`);
  }
}

export async function expectToBeFalsy(
  value: any,
  options: { message?: string } = {}
): Promise<void> {
  const { message } = options;
  try {
    logger.debug(`Asserting value is falsy`);
    expect(value).toBeFalsy();
    logger.debug("✅ Falsy assertion passed");
  } catch (_error) {
    const customMessage = message ?? `Value should be falsy`;
    logger.error(`❌ ${customMessage}: Got ${value}`);
  }
}

export async function expectToBeNull(
  value: any,
  options: { message?: string } = {}
): Promise<void> {
  const { message } = options;
  try {
    logger.debug(`Asserting value is null`);
    expect(value).toBeNull();
    logger.debug("✅ Null assertion passed");
  } catch (_error) {
    const customMessage = message ?? `Value should be null`;
    logger.error(`❌ ${customMessage}: Got ${value}`);
  }
}

export async function expectNotToBeNull(
  value: any,
  options: { message?: string } = {}
): Promise<void> {
  const { message } = options;
  try {
    logger.debug(`Asserting value is not null`);
    expect(value).not.toBeNull();
    logger.debug("✅ Not null assertion passed");
  } catch (_error) {
    const customMessage = message ?? `Value should not be null`;
    logger.error(`❌ ${customMessage}: Got ${value}`);
  }
}

export async function expectToBeGreaterThan(
  value: number,
  threshold: number,
  options: { message?: string } = {}
): Promise<void> {
  const { message } = options;
  try {
    logger.debug(`Asserting ${value} is greater than ${threshold}`);
    expect(value).toBeGreaterThan(threshold);
    logger.debug("✅ Greater than assertion passed");
  } catch (_error) {
    const customMessage =
      message ?? `Value should be greater than ${threshold}`;
    logger.error(`❌ ${customMessage}: Got ${value}`);
  }
}

export async function expectToBeGreaterThanOrEqual(
  value: number,
  threshold: number,
  options: { message?: string } = {}
): Promise<void> {
  const { message } = options;
  try {
    logger.debug(`Asserting ${value} is greater than or equal to ${threshold}`);
    expect(value).toBeGreaterThanOrEqual(threshold);
    logger.debug("✅ Greater than or equal assertion passed");
  } catch (_error) {
    const customMessage =
      message ?? `Value should be greater than or equal to ${threshold}`;
    logger.error(`❌ ${customMessage}: Got ${value}`);
  }
}

export async function expectToBeLessThan(
  value: number,
  threshold: number,
  options: { message?: string } = {}
): Promise<void> {
  const { message } = options;
  try {
    logger.debug(`Asserting ${value} is less than ${threshold}`);
    expect(value).toBeLessThan(threshold);
    logger.debug("✅ Less than assertion passed");
  } catch (_error) {
    const customMessage = message ?? `Value should be less than ${threshold}`;
    logger.error(`❌ ${customMessage}: Got ${value}`);
  }
}

export async function expectToBeInstanceOf(
  value: any,
  constructor: any,
  options: { message?: string } = {}
): Promise<void> {
  const { message } = options;
  try {
    logger.debug(`Asserting value is instance of ${constructor.name}`);
    expect(value).toBeInstanceOf(constructor);
    logger.debug("✅ Instance of assertion passed");
  } catch (_error) {
    const customMessage =
      message ?? `Value should be instance of ${constructor.name}`;
    logger.error(`❌ ${customMessage}: Got ${typeof value}`);
  }
}

export async function expectArrayToContain(
  array: any[],
  value: any,
  options: { message?: string } = {}
): Promise<void> {
  const { message } = options;
  try {
    logger.debug(`Asserting array contains value: ${value}`);
    expect(array).toContain(value);
    logger.debug("✅ Array contains assertion passed");
  } catch (_error) {
    const customMessage = message ?? `Array should contain: ${value}`;
    logger.error(`❌ ${customMessage}: Array: ${JSON.stringify(array)}`);
  }
}

export async function expectToEqual(
  actual: any,
  expected: any,
  options: { message?: string } = {}
): Promise<void> {
  const { message } = options;
  try {
    logger.debug(`Asserting ${actual} equals ${expected}`);
    expect(actual).toBe(expected);
    logger.debug("✅ Equality assertion passed");
  } catch (_error) {
    const customMessage = message ?? `Expected ${expected}, but got ${actual}`;
    logger.error(`❌ ${customMessage}`);
  }
}

// Default export for easy usage
export default Assertions;
