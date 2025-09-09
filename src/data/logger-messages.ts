/**
 * Centralized logger messages for test execution
 * Provides consistent and reusable log messages for better test reporting
 */

/**
 * Test execution status messages
 */
export const TEST_MESSAGES = {
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
