import { TIMEOUTS, getProtectedPaths } from "@/data/constants";
import { Locator, Page } from "@playwright/test";
import { expectToBeGreaterThan, expectToBeVisible } from "@utils/expect";
import { BasePage } from "./BasePage";

/**
 * Page Object Model for the Admin Security Settings Page
 * Extends BasePage with security management functionality
 */
export class AdminSecurityPage extends BasePage {
  // Page sections
  readonly securitySection: Locator;
  readonly passwordSection: Locator;
  readonly twoFactorSection: Locator;
  readonly sessionSection: Locator;
  readonly accessLogsSection: Locator;

  // Password management
  readonly currentPasswordInput: Locator;
  readonly newPasswordInput: Locator;
  readonly confirmPasswordInput: Locator;
  readonly changePasswordButton: Locator;
  readonly passwordStrengthIndicator: Locator;

  // Two-factor authentication
  readonly twoFactorToggle: Locator;
  readonly qrCode: Locator;
  readonly verificationCodeInput: Locator;
  readonly enableTwoFactorButton: Locator;
  readonly disableTwoFactorButton: Locator;
  readonly backupCodesButton: Locator;
  readonly regenerateCodesButton: Locator;

  // Session management
  readonly activeSessionsList: Locator;
  readonly sessionItem: Locator;
  readonly currentSession: Locator;
  readonly sessionDevice: Locator;
  readonly sessionLocation: Locator;
  readonly sessionLastActive: Locator;
  readonly revokeSessionButton: Locator;
  readonly revokeAllSessionsButton: Locator;

  // Security settings
  readonly loginNotificationsToggle: Locator;
  readonly passwordExpirySelect: Locator;
  readonly sessionTimeoutSelect: Locator;
  readonly ipWhitelistInput: Locator;
  readonly addIpButton: Locator;
  readonly removeIpButton: Locator;

  // Access logs
  readonly accessLogsList: Locator;
  readonly logEntry: Locator;
  readonly logTimestamp: Locator;
  readonly logAction: Locator;
  readonly logIpAddress: Locator;
  readonly logUserAgent: Locator;
  readonly logStatus: Locator;

  // Filters and controls
  readonly dateFromInput: Locator;
  readonly dateToInput: Locator;
  readonly actionFilter: Locator;
  readonly statusFilter: Locator;
  readonly applyFiltersButton: Locator;
  readonly clearFiltersButton: Locator;
  readonly exportLogsButton: Locator;

  // Notifications and messages
  readonly successMessage: Locator;
  readonly errorMessage: Locator;
  readonly warningMessage: Locator;

  constructor(page: Page) {
    super(page);

    // Initialize page sections
    this.securitySection = page.locator('[data-testid="security-section"]');
    this.passwordSection = page.locator('[data-testid="password-section"]');
    this.twoFactorSection = page.locator('[data-testid="two-factor-section"]');
    this.sessionSection = page.locator('[data-testid="session-section"]');
    this.accessLogsSection = page.locator(
      '[data-testid="access-logs-section"]'
    );

    // Initialize password management
    this.currentPasswordInput = page.locator(
      '[data-testid="current-password-input"]'
    );
    this.newPasswordInput = page.locator('[data-testid="new-password-input"]');
    this.confirmPasswordInput = page.locator(
      '[data-testid="confirm-password-input"]'
    );
    this.changePasswordButton = page.locator(
      '[data-testid="change-password-button"]'
    );
    this.passwordStrengthIndicator = page.locator(
      '[data-testid="password-strength-indicator"]'
    );

    // Initialize two-factor authentication
    this.twoFactorToggle = page.locator('[data-testid="two-factor-toggle"]');
    this.qrCode = page.locator('[data-testid="two-factor-qr-code"]');
    this.verificationCodeInput = page.locator(
      '[data-testid="verification-code-input"]'
    );
    this.enableTwoFactorButton = page.locator(
      '[data-testid="enable-two-factor-button"]'
    );
    this.disableTwoFactorButton = page.locator(
      '[data-testid="disable-two-factor-button"]'
    );
    this.backupCodesButton = page.locator(
      '[data-testid="backup-codes-button"]'
    );
    this.regenerateCodesButton = page.locator(
      '[data-testid="regenerate-codes-button"]'
    );

    // Initialize session management
    this.activeSessionsList = page.locator(
      '[data-testid="active-sessions-list"]'
    );
    this.sessionItem = page.locator('[data-testid="session-item"]');
    this.currentSession = page.locator('[data-testid="current-session"]');
    this.sessionDevice = page.locator('[data-testid="session-device"]');
    this.sessionLocation = page.locator('[data-testid="session-location"]');
    this.sessionLastActive = page.locator(
      '[data-testid="session-last-active"]'
    );
    this.revokeSessionButton = page.locator(
      '[data-testid="revoke-session-button"]'
    );
    this.revokeAllSessionsButton = page.locator(
      '[data-testid="revoke-all-sessions-button"]'
    );

    // Initialize security settings
    this.loginNotificationsToggle = page.locator(
      '[data-testid="login-notifications-toggle"]'
    );
    this.passwordExpirySelect = page.locator(
      '[data-testid="password-expiry-select"]'
    );
    this.sessionTimeoutSelect = page.locator(
      '[data-testid="session-timeout-select"]'
    );
    this.ipWhitelistInput = page.locator('[data-testid="ip-whitelist-input"]');
    this.addIpButton = page.locator('[data-testid="add-ip-button"]');
    this.removeIpButton = page.locator('[data-testid="remove-ip-button"]');

    // Initialize access logs
    this.accessLogsList = page.locator('[data-testid="access-logs-list"]');
    this.logEntry = page.locator('[data-testid="log-entry"]');
    this.logTimestamp = page.locator('[data-testid="log-timestamp"]');
    this.logAction = page.locator('[data-testid="log-action"]');
    this.logIpAddress = page.locator('[data-testid="log-ip-address"]');
    this.logUserAgent = page.locator('[data-testid="log-user-agent"]');
    this.logStatus = page.locator('[data-testid="log-status"]');

    // Initialize filters and controls
    this.dateFromInput = page.locator('[data-testid="date-from-input"]');
    this.dateToInput = page.locator('[data-testid="date-to-input"]');
    this.actionFilter = page.locator('[data-testid="action-filter"]');
    this.statusFilter = page.locator('[data-testid="status-filter"]');
    this.applyFiltersButton = page.locator(
      '[data-testid="apply-filters-button"]'
    );
    this.clearFiltersButton = page.locator(
      '[data-testid="clear-filters-button"]'
    );
    this.exportLogsButton = page.locator('[data-testid="export-logs-button"]');

    // Initialize notifications and messages
    this.successMessage = page.locator('[data-testid="success-message"]');
    this.errorMessage = page.locator('[data-testid="error-message"]');
    this.warningMessage = page.locator('[data-testid="warning-message"]');
  }

  /**
   * Navigation methods
   */
  async gotoSecuritySettings(): Promise<void> {
    const protectedPaths = getProtectedPaths();
    await this.goto(protectedPaths.PROTECTED_SECURITY);
    await this.assertPageLoaded();
  }

  /**
   * Password management methods
   */
  async changePassword(
    currentPassword: string,
    newPassword: string
  ): Promise<void> {
    await this.safeFill(this.currentPasswordInput, currentPassword);
    await this.safeFill(this.newPasswordInput, newPassword);
    await this.safeFill(this.confirmPasswordInput, newPassword);

    await this.safeClick(this.changePasswordButton);
    await this.waitForSuccessMessage();
  }

  async getPasswordStrength(): Promise<string> {
    return await this.getElementText(this.passwordStrengthIndicator);
  }

  /**
   * Two-factor authentication methods
   */
  async enableTwoFactor(verificationCode: string): Promise<void> {
    await this.safeClick(this.twoFactorToggle);
    await expectToBeVisible(this.qrCode);
    await this.safeFill(this.verificationCodeInput, verificationCode);
    await this.safeClick(this.enableTwoFactorButton);
    await this.waitForSuccessMessage();
  }

  async disableTwoFactor(verificationCode: string): Promise<void> {
    await this.safeFill(this.verificationCodeInput, verificationCode);
    await this.safeClick(this.disableTwoFactorButton);
    await this.waitForSuccessMessage();
  }

  async generateBackupCodes(): Promise<void> {
    await this.safeClick(this.backupCodesButton);
  }

  /**
   * Session management methods
   */
  async getActiveSessionsCount(): Promise<number> {
    return await this.getElementCount(this.sessionItem);
  }

  async revokeSession(sessionIndex: number = 0): Promise<void> {
    const revokeButtons = await this.revokeSessionButton.all();
    if (revokeButtons[sessionIndex]) {
      await this.safeClick(revokeButtons[sessionIndex]);
      await this.handleDialog("accept", "revoke");
    }
  }

  async revokeAllSessions(): Promise<void> {
    await this.safeClick(this.revokeAllSessionsButton);
    await this.handleDialog("accept", "revoke all");
  }

  async getAllSessionInfo(): Promise<
    Array<{
      device?: string;
      location?: string;
      lastActive?: string;
      isCurrent?: boolean;
    }>
  > {
    const sessions = [];
    const sessionElements = await this.sessionItem.all();

    for (let i = 0; i < sessionElements.length; i++) {
      const session = sessionElements[i];
      const device = await this.getElementText(
        session.locator('[data-testid="session-device"]')
      );
      const location = await this.getElementText(
        session.locator('[data-testid="session-location"]')
      );
      const lastActive = await this.getElementText(
        session.locator('[data-testid="session-last-active"]')
      );
      const isCurrent = await session
        .locator('[data-testid="current-session"]')
        .isVisible();

      sessions.push({ device, location, lastActive, isCurrent });
    }

    return sessions;
  }

  /**
   * Security settings methods
   */
  async toggleLoginNotifications(): Promise<void> {
    await this.safeClick(this.loginNotificationsToggle);
  }

  async addIpToWhitelist(ipAddress: string): Promise<void> {
    await this.safeFill(this.ipWhitelistInput, ipAddress);
    await this.safeClick(this.addIpButton);
  }

  async removeIpFromWhitelist(ipIndex: number = 0): Promise<void> {
    const removeButtons = await this.removeIpButton.all();
    if (removeButtons[ipIndex]) {
      await this.safeClick(removeButtons[ipIndex]);
    }
  }

  /**
   * Access logs methods
   */
  async getAccessLogsCount(): Promise<number> {
    return await this.getElementCount(this.logEntry);
  }

  async filterLogsByDateRange(fromDate: string, toDate: string): Promise<void> {
    await this.safeFill(this.dateFromInput, fromDate);
    await this.safeFill(this.dateToInput, toDate);
    await this.safeClick(this.applyFiltersButton);
  }

  async filterLogsByAction(
    action: "login" | "logout" | "failed-login" | "password-change"
  ): Promise<void> {
    await this.safeSelectOption(this.actionFilter, action);
    await this.safeClick(this.applyFiltersButton);
  }

  async filterLogsByStatus(
    status: "success" | "failed" | "blocked"
  ): Promise<void> {
    await this.safeSelectOption(this.statusFilter, status);
    await this.safeClick(this.applyFiltersButton);
  }

  async clearAllFilters(): Promise<void> {
    await this.safeClick(this.clearFiltersButton);
  }

  async exportAccessLogs(): Promise<void> {
    await this.safeClick(this.exportLogsButton);
  }

  async getRecentLogEntries(count: number = 5): Promise<
    Array<{
      timestamp?: string;
      action?: string;
      ipAddress?: string;
      userAgent?: string;
      status?: string;
    }>
  > {
    const logs = [];
    const logElements = await this.logEntry.all();
    const maxEntries = Math.min(count, logElements.length);

    for (let i = 0; i < maxEntries; i++) {
      const logElement = logElements[i];
      const timestamp = await this.getElementText(
        logElement.locator('[data-testid="log-timestamp"]')
      );
      const action = await this.getElementText(
        logElement.locator('[data-testid="log-action"]')
      );
      const ipAddress = await this.getElementText(
        logElement.locator('[data-testid="log-ip-address"]')
      );
      const userAgent = await this.getElementText(
        logElement.locator('[data-testid="log-user-agent"]')
      );
      const status = await this.getElementText(
        logElement.locator('[data-testid="log-status"]')
      );

      logs.push({ timestamp, action, ipAddress, userAgent, status });
    }

    return logs;
  }

  /**
   * Validation and helper methods
   */
  async waitForSuccessMessage(): Promise<void> {
    await expectToBeVisible(this.successMessage, { timeout: TIMEOUTS.DEFAULT });
  }

  async waitForErrorMessage(): Promise<void> {
    await expectToBeVisible(this.errorMessage, { timeout: TIMEOUTS.DEFAULT });
  }

  async waitForWarningMessage(): Promise<void> {
    await expectToBeVisible(this.warningMessage, { timeout: TIMEOUTS.DEFAULT });
  }

  /**
   * Assertion methods (implements BasePage abstract method)
   */
  async assertPageLoaded(): Promise<void> {
    await expectToBeVisible(this.securitySection);
  }

  async assertSessionSection(): Promise<void> {
    await expectToBeVisible(this.sessionSection);
    await expectToBeVisible(this.activeSessionsList);

    const sessionsCount = await this.getActiveSessionsCount();
    await expectToBeGreaterThan(sessionsCount, 0, {
      message: "No active sessions found",
    });
  }

  async assertAccessLogsSection(): Promise<void> {
    const logsSection = this.accessLogsSection;
    if (await this.isElementVisible(logsSection)) {
      await expectToBeVisible(logsSection);
      await expectToBeVisible(this.accessLogsList);
    }
  }

  async assertSecurityControls(): Promise<void> {
    const loginNotifications = this.loginNotificationsToggle;
    if (await this.isElementVisible(loginNotifications)) {
      await expectToBeVisible(loginNotifications);
    }

    const passwordExpiry = this.passwordExpirySelect;
    if (await this.isElementVisible(passwordExpiry)) {
      await expectToBeVisible(passwordExpiry);
    }

    const sessionTimeout = this.sessionTimeoutSelect;
    if (await this.isElementVisible(sessionTimeout)) {
      await expectToBeVisible(sessionTimeout);
    }
  }

  /**
   * Comprehensive page validation
   */
  async validateFullSecurityPage(): Promise<void> {
    // Core page elements
    await this.assertPageLoaded();
    await this.assertSessionSection();

    // Optional sections
    await this.assertAccessLogsSection();
    await this.assertSecurityControls();
  }
}
