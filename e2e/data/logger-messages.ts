/**
 * Centralized logger messages for test execution
 * Provides consistent and reusable log messages for better test reporting
 */

/**
 * Test execution status messages
 */
export const TEST_MESSAGES = {
  // Starting messages
  START: {
    HOME_PAGE_ACCESS: "🏠 Testing guest home page access",
    BLOG_PAGE_ACCESS: "📝 Testing guest blog page access",
    ADMIN_REDIRECT: "🔒 Testing admin access redirect for guests",
    ADMIN_DASHBOARD: "👑 Testing authenticated admin dashboard access",
    BLOG_POST_CREATION: "✏️ Testing blog post creation and editing",
    ADMIN_NAVIGATION: "🧭 Testing admin navigation flows",
    API_AUTHENTICATION: "🔌 Testing API authentication and basic endpoints",
    API_ERROR_HANDLING: "🚨 Testing API error handling",
    MULTIPLE_PAGE_OBJECTS: "🎭 Testing multiple page object interaction",
    MOBILE_RESPONSIVENESS: "📱 Testing mobile responsiveness",

    // Smoke test specific
    HOME_PAGE_SMOKE: "🏠 Starting home page smoke test",
    BLOG_PAGE_SMOKE: "📝 Starting blog page smoke test",
    NAVIGATION_FLOW_SMOKE: "🔗 Starting navigation flow smoke test",
    API_HEALTH_CHECK_SMOKE: "🔌 Starting API health check smoke test",
    MOBILE_SMOKE: "📱 Starting mobile responsiveness smoke test",
    PERFORMANCE_BASELINE_SMOKE: "⚡ Starting performance baseline smoke test",
    SEO_SMOKE: "🔍 Starting SEO smoke test",
    ERROR_HANDLING_SMOKE: "🚨 Starting error handling smoke test",
  },

  // Completion messages
  COMPLETED: {
    GUEST_HOME_PAGE: "✅ Guest home page test completed",
    GUEST_BLOG_PAGE: "✅ Guest blog page test completed",
    ADMIN_REDIRECT: "✅ Admin redirect test completed",
    ADMIN_DASHBOARD: "✅ Admin dashboard test completed",
    ADMIN_NAVIGATION: "✅ Admin navigation flow test completed",
    API_TEST: "✅ API test completed",
    API_ERROR_HANDLING: "✅ API error handling test completed",
    MIXED_SCENARIO: "✅ Mixed scenario test completed",
    MOBILE_RESPONSIVENESS: "✅ Mobile responsiveness test completed",

    // Smoke test specific
    HOME_PAGE_SMOKE: "✅ Home page smoke test completed successfully",
    BLOG_PAGE_SMOKE: "✅ Blog page smoke test completed successfully",
    NAVIGATION_FLOW_SMOKE:
      "✅ Navigation flow smoke test completed successfully",
    API_HEALTH_CHECK_SMOKE:
      "✅ API health check smoke test completed successfully",
    MOBILE_SMOKE: "✅ Mobile responsiveness smoke test completed successfully",
    PERFORMANCE_BASELINE_SMOKE:
      "✅ Performance baseline smoke test completed successfully",
    SEO_SMOKE: "✅ SEO smoke test completed successfully",
    ERROR_HANDLING_SMOKE: "✅ Error handling smoke test completed successfully",
  },

  // Step completion messages
  STEP_COMPLETED: {
    API_HEALTH_CHECK: "✅ API health check passed",
    BLOG_POST_STRUCTURE_VALIDATION: "✅ Blog post structure validation passed",
    USERS_NAVIGATION: "✅ Users navigation successful",
    MOBILE_MENU_INTERACTION: "✅ Mobile menu interaction successful",
  },

  // Information messages
  INFO: {
    BLOG_POSTS_FOUND: (count: number) => `Found ${count} blog posts`,
    NO_BLOG_POSTS_GUEST: "No blog posts found (acceptable for guest)",
    USERS_NOT_AVAILABLE: "ℹ️ Users section not available or not implemented",
    MOBILE_MENU_NOT_AVAILABLE:
      "ℹ️ Mobile menu not available or not implemented",
    NO_BLOG_POSTS_SMOKE:
      "ℹ️ No blog posts found - this is acceptable for smoke test",
    REDIRECT_TO_FUNCTIONAL: "404 redirects to functional page",
    PAGE_SERVED_CORRECTLY: "404 page served correctly",
    API_POSTS_FOUND: (total: number) =>
      `Found ${total} total blog posts via API`,
    DASHBOARD_STATS: (stats: any) =>
      `Dashboard stats: ${JSON.stringify(stats)}`,
    LCP_METRIC: (lcp: number) => `LCP: ${lcp}ms`,
    CLS_METRIC: (cls: number) => `CLS: ${cls}`,
    OG_TITLE_FOUND: (title: string) => `Open Graph title found: ${title}`,
    API_VS_ADMIN_STATS: (apiTotal: number, adminTotal: number) =>
      `API total posts: ${apiTotal}, Admin stats: ${adminTotal}`,
    BLOG_POST_CREATED: (title: string) =>
      `✅ Blog post "${title}" created successfully`,
  },

  // Warning messages
  WARNING: {
    API_UI_MISMATCH: "⚠️ API shows posts but UI shows none - potential issue",
  },

  // Error messages
  ERROR: {
    TEST_FAILED_SCREENSHOT: (path: string) =>
      `❌ Test failed - screenshot saved: ${path}`,
  },

  // API specific messages
  API: {
    INITIALIZED: (baseURL: string) =>
      `API client initialized with base URL: ${baseURL}`,
    LOGIN_SUCCESS: (email: string) => `Login successful for: ${email}`,
    LOGIN_FAILED: (error: string) => `Login failed: ${error}`,
    LOGOUT_SUCCESS: "Logout successful",
    LOGOUT_FAILED: (error: string) => `Logout failed: ${error}`,
    LOGOUT_ERROR: (error: string) => `Logout error: ${error}`,
    USER_CREATED: (email: string) => `User created successfully: ${email}`,
    USER_CREATION_FAILED: (error: string) => `User creation failed: ${error}`,
    USER_CREATION_ERROR: (error: string) => `User creation error: ${error}`,
    USER_GET_FAILED: (error: string) => `Failed to get current user: ${error}`,
    BLOG_POST_CREATED: (title: string) =>
      `Blog post created successfully: ${title}`,
    BLOG_POST_CREATION_FAILED: (error: string) =>
      `Blog post creation failed: ${error}`,
    BLOG_POST_CREATION_ERROR: (error: string) =>
      `Blog post creation error: ${error}`,
    BLOG_POST_GET_FAILED: (id: string, error: string) =>
      `Failed to get blog post ${id}: ${error}`,
    BLOG_POSTS_GET_FAILED: (error: string) =>
      `Failed to get blog posts: ${error}`,
    BLOG_POST_UPDATED: (id: string) => `Blog post updated successfully: ${id}`,
    BLOG_POST_UPDATE_FAILED: (error: string) =>
      `Blog post update failed: ${error}`,
    BLOG_POST_UPDATE_ERROR: (error: string) =>
      `Blog post update error: ${error}`,
    BLOG_POST_DELETED: (id: string) => `Blog post deleted successfully: ${id}`,
    BLOG_POST_DELETE_FAILED: (error: string) =>
      `Blog post deletion failed: ${error}`,
    BLOG_POST_DELETE_ERROR: (error: string) =>
      `Blog post deletion error: ${error}`,
    BLOG_POST_PINNED: (id: string) => `Blog post pinned successfully: ${id}`,
    BLOG_POST_PIN_FAILED: (error: string) => `Blog post pin failed: ${error}`,
    BLOG_POST_PIN_ERROR: (error: string) => `Blog post pin error: ${error}`,
    BLOG_POST_UNPINNED: (id: string) =>
      `Blog post unpinned successfully: ${id}`,
    BLOG_POST_UNPIN_FAILED: (error: string) =>
      `Blog post unpin failed: ${error}`,
    BLOG_POST_UNPIN_ERROR: (error: string) => `Blog post unpin error: ${error}`,
    BLOG_POST_LIKED: (id: string) => `Blog post liked successfully: ${id}`,
    BLOG_POST_LIKE_ERROR: (error: string) => `Blog post like error: ${error}`,
    BLOG_SEARCH_ERROR: (error: string) => `Blog search error: ${error}`,
    HEALTH_CHECK_FAILED: (error: string) => `Health check failed: ${error}`,
    SYSTEM_STATS_FAILED: (error: string) =>
      `Failed to get system stats: ${error}`,
    RATE_LIMITED: (count: number) => `Rate limited after ${count} requests`,
    RESPONSE_TIME: (time: number) => `API response time: ${time}ms`,
    OPERATION_FAILED: (time: number, error: string) =>
      `API operation failed after ${time}ms: ${error}`,
    ERROR_HANDLING_FAILED: (error: string) =>
      `Error handling test failed: ${error}`,
    CLEANUP_STARTED: "Starting cleanup of test blog posts...",
    TEST_POST_DELETED: (title: string) => `Deleted test blog post: ${title}`,
    CLEANUP_COMPLETED: (count: number) =>
      `Cleanup completed. Deleted ${count} test blog posts.`,
    CLEANUP_FAILED: (error: string) => `Cleanup failed: ${error}`,
    USER_CLEANUP_STARTED: "Starting cleanup of test users...",
  },

  // Workflow specific messages
  WORKFLOW: {
    BLOG_POST_CREATION_STARTED: "Starting complete blog post creation workflow",
    TOGGLE_PIN_STARTED: "Starting toggle pin workflow for first post",
    DASHBOARD_VALIDATION_STARTED: "Starting full dashboard validation workflow",
    DASHBOARD_VALIDATION_COMPLETED:
      "Full dashboard validation workflow completed",
    CREATE_PUBLISH_STARTED: (template: string) =>
      `Starting create and publish workflow with ${template} template`,
    BLOG_POST_COMPLETED: (title: string) =>
      `Blog post creation workflow completed: ${title}`,
    DRAFT_POST_STARTED: "Starting create draft post workflow",
    DRAFT_POST_COMPLETED: (title: string) =>
      `Draft post workflow completed: ${title}`,
    LIFECYCLE_STARTED: "Starting complete blog post lifecycle workflow",
    LIFECYCLE_COMPLETED: (title: string) =>
      `Complete lifecycle workflow finished for post: ${title}`,
    LIFECYCLE_DELETE_WARNING:
      "Could not complete deletion part of lifecycle workflow",
    ADMIN_NAVIGATION_STARTED: "Starting admin navigation testing workflow",
    ADMIN_NAVIGATION_COMPLETED: "Admin navigation testing workflow completed",
  },
} as const;

/**
 * Utility functions for dynamic logger messages
 */
export const createLogMessage = {
  /**
   * Create test start message
   */
  testStart: (context: string) => `🔄 Starting ${context} test`,

  /**
   * Create test completion message
   */
  testComplete: (context: string) =>
    `✅ ${context} test completed successfully`,

  /**
   * Create step completion message
   */
  stepComplete: (step: string) => `✅ ${step} completed`,

  /**
   * Create info message with count
   */
  countInfo: (item: string, count: number) => `Found ${count} ${item}`,

  /**
   * Create performance metric message
   */
  performanceMetric: (metric: string, value: number, unit: string = "ms") =>
    `${metric}: ${value}${unit}`,

  /**
   * Create comparison message
   */
  comparison: (source1: string, value1: any, source2: string, value2: any) =>
    `${source1}: ${value1}, ${source2}: ${value2}`,
};

/**
 * Page object specific logger messages
 */
export const PAGE_OBJECT_MESSAGES = {
  // Page navigation messages
  NAVIGATION: {
    NAVIGATING_TO: (url: string) => `Navigating to ${url}`,
    NAVIGATING_TO_PAGE: (pageName: string) => `Navigating to ${pageName} page`,
    PAGE_LOADED: (pageName: string) => `${pageName} page loaded successfully`,
    PAGE_LOADING: (pageName: string) => `Loading ${pageName} page`,
    BACK_NAVIGATION: "Navigating back to previous page",
    FORWARD_NAVIGATION: "Navigating forward",
    REFRESH_PAGE: "Refreshing current page",
  },

  // Element interaction messages
  INTERACTION: {
    CLICKING: (element: string) => `Clicking ${element}`,
    CLICKING_BUTTON: (buttonName: string) => `Clicking ${buttonName} button`,
    CLICKING_LINK: (linkText: string) => `Clicking ${linkText} link`,
    TYPING: (field: string, value?: string) =>
      `Typing${value ? ` "${value}"` : ""} into ${field}`,
    FILLING_FIELD: (field: string, value?: string) =>
      `Filling ${field}${value ? ` with "${value}"` : ""}`,
    SELECTING: (option: string, dropdown?: string) =>
      `Selecting ${option}${dropdown ? ` from ${dropdown}` : ""}`,
    HOVERING: (element: string) => `Hovering over ${element}`,
    EDITING: (item: string) => `Editing ${item}`,
    DELETING: (item: string) => `Deleting ${item}`,
    SETTING: (item: string) => `Setting ${item}`,
  },

  // Verification and assertion messages
  VERIFICATION: {
    VERIFYING: (item: string) => `Verifying ${item}`,
    VERIFIED: (item: string) => `${item} verified successfully`,
    ASSERTING: (item: string) => `Asserting ${item}`,
    ASSERTION_PASSED: (item: string) => `${item} assertion passed`,
    CHECKING_ELEMENT: (element: string) => `Checking if ${element} exists`,
    ELEMENT_FOUND: (element: string) => `${element} found`,
    ELEMENT_NOT_FOUND: (element: string) => `${element} not found`,
  },

  // Page validation messages
  VALIDATION: {
    ASSERTING: (item: string) => `🔍 Asserting ${item}`,
    PERFORMING: (validation: string) => `🔍 Performing ${validation}`,
    COMPLETED: (validation: string) =>
      `✅ ${validation} completed successfully`,
    CHECKING: (item: string) => `🔍 Checking ${item}`,
    VERIFIED: (item: string) => `✅ ${item} verified`,
  },

  // File operations messages
  FILE: {
    UPLOADING: (filePath: string, context: string) =>
      `📤 Uploading ${filePath} for ${context}`,
    DOWNLOADING: (fileName: string) => `📥 Downloading ${fileName}`,
    READING: (fileName: string) => `📖 Reading ${fileName}`,
    WRITING: (fileName: string) => `📝 Writing ${fileName}`,
  },

  // Base page specific messages
  BASE_PAGE: {
    NAVIGATING_TO: (url: string) => `🧭 Navigating to: ${url}`,
    RELOADING_PAGE: "🔄 Reloading page",
    GOING_BACK: "⬅️ Going back",
    GOING_FORWARD: "➡️ Going forward",
    VIEWPORT_SET: (width: number, height: number) =>
      `📱 Viewport set to: ${width}x${height}`,
    PAGE_LOAD_TIME: (time: number) => `⚡ Page load time: ${time}ms`,
    UNEXPECTED_DIALOG: (message: string) =>
      `⚠️ Unexpected dialog message: ${message}`,
    ACTION_RETRY: (attempt: number, max: number) =>
      `Action failed, retrying... (${attempt}/${max})`,
    FILLING_FORM: "📝 Filling form with provided data",
    SUBMITTING_FORM: "📤 Submitting form",
    CLICK_RETRY: (attempt: number) =>
      `Click attempt ${attempt} failed, retrying...`,
  },

  // Blog page specific messages
  BLOG_PAGE: {
    GOING_TO_PREVIOUS: "Going to previous page",
    GOING_TO_PAGE: (pageNumber: number) => `Going to page: ${pageNumber}`,
    ASSERTING_LOADED: "Asserting blog page is loaded",
    ASSERTING_HERO_CONTENT: "Asserting blog hero content",
    ASSERTING_SEARCH_FUNCTIONALITY: "Asserting search functionality is present",
    ASSERTING_HAS_POSTS: "Asserting blog has posts",
    ASSERTING_NO_POSTS: "Asserting no blog posts are displayed",
    ASSERTING_SEARCH_RESULTS: (query: string) =>
      `Asserting search results for query: "${query}"`,
    ASSERTING_NO_SEARCH_RESULTS: (query: string) =>
      `Asserting no search results for query: "${query}"`,
    ASSERTING_PAGINATION_VISIBLE: "Asserting pagination is visible",
    ASSERTING_PAGINATION_HIDDEN: "Asserting pagination is hidden",
    ASSERTING_BLOG_CARD_STRUCTURE: (index: number) =>
      `Asserting blog card structure at index: ${index}`,
    ASSERTING_LOADING_STATE: "Asserting loading state is displayed",
    ASSERTING_MOBILE_LAYOUT: "Asserting mobile blog layout",
    PERFORMING_VALIDATION: "Performing comprehensive blog page validation",
    VALIDATION_COMPLETED: "Blog page validation completed successfully",
    MEASURING_SEARCH_PERFORMANCE: (query: string) =>
      `Measuring search performance for query: "${query}"`,
    SEARCH_COMPLETED_IN: (time: number) => `Search completed in ${time}ms`,
    MEASURING_PAGE_LOAD: "Measuring blog page load performance",
    PAGE_LOADED_IN: (time: number) => `Blog page loaded in ${time}ms`,
  },

  // Admin Login specific messages
  ADMIN_LOGIN: {
    PRIMARY_SELECTORS_FAILED:
      "Primary selectors failed, trying alternative selectors",
    FORM_VALIDATION_CHECKING: (field: string) =>
      `🔍 Checking form validation for ${field} field`,
    FORM_VALIDATION_DISPLAYED: (field: string) =>
      `✅ Form validation message displayed for ${field}`,
    NO_EMAIL_VALIDATION: "No email validation found",
    NO_PASSWORD_VALIDATION: "No password validation found",
    FORGOT_PASSWORD_NOT_FOUND: "Forgot password link not found",
  },

  // Admin Backup specific messages
  ADMIN_BACKUP: {
    DOWNLOADING_BACKUP: (index: number) =>
      `📅 Downloading backup at index ${index}`,
    DELETING_BACKUP: (index: number) => `🗺️ Deleting backup at index ${index}`,
    VIEWING_BACKUP_DETAILS: (index: number) =>
      `👁️ Viewing backup details at index ${index}`,
    RESTORING_FROM_BACKUP: (index: number) =>
      `🔄 Restoring from backup at index ${index}`,
    UPLOADING_AND_RESTORING: (filePath: string) =>
      `📤 Uploading and restoring backup from: ${filePath}`,
    ENABLING_SCHEDULED: "⏰ Enabling scheduled backups",
    CONFIGURING_SCHEDULED: "⚙️ Configuring scheduled backup settings",
    SEARCHING_BACKUPS: (term: string) => `🔍 Searching backups: ${term}`,
    FILTERING_BY_TYPE: (type: string) =>
      `📂 Filtering backups by type: ${type}`,
    FILTERING_BY_STATUS: (status: string) =>
      `📊 Filtering backups by status: ${status}`,
    CLEARING_FILTERS: "🧹 Clearing all backup filters",
    SELECTING_ALL: "☑️ Selecting all backups",
    SELECTING_BACKUP: (index: number) =>
      `☑️ Selecting backup at index ${index}`,
    BULK_DELETING: "🗺️ Bulk deleting selected backups",
    BULK_DOWNLOADING: "📅 Bulk downloading selected backups",
    WAITING_FOR_BACKUP: "⏳ Waiting for backup to complete",
    WAITING_FOR_RESTORE: "⏳ Waiting for restore to complete",
    ASSERTING_PAGE_LOADED: "🔍 Asserting admin backup page is loaded",
    ASSERTING_CREATE_SECTION: "💾 Asserting create backup section",
    ASSERTING_HISTORY_SECTION: "📋 Asserting backup history section",
    ASSERTING_SETTINGS_SECTION: "⚙️ Asserting backup settings section",
    ASSERTING_STORAGE_INFO: "💽 Asserting storage information",
    PERFORMING_VALIDATION:
      "🔍 Performing comprehensive backup management page validation",
    VALIDATION_COMPLETED:
      "✅ Admin backup page validation completed successfully",
  },

  // Admin Dashboard specific messages
  ADMIN_DASHBOARD: {
    NAVIGATING_TO_DASHBOARD: "Navigating to admin dashboard",
    DASHBOARD_LOADED: "Admin dashboard loaded successfully",
    NAVIGATING_TO_NEW_POST: "Navigating to create new post",
    NAVIGATING_TO_USERS: "Navigating to users management",
    NAVIGATING_TO_SECURITY: "Navigating to security settings",
    NAVIGATING_TO_BACKUP: "Navigating to backup management",
    LOGGING_OUT: "Logging out from admin dashboard",
    EDITING_POST: (postId: string) => `Editing post with ID: ${postId}`,
    VIEWING_POST: (postId: string) => `Viewing post with ID: ${postId}`,
    PINNING_POST: (postId: string) => `Pinning post with ID: ${postId}`,
    UNPINNING_POST: (postId: string) => `Unpinning post with ID: ${postId}`,
    DELETING_POST: (postId: string) => `Deleting post with ID: ${postId}`,
    ASSERTING_LOADED: "Asserting admin dashboard is loaded",
    ASSERTING_TITLE: "Asserting dashboard title",
    ASSERTING_HEADER_BUTTONS: "Asserting header action buttons",
    ASSERTING_STATISTICS: "Asserting statistics section",
    ASSERTING_POSTS_TABLE: "Asserting posts table",
    ASSERTING_TABLE_HEADERS: "Asserting table headers",
    ASSERTING_HAS_POSTS: "Asserting dashboard has posts",
    ASSERTING_NO_POSTS: "Asserting dashboard has no posts",
    ASSERTING_POST_EXISTS: (postId: string) =>
      `Asserting post exists with ID: ${postId}`,
    ASSERTING_POST_NOT_EXISTS: (postId: string) =>
      `Asserting post does not exist with ID: ${postId}`,
    ASSERTING_POST_STATUS: (postId: string, status: string) =>
      `Asserting post ${postId} has status: ${status}`,
    ASSERTING_STAT_VALUES: "Asserting dashboard statistics values",
    ASSERTING_LOADING_STATE: "Asserting loading state",
    ASSERTING_MOBILE_LAYOUT: "Asserting mobile admin dashboard layout",
    PERFORMING_VALIDATION:
      "Performing comprehensive admin dashboard validation",
    VALIDATION_COMPLETED: "Admin dashboard validation completed successfully",
    STARTING_NEW_POST_WORKFLOW: "Starting create new post workflow",
    STARTING_EDIT_WORKFLOW: "Starting edit first post workflow",
    STARTING_DELETE_WORKFLOW: "Starting delete first post workflow",
  },

  // Blog Editor specific messages
  BLOG_EDITOR: {
    GOING_TO_NEW: "Going to new blog post editor",
    CREATING_POST: (title?: string, content?: string) =>
      `Creating blog post${title ? ` with title: "${title}"` : ""}${content ? ` and content` : ""}`,
    FILLING_TITLE: (title: string) => `Filling title: "${title}"`,
    FILLING_CONTENT: (content: string) => `Filling content: "${content}"`,
    SAVING_POST: "Saving blog post",
    POST_SAVED: "Blog post saved successfully",
  },

  // Setup and teardown messages
  SETUP: {
    STARTING_GLOBAL: "🌍 Starting global setup...",
    ADMIN_CREDENTIALS_WARNING:
      "⚠️ Admin credentials not configured - tests requiring auth may be skipped",
    USING_BASE_URL: (url: string) => `🌐 Using base URL: ${url}`,
    PERFORMING_AUTH: "🔐 Performing admin authentication...",
    LOGIN_VERIFIED: "✅ Admin login verified successfully",
    AUTH_STATE_SAVED: (path: string) =>
      `💾 Authentication state saved to: ${path}`,
    COMPLETED_SUCCESSFULLY: "✅ Global setup completed successfully",
    FAILED: (error: any) => `❌ Global setup failed: ${error}`,

    // Auth setup specific messages
    SETTING_UP_ADMIN_AUTH: "🔐 Setting up admin authentication using POM...",
    ADMIN_AUTH_COMPLETED:
      "✅ Admin authentication setup completed successfully",
    ADMIN_AUTH_FAILED: (error: any) =>
      `❌ Admin authentication setup failed: ${error}`,
    SKIPPING_TEST_USER:
      "⏭️ Skipping test user authentication - no credentials configured",
    SETTING_UP_TEST_USER: "👤 Setting up test user authentication...",
    TEST_USER_COMPLETED: "✅ Test user authentication setup completed",
    TEST_USER_FAILED: (error: any) =>
      `⚠️ Test user authentication failed (this is not critical): ${error}`,
    ENSURING_AUTH_DIR: "📁 Ensuring auth directory exists...",
    CREATED_AUTH_DIR: (dir: string) => `✅ Created auth directory: ${dir}`,
    AUTH_DIR_EXISTS: (dir: string) =>
      `📂 Auth directory already exists: ${dir}`,
    CREATED_SCREENSHOTS_DIR: (dir: string) =>
      `✅ Created screenshots directory: ${dir}`,
    FAILED_CREATE_AUTH_DIR: (error: any) =>
      `❌ Failed to create auth directory: ${error}`,
    VALIDATING_AUTH_FILES: "🔍 Validating authentication files...",
    AUTH_FILE_VALIDATED: "✅ Admin authentication file validated successfully",
    AUTH_VALIDATION_FAILED: (error: any) =>
      `❌ Authentication validation failed: ${error}`,
  },

  TEARDOWN: {
    STARTING_DATA_CLEANUP: "🧹 Starting test data cleanup...",
    AUTH_FAILED_CLEANUP:
      "⚠️ Could not authenticate for cleanup - skipping API cleanup",
    AUTHENTICATED_FOR_CLEANUP: "✅ Authenticated for cleanup operations",
    DATA_CLEANUP_COMPLETED: "✅ Test data cleanup completed successfully",
    DATA_CLEANUP_WARNING: (error: any) =>
      `⚠️ Test data cleanup warning: ${error}`,
    STARTING_FILE_CLEANUP: "🗄 Starting file cleanup...",
    PRESERVING_AUTH_FILE: (file: string) =>
      `💾 Preserving auth file for debugging: ${file}`,
    AUTH_FILE_PRESERVED: (file: string) => `💾 Auth file preserved: ${file}`,
    CLEANED_TEMP_DIR: (dir: string) =>
      `🗺️ Cleaned up temporary directory: ${dir}`,
    TEMP_DIR_WARNING: (dir: string, error: any) =>
      `Warning cleaning directory ${dir}: ${error}`,
    TEST_RESULTS_LOCATION: (path: string, time: string) =>
      `📈 Test results available in: ${path} (modified: ${time})`,
    FILE_CLEANUP_COMPLETED: "✅ File cleanup completed",
    FILE_CLEANUP_WARNING: (error: any) => `⚠️ File cleanup warning: ${error}`,
    GENERATING_SUMMARY: "📊 Generating test run summary...",
    SUMMARY_SAVED: (path: string) => `📝 Test run summary saved to: ${path}`,
    SUMMARY_WARNING: (error: any) =>
      `⚠️ Could not generate test summary: ${error}`,
    COMPLETED_SUCCESSFULLY: "✅ Global teardown completed successfully",
  },

  // Test fixture messages
  FIXTURES: {
    SETUP_ADMIN_PAGE: "🔐 Setting up pre-authenticated admin page",
    ADMIN_AUTH_VERIFIED: "✅ Admin authentication verified",
    ADMIN_PAGE_SETUP_FAILED: (error: any) =>
      `❌ Admin page setup failed: ${error}`,
    SETUP_GUEST_PAGE: "👤 Setting up guest page (no authentication)",
    CREATING_API_CONTEXT: (url: string) =>
      `🌐 Creating API context for: ${url}`,
    API_CONTEXT_DISPOSED: "🗼️ API context disposed",
    INITIALIZING_API_CLIENT: "🔧 Initializing authenticated API client",
    API_CLIENT_AUTHENTICATED: "✅ API client authenticated successfully",
    API_CLIENT_AUTH_FAILED:
      "⚠️ API client authentication failed - some operations may not work",
    API_CLIENT_AUTH_ERROR: (error: any) =>
      `⚠️ API client authentication error: ${error}`,
    API_CLIENT_LOGGED_OUT: "👋 API client logged out",
    API_LOGOUT_ERROR: (error: any) =>
      `API logout error (non-critical): ${error}`,
  },
} as const;

// Default export for easy usage
export default TEST_MESSAGES;
