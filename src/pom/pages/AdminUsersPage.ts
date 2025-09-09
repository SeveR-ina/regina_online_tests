import { Locator, Page } from "@playwright/test";
import { getProtectedPaths, TIMEOUT } from "@test-data/constants";
import { expectToBeVisible } from "@utils/expect";
import { BasePage } from "./BasePage";

/**
 * Page Object Model for the Admin Users Management Page
 * Extends BasePage with user management functionality
 */
export class AdminUsersPage extends BasePage {
  // Page sections
  readonly usersSection: Locator;
  readonly usersTable: Locator;
  readonly userCreateModal: Locator;
  readonly userEditModal: Locator;

  // Header controls
  readonly addUserButton: Locator;
  readonly importUsersButton: Locator;
  readonly exportUsersButton: Locator;

  // Search and filters
  readonly searchInput: Locator;
  readonly roleFilter: Locator;
  readonly statusFilter: Locator;
  readonly dateFilter: Locator;
  readonly clearFiltersButton: Locator;

  // Table elements
  readonly userRow: Locator;
  readonly userName: Locator;
  readonly userEmail: Locator;
  readonly userRole: Locator;
  readonly userStatus: Locator;
  readonly userLastLogin: Locator;
  readonly userCreatedDate: Locator;

  // Action buttons in table
  readonly editUserButton: Locator;
  readonly deleteUserButton: Locator;
  readonly activateUserButton: Locator;
  readonly deactivateUserButton: Locator;
  readonly resetPasswordButton: Locator;

  // Bulk actions
  readonly selectAllCheckbox: Locator;
  readonly userCheckbox: Locator;
  readonly bulkActionsDropdown: Locator;
  readonly applyBulkActionButton: Locator;

  // User form fields (create/edit)
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly emailInput: Locator;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly confirmPasswordInput: Locator;
  readonly roleSelect: Locator;
  readonly departmentInput: Locator;
  readonly phoneInput: Locator;

  // User permissions
  readonly permissionsSection: Locator;
  readonly permissionCheckbox: Locator;
  readonly selectAllPermissionsButton: Locator;
  readonly clearAllPermissionsButton: Locator;

  // Modal controls
  readonly saveUserButton: Locator;
  readonly cancelUserButton: Locator;
  readonly closeModalButton: Locator;

  // Pagination
  readonly paginationSection: Locator;
  readonly previousPageButton: Locator;
  readonly nextPageButton: Locator;
  readonly pageNumber: Locator;
  readonly itemsPerPageSelect: Locator;

  // Notifications
  readonly successMessage: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    super(page);

    // Initialize page sections
    this.usersSection = page.locator('[data-testid="users-section"]');
    this.usersTable = page.locator('[data-testid="users-table"]');
    this.userCreateModal = page.locator('[data-testid="user-create-modal"]');
    this.userEditModal = page.locator('[data-testid="user-edit-modal"]');

    // Initialize header controls
    this.addUserButton = page.locator('[data-testid="add-user-button"]');
    this.importUsersButton = page.locator(
      '[data-testid="import-users-button"]'
    );
    this.exportUsersButton = page.locator(
      '[data-testid="export-users-button"]'
    );

    // Initialize search and filters
    this.searchInput = page.locator('[data-testid="users-search-input"]');
    this.roleFilter = page.locator('[data-testid="role-filter"]');
    this.statusFilter = page.locator('[data-testid="status-filter"]');
    this.dateFilter = page.locator('[data-testid="date-filter"]');
    this.clearFiltersButton = page.locator(
      '[data-testid="clear-filters-button"]'
    );

    // Initialize table elements
    this.userRow = page.locator('[data-testid="user-row"]');
    this.userName = page.locator('[data-testid="user-name"]');
    this.userEmail = page.locator('[data-testid="user-email"]');
    this.userRole = page.locator('[data-testid="user-role"]');
    this.userStatus = page.locator('[data-testid="user-status"]');
    this.userLastLogin = page.locator('[data-testid="user-last-login"]');
    this.userCreatedDate = page.locator('[data-testid="user-created-date"]');

    // Initialize action buttons in table
    this.editUserButton = page.locator('[data-testid="edit-user-button"]');
    this.deleteUserButton = page.locator('[data-testid="delete-user-button"]');
    this.activateUserButton = page.locator(
      '[data-testid="activate-user-button"]'
    );
    this.deactivateUserButton = page.locator(
      '[data-testid="deactivate-user-button"]'
    );
    this.resetPasswordButton = page.locator(
      '[data-testid="reset-password-button"]'
    );

    // Initialize bulk actions
    this.selectAllCheckbox = page.locator(
      '[data-testid="select-all-checkbox"]'
    );
    this.userCheckbox = page.locator('[data-testid="user-checkbox"]');
    this.bulkActionsDropdown = page.locator(
      '[data-testid="bulk-actions-dropdown"]'
    );
    this.applyBulkActionButton = page.locator(
      '[data-testid="apply-bulk-action-button"]'
    );

    // Initialize user form fields (create/edit)
    this.firstNameInput = page.locator('[data-testid="first-name-input"]');
    this.lastNameInput = page.locator('[data-testid="last-name-input"]');
    this.emailInput = page.locator('[data-testid="email-input"]');
    this.usernameInput = page.locator('[data-testid="username-input"]');
    this.passwordInput = page.locator('[data-testid="password-input"]');
    this.confirmPasswordInput = page.locator(
      '[data-testid="confirm-password-input"]'
    );
    this.roleSelect = page.locator('[data-testid="role-select"]');
    this.departmentInput = page.locator('[data-testid="department-input"]');
    this.phoneInput = page.locator('[data-testid="phone-input"]');

    // Initialize user permissions
    this.permissionsSection = page.locator(
      '[data-testid="permissions-section"]'
    );
    this.permissionCheckbox = page.locator(
      '[data-testid="permission-checkbox"]'
    );
    this.selectAllPermissionsButton = page.locator(
      '[data-testid="select-all-permissions-button"]'
    );
    this.clearAllPermissionsButton = page.locator(
      '[data-testid="clear-all-permissions-button"]'
    );

    // Initialize modal controls
    this.saveUserButton = page.locator('[data-testid="save-user-button"]');
    this.cancelUserButton = page.locator('[data-testid="cancel-user-button"]');
    this.closeModalButton = page.locator('[data-testid="close-modal-button"]');

    // Initialize pagination
    this.paginationSection = page.locator('[data-testid="pagination-section"]');
    this.previousPageButton = page.locator(
      '[data-testid="previous-page-button"]'
    );
    this.nextPageButton = page.locator('[data-testid="next-page-button"]');
    this.pageNumber = page.locator('[data-testid="page-number"]');
    this.itemsPerPageSelect = page.locator(
      '[data-testid="items-per-page-select"]'
    );

    // Initialize notifications
    this.successMessage = page.locator('[data-testid="success-message"]');
    this.errorMessage = page.locator('[data-testid="error-message"]');
  }

  /**
   * Navigation methods
   */
  async gotoUsersManagement(): Promise<void> {
    const protectedPaths = getProtectedPaths();
    await this.goto(protectedPaths.PROTECTED_USERS);
    await this.assertPageLoaded();
  }

  async filterByRole(
    role: "admin" | "editor" | "contributor" | "subscriber"
  ): Promise<void> {
    await this.safeSelectOption(this.roleFilter, role);
  }

  async filterByStatus(
    status: "active" | "inactive" | "pending" | "suspended"
  ): Promise<void> {
    await this.safeSelectOption(this.statusFilter, status);
  }

  async clearAllFilters(): Promise<void> {
    await this.clearFiltersButton.click();
  }

  /**
   * Bulk actions methods
   */
  async selectAllUsers(): Promise<void> {
    await this.selectAllCheckbox.click();
  }

  /**
   * Data retrieval methods
   */
  async getUsersCount(): Promise<number> {
    return await this.getElementCount(this.userRow);
  }

  async getAllUsersData(): Promise<
    Array<{
      name?: string;
      email?: string;
      role?: string;
      status?: string;
      lastLogin?: string;
      createdDate?: string;
    }>
  > {
    const users = [];
    const userRows = await this.userRow.all();

    for (let i = 0; i < userRows.length; i++) {
      const row = userRows[i];
      const name = await this.getElementText(
        row.locator('[data-testid="user-name"]')
      );
      const email = await this.getElementText(
        row.locator('[data-testid="user-email"]')
      );
      const role = await this.getElementText(
        row.locator('[data-testid="user-role"]')
      );
      const status = await this.getElementText(
        row.locator('[data-testid="user-status"]')
      );
      const lastLogin = await this.getElementText(
        row.locator('[data-testid="user-last-login"]')
      );
      const createdDate = await this.getElementText(
        row.locator('[data-testid="user-created-date"]')
      );

      users.push({ name, email, role, status, lastLogin, createdDate });
    }

    return users;
  }

  /**
   * Pagination methods
   */
  async goToNextPage(): Promise<void> {
    await this.nextPageButton.click();
  }

  async goToPreviousPage(): Promise<void> {
    await this.previousPageButton.click();
  }

  async setItemsPerPage(itemsCount: "10" | "25" | "50" | "100"): Promise<void> {
    await this.safeSelectOption(this.itemsPerPageSelect, itemsCount);
  }

  /**
   * Validation methods
   */
  async waitForSuccessMessage(): Promise<void> {
    await expectToBeVisible(this.successMessage, { timeout: TIMEOUT });
  }

  async waitForErrorMessage(): Promise<void> {
    await expectToBeVisible(this.errorMessage, { timeout: TIMEOUT });
  }

  /**
   * Assertion methods (implements BasePage abstract method)
   */
  async assertPageLoaded(): Promise<void> {
    await expectToBeVisible(this.usersSection);
    await expectToBeVisible(this.usersTable);
  }

  async assertUsersTableHeader(): Promise<void> {
    await expectToBeVisible(this.usersTable);
    // Check that essential columns are present
    await expectToBeVisible(this.userName.first());
    await expectToBeVisible(this.userEmail.first());
    await expectToBeVisible(this.userRole.first());
  }

  async assertUserManagementControls(): Promise<void> {
    await expectToBeVisible(this.addUserButton);
    await expectToBeVisible(this.searchInput);
    await expectToBeVisible(this.roleFilter);
    await expectToBeVisible(this.statusFilter);
  }

  async assertBulkActionsAvailable(): Promise<void> {
    await expectToBeVisible(this.selectAllCheckbox);
    await expectToBeVisible(this.bulkActionsDropdown);
  }

  async assertUserActionsAvailable(): Promise<void> {
    const usersCount = await this.getUsersCount();
    if (usersCount > 0) {
      await expectToBeVisible(this.editUserButton.first());
      await expectToBeVisible(this.deleteUserButton.first());
    }
  }

  /**
   * Comprehensive page validation
   */
  async validateFullUsersPage(): Promise<void> {
    // Core page elements
    await this.assertPageLoaded();
    await this.assertUsersTableHeader();
    await this.assertUserManagementControls();

    // Action controls
    await this.assertBulkActionsAvailable();
    await this.assertUserActionsAvailable();
  }
}
