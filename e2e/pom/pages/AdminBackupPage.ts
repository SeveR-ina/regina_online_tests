import { TIMEOUTS, getProtectedPaths } from "@/data/constants";
import { Locator, Page } from "@playwright/test";
import { expectToBeVisible } from "@utils/expect";
import { BasePage } from "./BasePage";

/**
 * Page Object Model for the Admin Backup Management Page
 * Extends BasePage with backup and restore functionality
 */
export class AdminBackupPage extends BasePage {
  // Page sections
  readonly backupSection: Locator;
  readonly createBackupSection: Locator;
  readonly backupHistorySection: Locator;
  readonly restoreSection: Locator;
  readonly settingsSection: Locator;

  // Create backup controls
  readonly backupTypeSelect: Locator;
  readonly backupNameInput: Locator;
  readonly backupDescriptionInput: Locator;
  readonly includeDatabaseCheckbox: Locator;
  readonly includeFilesCheckbox: Locator;
  readonly includeMediaCheckbox: Locator;
  readonly includeConfigCheckbox: Locator;
  readonly createBackupButton: Locator;

  // Backup progress
  readonly backupProgressSection: Locator;
  readonly progressBar: Locator;
  readonly progressText: Locator;
  readonly cancelBackupButton: Locator;

  // Backup history table
  readonly backupHistoryTable: Locator;
  readonly backupRow: Locator;
  readonly backupName: Locator;
  readonly backupDate: Locator;
  readonly backupSize: Locator;
  readonly backupType: Locator;
  readonly backupStatus: Locator;
  readonly backupDescription: Locator;

  // Backup actions
  readonly downloadBackupButton: Locator;
  readonly restoreBackupButton: Locator;
  readonly deleteBackupButton: Locator;
  readonly viewBackupDetailsButton: Locator;

  // Restore functionality
  readonly uploadBackupInput: Locator;
  readonly uploadBackupButton: Locator;
  readonly restoreFromUploadButton: Locator;
  readonly restoreOptionsSection: Locator;
  readonly restoreProgressSection: Locator;

  // Restore options
  readonly restoreDatabaseCheckbox: Locator;
  readonly restoreFilesCheckbox: Locator;
  readonly restoreMediaCheckbox: Locator;
  readonly restoreConfigCheckbox: Locator;
  readonly overwriteExistingCheckbox: Locator;

  // Automated backup settings
  readonly enableScheduledBackupsToggle: Locator;
  readonly backupFrequencySelect: Locator;
  readonly backupTimeInput: Locator;
  readonly maxBackupsInput: Locator;
  readonly backupLocationSelect: Locator;
  readonly saveBackupSettingsButton: Locator;

  // Storage information
  readonly storageInfoSection: Locator;
  readonly totalStorageUsed: Locator;
  readonly availableStorage: Locator;
  readonly backupCount: Locator;

  // Filters and search
  readonly searchBackupsInput: Locator;
  readonly backupTypeFilter: Locator;
  readonly dateRangeFilter: Locator;
  readonly statusFilter: Locator;
  readonly clearFiltersButton: Locator;

  // Bulk actions
  readonly selectAllBackupsCheckbox: Locator;
  readonly backupCheckbox: Locator;
  readonly bulkDeleteButton: Locator;
  readonly bulkDownloadButton: Locator;

  // Notifications and messages
  readonly successMessage: Locator;
  readonly errorMessage: Locator;
  readonly warningMessage: Locator;
  readonly infoMessage: Locator;

  constructor(page: Page) {
    super(page);

    // Initialize page sections
    this.backupSection = page.locator('[data-testid="backup-section"]');
    this.createBackupSection = page.locator(
      '[data-testid="create-backup-section"]'
    );
    this.backupHistorySection = page.locator(
      '[data-testid="backup-history-section"]'
    );
    this.restoreSection = page.locator('[data-testid="restore-section"]');
    this.settingsSection = page.locator(
      '[data-testid="backup-settings-section"]'
    );

    // Initialize create backup controls
    this.backupTypeSelect = page.locator('[data-testid="backup-type-select"]');
    this.backupNameInput = page.locator('[data-testid="backup-name-input"]');
    this.backupDescriptionInput = page.locator(
      '[data-testid="backup-description-input"]'
    );
    this.includeDatabaseCheckbox = page.locator(
      '[data-testid="include-database-checkbox"]'
    );
    this.includeFilesCheckbox = page.locator(
      '[data-testid="include-files-checkbox"]'
    );
    this.includeMediaCheckbox = page.locator(
      '[data-testid="include-media-checkbox"]'
    );
    this.includeConfigCheckbox = page.locator(
      '[data-testid="include-config-checkbox"]'
    );
    this.createBackupButton = page.locator(
      '[data-testid="create-backup-button"]'
    );

    // Initialize backup progress
    this.backupProgressSection = page.locator(
      '[data-testid="backup-progress-section"]'
    );
    this.progressBar = page.locator('[data-testid="backup-progress-bar"]');
    this.progressText = page.locator('[data-testid="backup-progress-text"]');
    this.cancelBackupButton = page.locator(
      '[data-testid="cancel-backup-button"]'
    );

    // Initialize backup history table
    this.backupHistoryTable = page.locator(
      '[data-testid="backup-history-table"]'
    );
    this.backupRow = page.locator('[data-testid="backup-row"]');
    this.backupName = page.locator('[data-testid="backup-name"]');
    this.backupDate = page.locator('[data-testid="backup-date"]');
    this.backupSize = page.locator('[data-testid="backup-size"]');
    this.backupType = page.locator('[data-testid="backup-type"]');
    this.backupStatus = page.locator('[data-testid="backup-status"]');
    this.backupDescription = page.locator('[data-testid="backup-description"]');

    // Initialize backup actions
    this.downloadBackupButton = page.locator(
      '[data-testid="download-backup-button"]'
    );
    this.restoreBackupButton = page.locator(
      '[data-testid="restore-backup-button"]'
    );
    this.deleteBackupButton = page.locator(
      '[data-testid="delete-backup-button"]'
    );
    this.viewBackupDetailsButton = page.locator(
      '[data-testid="view-backup-details-button"]'
    );

    // Initialize restore functionality
    this.uploadBackupInput = page.locator(
      '[data-testid="upload-backup-input"]'
    );
    this.uploadBackupButton = page.locator(
      '[data-testid="upload-backup-button"]'
    );
    this.restoreFromUploadButton = page.locator(
      '[data-testid="restore-from-upload-button"]'
    );
    this.restoreOptionsSection = page.locator(
      '[data-testid="restore-options-section"]'
    );
    this.restoreProgressSection = page.locator(
      '[data-testid="restore-progress-section"]'
    );

    // Initialize restore options
    this.restoreDatabaseCheckbox = page.locator(
      '[data-testid="restore-database-checkbox"]'
    );
    this.restoreFilesCheckbox = page.locator(
      '[data-testid="restore-files-checkbox"]'
    );
    this.restoreMediaCheckbox = page.locator(
      '[data-testid="restore-media-checkbox"]'
    );
    this.restoreConfigCheckbox = page.locator(
      '[data-testid="restore-config-checkbox"]'
    );
    this.overwriteExistingCheckbox = page.locator(
      '[data-testid="overwrite-existing-checkbox"]'
    );

    // Initialize automated backup settings
    this.enableScheduledBackupsToggle = page.locator(
      '[data-testid="enable-scheduled-backups-toggle"]'
    );
    this.backupFrequencySelect = page.locator(
      '[data-testid="backup-frequency-select"]'
    );
    this.backupTimeInput = page.locator('[data-testid="backup-time-input"]');
    this.maxBackupsInput = page.locator('[data-testid="max-backups-input"]');
    this.backupLocationSelect = page.locator(
      '[data-testid="backup-location-select"]'
    );
    this.saveBackupSettingsButton = page.locator(
      '[data-testid="save-backup-settings-button"]'
    );

    // Initialize storage information
    this.storageInfoSection = page.locator(
      '[data-testid="storage-info-section"]'
    );
    this.totalStorageUsed = page.locator('[data-testid="total-storage-used"]');
    this.availableStorage = page.locator('[data-testid="available-storage"]');
    this.backupCount = page.locator('[data-testid="backup-count"]');

    // Initialize filters and search
    this.searchBackupsInput = page.locator(
      '[data-testid="search-backups-input"]'
    );
    this.backupTypeFilter = page.locator('[data-testid="backup-type-filter"]');
    this.dateRangeFilter = page.locator('[data-testid="date-range-filter"]');
    this.statusFilter = page.locator('[data-testid="backup-status-filter"]');
    this.clearFiltersButton = page.locator(
      '[data-testid="clear-backup-filters-button"]'
    );

    // Initialize bulk actions
    this.selectAllBackupsCheckbox = page.locator(
      '[data-testid="select-all-backups-checkbox"]'
    );
    this.backupCheckbox = page.locator('[data-testid="backup-checkbox"]');
    this.bulkDeleteButton = page.locator(
      '[data-testid="bulk-delete-backups-button"]'
    );
    this.bulkDownloadButton = page.locator(
      '[data-testid="bulk-download-backups-button"]'
    );

    // Initialize notifications and messages
    this.successMessage = page.locator('[data-testid="success-message"]');
    this.errorMessage = page.locator('[data-testid="error-message"]');
    this.warningMessage = page.locator('[data-testid="warning-message"]');
    this.infoMessage = page.locator('[data-testid="info-message"]');
  }

  /**
   * Navigation methods
   */
  async gotoBackupManagement(): Promise<void> {
    const protectedPaths = getProtectedPaths();
    await this.goto(protectedPaths.PROTECTED_BACKUP);
    await this.assertPageLoaded();
  }

  /**
   * Backup creation methods
   */
  async createFullBackup(
    backupName?: string,
    description?: string
  ): Promise<void> {
    await this.safeSelectOption(this.backupTypeSelect, "full");

    if (backupName) {
      await this.safeFill(this.backupNameInput, backupName);
    }

    if (description) {
      await this.safeFill(this.backupDescriptionInput, description);
    }

    // Select all components
    await this.safeClick(this.includeDatabaseCheckbox);
    await this.safeClick(this.includeFilesCheckbox);
    await this.safeClick(this.includeMediaCheckbox);
    await this.safeClick(this.includeConfigCheckbox);

    await this.safeClick(this.createBackupButton);
    await this.waitForBackupCompletion();
  }

  async createCustomBackup(options: {
    name?: string;
    description?: string;
    type: "full" | "database" | "files" | "media";
    includeDatabase?: boolean;
    includeFiles?: boolean;
    includeMedia?: boolean;
    includeConfig?: boolean;
  }): Promise<void> {
    await this.safeSelectOption(this.backupTypeSelect, options.type);

    if (options.name) {
      await this.safeFill(this.backupNameInput, options.name);
    }

    if (options.description) {
      await this.safeFill(this.backupDescriptionInput, options.description);
    }

    // Set component options
    if (options.includeDatabase) {
      await this.safeClick(this.includeDatabaseCheckbox);
    }

    if (options.includeFiles) {
      await this.safeClick(this.includeFilesCheckbox);
    }

    if (options.includeMedia) {
      await this.safeClick(this.includeMediaCheckbox);
    }

    if (options.includeConfig) {
      await this.safeClick(this.includeConfigCheckbox);
    }

    await this.safeClick(this.createBackupButton);
    await this.waitForBackupCompletion();
  }

  async cancelBackupInProgress(): Promise<void> {
    await this.safeClick(this.cancelBackupButton);
    await this.handleDialog("accept", "cancel");
  }

  /**
   * Backup management methods
   */
  async getBackupsCount(): Promise<number> {
    return await this.getElementCount(this.backupRow);
  }

  async getAllBackupsData(): Promise<
    Array<{
      name?: string;
      date?: string;
      size?: string;
      type?: string;
      status?: string;
      description?: string;
    }>
  > {
    const backups = [];
    const backupRows = await this.backupRow.all();

    for (let i = 0; i < backupRows.length; i++) {
      const row = backupRows[i];
      const name = await this.getElementText(
        row.locator('[data-testid="backup-name"]')
      );
      const date = await this.getElementText(
        row.locator('[data-testid="backup-date"]')
      );
      const size = await this.getElementText(
        row.locator('[data-testid="backup-size"]')
      );
      const type = await this.getElementText(
        row.locator('[data-testid="backup-type"]')
      );
      const status = await this.getElementText(
        row.locator('[data-testid="backup-status"]')
      );
      const description = await this.getElementText(
        row.locator('[data-testid="backup-description"]')
      );

      backups.push({ name, date, size, type, status, description });
    }

    return backups;
  }

  async downloadBackup(backupIndex: number): Promise<void> {
    const downloadButtons = await this.downloadBackupButton.all();
    if (downloadButtons[backupIndex]) {
      await this.safeClick(downloadButtons[backupIndex]);
    }
  }

  async deleteBackup(backupIndex: number): Promise<void> {
    const deleteButtons = await this.deleteBackupButton.all();
    if (deleteButtons[backupIndex]) {
      await this.safeClick(deleteButtons[backupIndex]);
      await this.handleDialog("accept", "delete");
      await this.waitForSuccessMessage();
    }
  }

  async viewBackupDetails(backupIndex: number): Promise<void> {
    const detailsButtons = await this.viewBackupDetailsButton.all();
    if (detailsButtons[backupIndex]) {
      await this.safeClick(detailsButtons[backupIndex]);
    }
  }

  /**
   * Restore methods
   */
  async restoreFromBackup(
    backupIndex: number,
    options?: {
      restoreDatabase?: boolean;
      restoreFiles?: boolean;
      restoreMedia?: boolean;
      restoreConfig?: boolean;
      overwriteExisting?: boolean;
    }
  ): Promise<void> {
    const restoreButtons = await this.restoreBackupButton.all();
    if (restoreButtons[backupIndex]) {
      await this.safeClick(restoreButtons[backupIndex]);
      await expectToBeVisible(this.restoreOptionsSection);

      // Set restore options if provided
      if (options) {
        if (options.restoreDatabase) {
          await this.safeClick(this.restoreDatabaseCheckbox);
        }

        if (options.restoreFiles) {
          await this.safeClick(this.restoreFilesCheckbox);
        }

        if (options.restoreMedia) {
          await this.safeClick(this.restoreMediaCheckbox);
        }

        if (options.restoreConfig) {
          await this.safeClick(this.restoreConfigCheckbox);
        }

        if (options.overwriteExisting) {
          await this.safeClick(this.overwriteExistingCheckbox);
        }
      }

      await this.safeClick(this.restoreFromUploadButton);
      await this.handleDialog("accept", "restore");
      await this.waitForRestoreCompletion();
    }
  }

  async uploadAndRestoreBackup(
    filePath: string,
    options?: {
      restoreDatabase?: boolean;
      restoreFiles?: boolean;
      restoreMedia?: boolean;
      restoreConfig?: boolean;
      overwriteExisting?: boolean;
    }
  ): Promise<void> {
    await this.uploadBackupInput.setInputFiles(filePath);
    await this.safeClick(this.uploadBackupButton);

    // Wait for upload to complete
    await expectToBeVisible(this.restoreOptionsSection);

    // Set restore options
    if (options) {
      if (options.restoreDatabase) {
        await this.safeClick(this.restoreDatabaseCheckbox);
      }

      if (options.restoreFiles) {
        await this.safeClick(this.restoreFilesCheckbox);
      }

      if (options.restoreMedia) {
        await this.safeClick(this.restoreMediaCheckbox);
      }

      if (options.restoreConfig) {
        await this.safeClick(this.restoreConfigCheckbox);
      }

      if (options.overwriteExisting) {
        await this.safeClick(this.overwriteExistingCheckbox);
      }
    }

    await this.safeClick(this.restoreFromUploadButton);
    await this.handleDialog("accept", "restore");
    await this.waitForRestoreCompletion();
  }

  /**
   * Scheduled backup settings methods
   */
  async enableScheduledBackups(): Promise<void> {
    await this.safeClick(this.enableScheduledBackupsToggle);
  }

  async configureScheduledBackups(settings: {
    frequency: "daily" | "weekly" | "monthly";
    time: string; // Format: "HH:MM"
    maxBackups: number;
    location?: "local" | "cloud" | "external";
  }): Promise<void> {
    await this.safeSelectOption(this.backupFrequencySelect, settings.frequency);
    await this.safeFill(this.backupTimeInput, settings.time);
    await this.safeFill(this.maxBackupsInput, settings.maxBackups.toString());

    if (settings.location) {
      await this.safeSelectOption(this.backupLocationSelect, settings.location);
    }

    await this.safeClick(this.saveBackupSettingsButton);
    await this.waitForSuccessMessage();
  }

  /**
   * Search and filter methods
   */
  async searchBackups(searchTerm: string): Promise<void> {
    await this.safeFill(this.searchBackupsInput, searchTerm);
    await this.page.keyboard.press("Enter");
  }

  async filterByBackupType(
    type: "full" | "database" | "files" | "media"
  ): Promise<void> {
    await this.safeSelectOption(this.backupTypeFilter, type);
  }

  async filterByStatus(
    status: "completed" | "in-progress" | "failed" | "cancelled"
  ): Promise<void> {
    await this.safeSelectOption(this.statusFilter, status);
  }

  async clearAllBackupFilters(): Promise<void> {
    await this.safeClick(this.clearFiltersButton);
  }

  /**
   * Bulk actions methods
   */
  async selectAllBackups(): Promise<void> {
    await this.safeClick(this.selectAllBackupsCheckbox);
  }

  async selectBackup(backupIndex: number): Promise<void> {
    const checkboxes = await this.backupCheckbox.all();
    if (checkboxes[backupIndex]) {
      await this.safeClick(checkboxes[backupIndex]);
    }
  }

  async bulkDeleteBackups(): Promise<void> {
    await this.safeClick(this.bulkDeleteButton);
    await this.handleDialog("accept", "delete");
    await this.waitForSuccessMessage();
  }

  async bulkDownloadBackups(): Promise<void> {
    await this.safeClick(this.bulkDownloadButton);
  }

  /**
   * Storage information methods
   */
  async getStorageInfo(): Promise<{
    totalUsed?: string;
    available?: string;
    backupCount?: string;
  }> {
    return {
      totalUsed: await this.getElementText(this.totalStorageUsed),
      available: await this.getElementText(this.availableStorage),
      backupCount: await this.getElementText(this.backupCount),
    };
  }

  /**
   * Progress and status monitoring methods
   */
  async waitForBackupCompletion(
    timeout: number = TIMEOUTS.BACKUP_RESTORE
  ): Promise<void> {
    // Wait for progress section to disappear or show completion
    await this.page.waitForFunction(
      () => {
        const progressSection = document.querySelector(
          '[data-testid="backup-progress-section"]'
        );
        return (
          !progressSection || progressSection.textContent?.includes("completed")
        );
      },
      { timeout }
    );

    await this.waitForSuccessMessage();
  }

  async waitForRestoreCompletion(
    timeout: number = TIMEOUTS.BACKUP_RESTORE
  ): Promise<void> {
    await this.page.waitForFunction(
      () => {
        const progressSection = document.querySelector(
          '[data-testid="restore-progress-section"]'
        );
        return (
          !progressSection || progressSection.textContent?.includes("completed")
        );
      },
      { timeout }
    );

    await this.waitForSuccessMessage();
  }

  async getBackupProgress(): Promise<number> {
    const progressText = await this.getElementText(this.progressText);
    const match = progressText.match(/(\d+)%/);
    return match ? parseInt(match[1]) : 0;
  }

  /**
   * Validation methods
   */
  async waitForSuccessMessage(): Promise<void> {
    await expectToBeVisible(this.successMessage, { timeout: TIMEOUTS.LONG });
  }

  async waitForErrorMessage(): Promise<void> {
    await expectToBeVisible(this.errorMessage, { timeout: TIMEOUTS.DEFAULT });
  }

  /**
   * Assertion methods (implements BasePage abstract method)
   */
  async assertPageLoaded(): Promise<void> {
    await expectToBeVisible(this.backupSection);
  }

  async assertCreateBackupSection(): Promise<void> {
    await expectToBeVisible(this.createBackupSection);
    await expectToBeVisible(this.backupTypeSelect);
    await expectToBeVisible(this.createBackupButton);
  }

  async assertBackupHistorySection(): Promise<void> {
    await expectToBeVisible(this.backupHistorySection);
    await expectToBeVisible(this.backupHistoryTable);
  }

  async assertBackupSettingsSection(): Promise<void> {
    const settingsSection = this.settingsSection;
    if (await this.isElementVisible(settingsSection)) {
      await expectToBeVisible(settingsSection);
      await expectToBeVisible(this.enableScheduledBackupsToggle);
    }
  }

  async assertStorageInfo(): Promise<void> {
    const storageSection = this.storageInfoSection;
    if (await this.isElementVisible(storageSection)) {
      await expectToBeVisible(storageSection);
      await expectToBeVisible(this.totalStorageUsed);
      await expectToBeVisible(this.backupCount);
    }
  }

  /**
   * Comprehensive page validation
   */
  async validateFullBackupPage(): Promise<void> {
    // Core page elements
    await this.assertPageLoaded();
    await this.assertCreateBackupSection();
    await this.assertBackupHistorySection();

    // Optional sections
    await this.assertBackupSettingsSection();
    await this.assertStorageInfo();
  }
}
