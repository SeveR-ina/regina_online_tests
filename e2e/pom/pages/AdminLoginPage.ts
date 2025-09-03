import { getProtectedPaths, TIMEOUTS } from "@/data/constants";
import { PAGE_OBJECT_MESSAGES } from "@/data/logger-messages";
import { Locator, Page } from "@playwright/test";
import { logger, TestConfig } from "@utils/core.utils";
import { expectPageToHaveURL, expectToBeVisible } from "@utils/expect";
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

  constructor(page: Page) {
    super(page);

    // Initialize page elements - use specific test IDs from HTML structure
    this.emailInput = page.getByTestId("admin-login-email-input");
    this.passwordInput = page.getByTestId("admin-login-password-input");
    this.submitButton = page.getByTestId("admin-login-submit-button");
    this.errorMessage = page.getByText(/invalid|fehler|unauthorized/i);
    this.forgotPasswordLink = page.getByText(
      /forgot.*password|passwort.*vergessen/i
    );
    this.loginForm = page.getByTestId("admin-login-form");
    this.loginTitle = page.getByRole("heading", { name: /login|anmelden/i });
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

    await this.safeFill(this.emailInput, email);
    await this.safeFill(this.passwordInput, password);
    await this.safeClick(this.submitButton);

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
    await this.safeFill(this.emailInput, email);
    await this.safeFill(this.passwordInput, password);
    await this.safeClick(this.submitButton);

    // Don't wait for redirect on invalid login
    await this.page.waitForTimeout(TIMEOUTS.SHORT);
  }

  /**
   * Form interaction methods
   */
  async clearForm(): Promise<void> {
    await this.emailInput.clear();
    await this.passwordInput.clear();
  }

  async fillEmail(email: string): Promise<void> {
    await this.safeFill(this.emailInput, email);
  }

  async fillPassword(password: string): Promise<void> {
    await this.safeFill(this.passwordInput, password);
  }

  async submitLoginForm(): Promise<void> {
    await this.safeClick(this.submitButton);
  }

  /**
   * Assertion methods
   */
  async assertPageLoaded(): Promise<void> {
    // Use specific test-id selectors for reliable assertions
    await expectToBeVisible(this.emailInput, {
      message: "Email input not found on login page",
    });
    await expectToBeVisible(this.passwordInput, {
      message: "Password input not found on login page",
    });
    // Submit button exists but may be disabled initially - just check it's present
    await this.submitButton.waitFor({ state: 'attached', timeout: TIMEOUTS.DEFAULT });

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
    const email = await this.getElementValue(this.emailInput);
    const password = await this.getElementValue(this.passwordInput);

    return { email, password };
  }

  async isLoginFormVisible(): Promise<boolean> {
    const emailVisible = await this.isElementVisible(this.emailInput);
    const passwordVisible = await this.isElementVisible(this.passwordInput);
    const submitVisible = await this.isElementVisible(this.submitButton);
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
