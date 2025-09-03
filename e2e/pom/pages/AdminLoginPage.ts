import { TIMEOUTS, getProtectedPaths } from "@/data/constants";
import { PAGE_OBJECT_MESSAGES } from "@/data/logger-messages";
import { Locator, Page } from "@playwright/test";
import { logger, TestConfig } from "@utils/core.utils";
import {
  expectAlternativeLocatorToBeVisible,
  expectPageToHaveURL,
  expectToBeVisible,
} from "@utils/expect";
import { BasePage } from "./BasePage";

/**
 * Admin Login Page Object Model
 * Extends BasePage with login-specific functionality
 */
export class AdminLoginPage extends BasePage {
  // Page elements
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly submitButton: Locator;
  readonly errorMessage: Locator;
  readonly forgotPasswordLink: Locator;
  readonly loginForm: Locator;
  readonly loginTitle: Locator;

  // Alternative selectors for different implementations
  readonly emailInputAlt: Locator;
  readonly passwordInputAlt: Locator;
  readonly submitButtonAlt: Locator;

  constructor(page: Page) {
    super(page);

    // Initialize page elements
    this.emailInput = page.getByLabel(/email/i);
    this.passwordInput = page.getByLabel(/password/i);
    this.submitButton = page.getByRole("button", {
      name: /log in|sign in|anmelden/i,
    });
    this.errorMessage = page.getByText(/invalid|fehler|unauthorized/i);
    this.forgotPasswordLink = page.getByText(
      /forgot.*password|passwort.*vergessen/i
    );
    this.loginForm = page.locator('form, [data-testid="login-form"]');
    this.loginTitle = page.getByRole("heading", { name: /login|anmelden/i });

    // Alternative selectors for different implementations
    this.emailInputAlt = page.locator(
      'input[name="email"], input[type="email"]'
    );
    this.passwordInputAlt = page.locator(
      'input[name="password"], input[type="password"]'
    );
    this.submitButtonAlt = page.locator(
      'button[type="submit"], input[type="submit"]'
    );
  }

  /**
   * Navigation methods
   */
  async gotoLogin(): Promise<void> {
    const protectedPaths = getProtectedPaths();
    await this.goto(protectedPaths.PROTECTED_LOGIN);
    await this.assertPageLoaded();
  }

  /**
   * Login methods
   */
  async login(
    email: string,
    password: string,
    options: {
      waitForRedirect?: boolean;
      expectedRedirectUrl?: string;
      timeout?: number;
    } = {}
  ): Promise<void> {
    const {
      waitForRedirect = true,
      expectedRedirectUrl = "/admin/dashboard",
      timeout = TIMEOUTS.LONG,
    } = options;

    // Try primary selectors first, fall back to alternatives
    try {
      await this.safeFill(this.emailInput, email);
      await this.safeFill(this.passwordInput, password);
      await this.safeClick(this.submitButton);
    } catch (_error) {
      logger.warn(PAGE_OBJECT_MESSAGES.ADMIN_LOGIN.PRIMARY_SELECTORS_FAILED);
      await this.safeFill(this.emailInputAlt, email);
      await this.safeFill(this.passwordInputAlt, password);
      await this.safeClick(this.submitButtonAlt);
    }

    if (waitForRedirect) {
      await this.waitForUrl(`**${expectedRedirectUrl}*`, timeout);
    }
  }

  async loginAsAdmin(
    options: {
      waitForRedirect?: boolean;
      expectedRedirectUrl?: string;
      timeout?: number;
    } = {}
  ): Promise<void> {
    const credentials = TestConfig.adminCredentials;
    await this.login(credentials.email, credentials.password, options);
  }

  async loginWithCredentials(
    credentials: { email: string; password: string },
    options: {
      waitForRedirect?: boolean;
      expectedRedirectUrl?: string;
      timeout?: number;
    } = {}
  ): Promise<void> {
    await this.login(credentials.email, credentials.password, options);
  }

  async attemptInvalidLogin(email: string, password: string): Promise<void> {
    try {
      await this.safeFill(this.emailInput, email);
      await this.safeFill(this.passwordInput, password);
      await this.safeClick(this.submitButton);
    } catch {
      // Use alternative selectors if primary fail
      await this.safeFill(this.emailInputAlt, email);
      await this.safeFill(this.passwordInputAlt, password);
      await this.safeClick(this.submitButtonAlt);
    }

    // Don't wait for redirect on invalid login
    await this.page.waitForTimeout(TIMEOUTS.SHORT);
  }

  /**
   * Form interaction methods
   */
  async clearForm(): Promise<void> {
    try {
      await this.emailInput.clear();
      await this.passwordInput.clear();
    } catch {
      await this.emailInputAlt.clear();
      await this.passwordInputAlt.clear();
    }
  }

  async fillEmail(email: string): Promise<void> {
    try {
      await this.safeFill(this.emailInput, email);
    } catch {
      await this.safeFill(this.emailInputAlt, email);
    }
  }

  async fillPassword(password: string): Promise<void> {
    try {
      await this.safeFill(this.passwordInput, password);
    } catch {
      await this.safeFill(this.passwordInputAlt, password);
    }
  }

  async submitLoginForm(): Promise<void> {
    try {
      await this.safeClick(this.submitButton);
    } catch {
      await this.safeClick(this.submitButtonAlt);
    }
  }

  /**
   * Assertion methods
   */
  async assertPageLoaded(): Promise<void> {
    // Use expect methods from expect.ts
    await expectAlternativeLocatorToBeVisible(
      this.emailInput,
      this.emailInputAlt,
      {
        message: "Email input not found on login page",
      }
    );
    await expectAlternativeLocatorToBeVisible(
      this.passwordInput,
      this.passwordInputAlt,
      {
        message: "Password input not found on login page",
      }
    );
    await expectAlternativeLocatorToBeVisible(
      this.submitButton,
      this.submitButtonAlt,
      {
        message: "Submit button not found on login page",
      }
    );

    // Verify URL
    await expectPageToHaveURL(this.page, /\/admin\/login/);
  }

  async assertLoginError(): Promise<void> {
    await expectToBeVisible(this.errorMessage, { timeout: TIMEOUTS.DEFAULT });
  }

  async assertLoginSuccess(): Promise<void> {
    // Should be redirected away from login page
    await this.waitForUrl("**/admin/dashboard*", TIMEOUTS.LONG);
    await expectPageToHaveURL(this.page, /\/admin\/dashboard/);
  }

  async assertFormValidation(field: "email" | "password"): Promise<void> {
    // Look for validation messages near the field
    const validationMessage = this.page
      .locator(`[data-testid="${field}-error"], .error, .invalid-feedback`)
      .first();
    await expectToBeVisible(validationMessage, { timeout: TIMEOUTS.SHORT });
  }

  /**
   * Helper methods for different login scenarios
   */
  async performCompleteLogin(email?: string, password?: string): Promise<void> {
    await this.gotoLogin();

    if (email && password) {
      await this.login(email, password);
    } else {
      await this.loginAsAdmin();
    }
  }

  async testLoginValidation(): Promise<void> {
    await this.gotoLogin();

    // Test empty form submission
    await this.submitLoginForm();

    // Check if validation messages appear
    await this.assertFormValidation("email");
    await this.assertFormValidation("password");
  }

  /**
   * Utility methods
   */
  async getLoginFormData(): Promise<{ email: string; password: string }> {
    const email = await this.getElementValue(
      this.emailInput.or(this.emailInputAlt)
    );
    const password = await this.getElementValue(
      this.passwordInput.or(this.passwordInputAlt)
    );

    return { email, password };
  }

  async isLoginFormVisible(): Promise<boolean> {
    const emailVisible =
      (await this.isElementVisible(this.emailInput)) ||
      (await this.isElementVisible(this.emailInputAlt));
    const passwordVisible =
      (await this.isElementVisible(this.passwordInput)) ||
      (await this.isElementVisible(this.passwordInputAlt));
    const submitVisible =
      (await this.isElementVisible(this.submitButton)) ||
      (await this.isElementVisible(this.submitButtonAlt));

    return emailVisible && passwordVisible && submitVisible;
  }

  async clickForgotPassword(): Promise<void> {
    if (await this.isElementVisible(this.forgotPasswordLink)) {
      await this.safeClick(this.forgotPasswordLink);
    } else {
      logger.warn(PAGE_OBJECT_MESSAGES.ADMIN_LOGIN.FORGOT_PASSWORD_NOT_FOUND);
    }
  }
}
