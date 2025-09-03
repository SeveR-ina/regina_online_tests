/**
 * Test Constants and Configuration
 * Centralized location for all non-confidential constants used across tests and page objects
 * NOTE: All sensitive data (credentials, API keys, etc.) should come from environment variables
 */

/**
 * Timeout Constants (in milliseconds)
 */
export const TIMEOUTS = {
  // Default timeouts
  DEFAULT: 10000,
  SHORT: 5000,
  MEDIUM: 15000,
  LONG: 30000,
  EXTRA_LONG: 60000,

  // Specific action timeouts
  PAGE_LOAD: 30000,
  ELEMENT_VISIBLE: 10000,
  ELEMENT_HIDDEN: 5000,
  CLICK: 10000,
  FILL: 10000,
  TYPE: 15000,
  SELECT: 10000,
  UPLOAD: 30000,
  DOWNLOAD: 45000,

  // API timeouts
  API_REQUEST: 15000,
  API_SLOW: 30000,

  // Animation and transition timeouts
  ANIMATION: 3000,
  TRANSITION: 2000,
  FADE: 1000,

  // Form submission timeouts
  FORM_SUBMIT: 20000,
  LOGIN: 15000,
  LOGOUT: 10000,

  // Navigation timeouts
  NAVIGATION: 30000,
  REDIRECT: 15000,

  // Database and heavy operations
  DATABASE_OPERATION: 45000,
  BULK_OPERATION: 60000,
  BACKUP_RESTORE: 300000, // 5 minutes for backup/restore operations

  // Polling and retry timeouts
  POLLING_INTERVAL: 1000,
  RETRY_DELAY: 2000,
  STABILITY_CHECK: 3000,
} as const;

/**
 * Common Application Paths (PUBLIC ROUTES ONLY)
 * All sensitive/protected paths should be stored in environment variables
 */
export const PATHS = {
  // Public pages only (safe to expose)
  HOME: "/",
  ABOUT: "/about",
  CONTACT: "/contact",
  BLOG: "/blog",
  PROJECTS: "/projects",
  LINKS: "/links",
  CV: "/cv",

  // Error pages (standard)
  NOT_FOUND: "/404",
  SERVER_ERROR: "/500",
} as const;

/**
 * Functions to get sensitive paths from environment variables
 * These keep the actual sensitive paths private
 */
export const getProtectedPaths = () => ({
  // Protected area paths (from env vars)
  PROTECTED_AREA: process.env.PROTECTED_AREA_PATH ?? "",
  PROTECTED_LOGIN: process.env.PROTECTED_LOGIN_PATH ?? "",
  PROTECTED_DASHBOARD: process.env.PROTECTED_DASHBOARD_PATH ?? "",
  PROTECTED_CONTENT: process.env.PROTECTED_CONTENT_PATH ?? "",
  PROTECTED_CONTENT_CREATE: process.env.PROTECTED_CONTENT_CREATE_PATH ?? "",
  PROTECTED_CONTENT_EDIT: process.env.PROTECTED_CONTENT_EDIT_PATH ?? "",
  PROTECTED_USERS: process.env.PROTECTED_USERS_PATH ?? "",
  PROTECTED_BACKUP: process.env.PROTECTED_BACKUP_PATH ?? "",
  PROTECTED_SECURITY: process.env.PROTECTED_SECURITY_PATH ?? "",
  PROTECTED_SETTINGS: process.env.PROTECTED_SETTINGS_PATH ?? "",

  // Auth paths (from env vars)
  LOGIN: process.env.LOGIN_PATH ?? "",
  LOGOUT: process.env.LOGOUT_PATH ?? "",
  REGISTER: process.env.REGISTER_PATH ?? "",
  FORGOT_PASSWORD: process.env.FORGOT_PASSWORD_PATH ?? "",
  RESET_PASSWORD: process.env.RESET_PASSWORD_PATH ?? "",
});

/**
 * Functions to get sensitive API paths from environment variables
 */
export const getProtectedApiPaths = () => ({
  // Protected API endpoints (from env vars)
  PROTECTED_API_STATS: process.env.PROTECTED_API_STATS_PATH ?? "",
  PROTECTED_API_USERS: process.env.PROTECTED_API_USERS_PATH ?? "",
  AUTH_API_LOGIN: process.env.AUTH_API_LOGIN_PATH ?? "",
  AUTH_API_LOGOUT: process.env.AUTH_API_LOGOUT_PATH ?? "",
  AUTH_API_PROFILE: process.env.AUTH_API_PROFILE_PATH ?? "",
});

/**
 * Sample Non-Sensitive Test Data
 */
export const TEST_DATA = {
  // Sample blog data (non-confidential)
  BLOG: {
    SAMPLE_TITLE: "Sample Test Blog Post",
    SAMPLE_EXCERPT: "This is a sample blog post excerpt for testing purposes",
    SAMPLE_CONTENT:
      "This is sample content for a test blog post with some **markdown** formatting and multiple paragraphs.\n\n## Sample Heading\n\nMore content here.",
    SAMPLE_TAGS: ["test", "automation", "playwright", "sample"],
    SAMPLE_CATEGORY: "Technology",
    STATUS: {
      DRAFT: "draft",
      PUBLISHED: "published",
      SCHEDULED: "scheduled",
    },
    VISIBILITY: {
      PUBLIC: "public",
      PRIVATE: "private",
      PASSWORD: "password",
    },
  },

  // Sample form data (non-sensitive)
  CONTACT_FORM: {
    SAMPLE_NAME: "John Doe",
    SAMPLE_EMAIL: "john.doe@example.com",
    SAMPLE_SUBJECT: "Test Subject for Contact Form",
    SAMPLE_MESSAGE:
      "This is a sample message for automated testing purposes. It contains multiple sentences to test text area functionality.",
  },

  // Sample search terms
  SEARCH: {
    VALID: [
      "react",
      "typescript",
      "javascript",
      "web development",
      "frontend",
      "backend",
    ],
    INVALID: ["", "   ", "\n\t"],
    SPECIAL: ["café", "naïve", "test@example.com", "test-123"],
    LONG_TEXT:
      "This is a very long search query that might be used to test the maximum length limits of search functionality in the application",
  },

  // Sample file names (not actual file paths)
  FILES: {
    IMAGES: {
      SMALL: "small-test-image.jpg",
      LARGE: "large-test-image.png",
      SAMPLE_ALT_TEXT: "Sample image for testing",
    },
    DOCUMENTS: {
      PDF: "sample-document.pdf",
      TXT: "sample-text-file.txt",
    },
  },

  // Sample user data (non-confidential structure)
  USER_FIELDS: {
    NAME_FIELD: "name",
    EMAIL_FIELD: "email",
    PASSWORD_FIELD: "password",
    CONFIRM_PASSWORD_FIELD: "confirmPassword",
    FIRST_NAME_FIELD: "firstName",
    LAST_NAME_FIELD: "lastName",
  },

  // Application specific data
  SITE_INFO: {
    OWNER_NAME: "Regina Chepkunova",
    SITE_TITLE:
      "Regina Chepkunova - QA Engineer Berlin - Software Testing Expert",
    DEFAULT_DESCRIPTION_MIN_LENGTH: 50,
    OG_TITLE_MIN_LENGTH: 1,
  },

  // Performance thresholds
  PERFORMANCE: {
    MAX_PAGE_LOAD_TIME: 5000,
    MAX_SEARCH_TIME: 3000,
    MAX_LCP: 2500, // Largest Contentful Paint
    MAX_CLS: 0.1, // Cumulative Layout Shift
  },
} as const;

/**
 * Common CSS Selectors and Data Attributes
 */
export const SELECTORS = {
  // Common attribute selectors
  DATA_TESTID: (testId: string) => `[data-testid="${testId}"]`,
  DATA_CY: (cy: string) => `[data-cy="${cy}"]`,
  CLASS: (className: string) => `.${className}`,
  ID: (id: string) => `#${id}`,
  ARIA_LABEL: (label: string) => `[aria-label="${label}"]`,
  PLACEHOLDER: (placeholder: string) => `[placeholder="${placeholder}"]`,

  // Form selectors
  FORM: {
    INPUT: "input",
    TEXTAREA: "textarea",
    SELECT: "select",
    BUTTON: "button",
    SUBMIT: 'button[type="submit"], input[type="submit"]',
    RESET: 'button[type="reset"], input[type="reset"]',
    CHECKBOX: 'input[type="checkbox"]',
    RADIO: 'input[type="radio"]',
    FILE: 'input[type="file"]',
    EMAIL: 'input[type="email"]',
    PASSWORD: 'input[type="password"]',
    TEXT: 'input[type="text"]',
  },

  // Common UI elements
  UI: {
    MODAL: ".modal, [role='dialog']",
    MODAL_BACKDROP: ".modal-backdrop, .overlay",
    LOADING: ".loading, .spinner, [data-loading='true']",
    ERROR_MESSAGE: ".error, .alert-danger, [role='alert']",
    SUCCESS_MESSAGE: ".success, .alert-success",
    WARNING_MESSAGE: ".warning, .alert-warning",
    INFO_MESSAGE: ".info, .alert-info",
    TOOLTIP: ".tooltip, [role='tooltip']",
    DROPDOWN: ".dropdown, [role='menu']",
    TAB: "[role='tab']",
    TABPANEL: "[role='tabpanel']",
    NAVIGATION: "nav, [role='navigation']",
    BREADCRUMB: ".breadcrumb, [role='breadcrumb']",
    PAGINATION: ".pagination, [role='navigation'][aria-label*='pagination']",
  },

  // Table selectors
  TABLE: {
    TABLE: "table",
    THEAD: "thead",
    TBODY: "tbody",
    TFOOT: "tfoot",
    ROW: "tr",
    HEADER: "th",
    CELL: "td",
    SORT_ASC: "[aria-sort='ascending']",
    SORT_DESC: "[aria-sort='descending']",
  },
} as const;

/**
 * Browser and Viewport Constants
 */
export const BROWSER = {
  // Viewport sizes for responsive testing
  VIEWPORT: {
    MOBILE_SMALL: { width: 320, height: 568, name: "Mobile Small" },
    MOBILE_MEDIUM: { width: 375, height: 667, name: "Mobile Medium" },
    MOBILE_LARGE: { width: 414, height: 896, name: "Mobile Large" },
    TABLET_PORTRAIT: { width: 768, height: 1024, name: "Tablet Portrait" },
    TABLET_LANDSCAPE: { width: 1024, height: 768, name: "Tablet Landscape" },
    DESKTOP_SMALL: { width: 1024, height: 768, name: "Desktop Small" },
    DESKTOP_MEDIUM: { width: 1440, height: 900, name: "Desktop Medium" },
    DESKTOP_LARGE: { width: 1920, height: 1080, name: "Desktop Large" },
  },

  // Breakpoint values (for reference)
  BREAKPOINTS: {
    MOBILE: 768,
    TABLET: 1024,
    DESKTOP: 1440,
  },
} as const;

/**
 * Test Configuration Constants
 */
export const TEST_CONFIG = {
  // Retry configuration
  RETRIES: {
    DEFAULT: 2,
    FLAKY_TESTS: 3,
    CRITICAL_TESTS: 1,
    NETWORK_DEPENDENT: 5,
  },

  // Parallel execution
  WORKERS: {
    CI: 4,
    LOCAL: 2,
    SINGLE: 1,
  },

  // Screenshot configuration
  SCREENSHOTS: {
    ON_FAILURE: "only-on-failure",
    ALWAYS: "on",
    NEVER: "off",
  },

  // Video recording
  VIDEO: {
    ON_FAILURE: "retain-on-failure",
    ALWAYS: "on",
    NEVER: "off",
  },

  // Test categories
  CATEGORIES: {
    SMOKE: "smoke",
    REGRESSION: "regression",
    CRITICAL: "critical",
    E2E: "e2e",
    API: "api",
    VISUAL: "visual",
    PERFORMANCE: "performance",
    ACCESSIBILITY: "accessibility",
  },

  // Test tags
  TAGS: {
    SLOW: "@slow",
    FAST: "@fast",
    STABLE: "@stable",
    FLAKY: "@flaky",
    SKIP: "@skip",
    TODO: "@todo",
  },
} as const;

/**
 * API Constants
 */
export const API = {
  // Public API endpoints (safe to expose)
  ENDPOINTS: {
    BLOG: "/blog",
    HEALTH: process.env.HEALTH_ENDPOINT_PATH ?? "/health",
  },

  // Service configuration
  SERVICES: {
    BACKEND_PORT: parseInt(process.env.BACKEND_SERVICE_PORT ?? "3001", 10),
  },

  // Health check response validation
  HEALTH_CHECK: {
    EXPECTED_STATUS: "OK",
    REQUIRED_FIELDS: ["status", "timestamp"],
  },

  // HTTP Status Codes
  STATUS: {
    OK: 200,
    CREATED: 201,
    ACCEPTED: 202,
    NO_CONTENT: 204,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    METHOD_NOT_ALLOWED: 405,
    CONFLICT: 409,
    UNPROCESSABLE_ENTITY: 422,
    INTERNAL_SERVER_ERROR: 500,
    BAD_GATEWAY: 502,
    SERVICE_UNAVAILABLE: 503,
  },

  // HTTP Methods
  METHODS: {
    GET: "GET",
    POST: "POST",
    PUT: "PUT",
    PATCH: "PATCH",
    DELETE: "DELETE",
    OPTIONS: "OPTIONS",
    HEAD: "HEAD",
  },

  // Content Types
  CONTENT_TYPES: {
    JSON: "application/json",
    FORM_DATA: "multipart/form-data",
    URL_ENCODED: "application/x-www-form-urlencoded",
    XML: "application/xml",
    TEXT: "text/plain",
    HTML: "text/html",
  },

  // Common headers
  HEADERS: {
    CONTENT_TYPE: "Content-Type",
    AUTHORIZATION: "Authorization",
    ACCEPT: "Accept",
    USER_AGENT: "User-Agent",
    CACHE_CONTROL: "Cache-Control",
    CORS: "Access-Control-Allow-Origin",
  },

  // Common header values
  HEADER_VALUES: {
    PLAYWRIGHT_USER_AGENT: "Playwright-Test-Runner",
    JSON_CONTENT_TYPE: "application/json",
    ACCEPT_JSON: "application/json",
  },
} as const;

/**
 * Test Fixtures Constants
 */
export const FIXTURES = {
  // Storage state paths
  STORAGE_STATE: {
    ADMIN: "e2e/.auth/admin.json",
    TEST_USER: "e2e/.auth/testuser.json",
  },

  // Fixture error messages
  ERROR_MESSAGES: {
    ADMIN_AUTH_INVALID:
      "Admin authentication state is invalid - redirected to login",
    ADMIN_AUTH_FILE_NOT_FOUND: "Admin authentication file not found",
    AUTH_FILE_INVALID_FORMAT: "Invalid auth file format",
    AUTH_STATE_INVALID: "Authentication state is invalid - redirected to login",
  },

  // API context configuration
  API_CONTEXT: {
    TIMEOUT: 30000,
    DEFAULT_HEADERS: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "User-Agent": "Playwright-Test-Runner",
    },
  },
} as const;

/**
 * Page Titles and Text Constants
 * Based on actual titles from the website project
 */
export const PAGE_TITLES = {
  // Admin area page titles (from actual components)
  ADMIN: {
    DASHBOARD: "Admin Dashboard",
  },
} as const;

/**
 * Common Error Messages (for UI validation)
 */
export const ERROR_MESSAGES = {
  // Element errors
  ELEMENT_NOT_FOUND: "Element not found",
  ELEMENT_NOT_VISIBLE: "Element is not visible",
  ELEMENT_NOT_CLICKABLE: "Element is not clickable",
  ELEMENT_NOT_ENABLED: "Element is not enabled",

  // Form validation errors (common patterns)
  FORM_VALIDATION_FAILED: "Form validation failed",
  REQUIRED_FIELD_EMPTY: "This field is required",
  INVALID_EMAIL: "Please enter a valid email address",
  PASSWORD_TOO_SHORT: "Password must be at least 8 characters",
  PASSWORDS_DONT_MATCH: "Passwords do not match",

  // Navigation errors
  PAGE_NOT_LOADED: "Page did not load properly",
  NAVIGATION_TIMEOUT: "Navigation timeout exceeded",
  UNEXPECTED_URL: "Unexpected URL after navigation",

  // File operation errors
  FILE_UPLOAD_FAILED: "File upload failed",
  FILE_DOWNLOAD_FAILED: "File download failed",
  INVALID_FILE_TYPE: "Invalid file type",
  FILE_TOO_LARGE: "File size exceeds limit",
} as const;

/**
 * Success Messages (for UI validation)
 */
export const SUCCESS_MESSAGES = {
  // Form success
  FORM_SUBMITTED: "Form submitted successfully",
  DATA_SAVED: "Data saved successfully",
  CHANGES_SAVED: "Changes saved successfully",

  // CRUD operations
  CREATED: "Created successfully",
  UPDATED: "Updated successfully",
  DELETED: "Deleted successfully",

  // File operations
  UPLOAD_SUCCESS: "File uploaded successfully",
  DOWNLOAD_SUCCESS: "File downloaded successfully",
} as const;

/**
 * Environment Variable Names (for reference - values come from .env)
 */
export const ENV_VARS = {
  // Base URLs
  TEST_BASE_URL_LOCAL: "TEST_BASE_URL_LOCAL",
  TEST_BASE_URL_STAGING: "TEST_BASE_URL_STAGING",
  TEST_BASE_URL_PROD: "TEST_BASE_URL_PROD",

  // API URLs
  API_BASE_URL_LOCAL: "API_BASE_URL_LOCAL",
  API_BASE_URL_STAGING: "API_BASE_URL_STAGING",
  API_BASE_URL_PROD: "API_BASE_URL_PROD",

  // Credentials (values must come from .env)
  ADMIN_EMAIL: "ADMIN_EMAIL",
  ADMIN_PASSWORD: "ADMIN_PASSWORD",
  TEST_USER_EMAIL: "TEST_USER_EMAIL",
  TEST_USER_PASSWORD: "TEST_USER_PASSWORD",

  // Configuration
  CI: "CI",
  DOCKER: "DOCKER",
  TARGET: "TARGET",
  LOG_LEVEL: "LOG_LEVEL",
  PARALLEL_WORKERS: "PARALLEL_WORKERS",

  // Test configuration
  HEADLESS: "HEADLESS",
  SLOWMO: "SLOWMO",
  DEBUG: "DEBUG",
  SCREENSHOT_MODE: "SCREENSHOT_MODE",
  VIDEO_MODE: "VIDEO_MODE",
} as const;

/**
 * Regular Expressions for validation
 */
export const REGEX = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  URL: /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)$/,
  PHONE: /^[+]?[1-9][\d]{0,15}$/,
  PASSWORD_STRONG:
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
  UUID: /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
  DATE_ISO: /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z?$/,
  SLUG: /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
  HEX_COLOR: /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/,
} as const;

/**
 * File Extensions and MIME Types
 */
export const FILE_TYPES = {
  IMAGES: {
    JPEG: { ext: ".jpg", mime: "image/jpeg" },
    PNG: { ext: ".png", mime: "image/png" },
    GIF: { ext: ".gif", mime: "image/gif" },
    WEBP: { ext: ".webp", mime: "image/webp" },
    SVG: { ext: ".svg", mime: "image/svg+xml" },
  },

  DOCUMENTS: {
    PDF: { ext: ".pdf", mime: "application/pdf" },
    DOC: { ext: ".doc", mime: "application/msword" },
    DOCX: {
      ext: ".docx",
      mime: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    },
    TXT: { ext: ".txt", mime: "text/plain" },
    CSV: { ext: ".csv", mime: "text/csv" },
  },

  ARCHIVES: {
    ZIP: { ext: ".zip", mime: "application/zip" },
    RAR: { ext: ".rar", mime: "application/vnd.rar" },
    TAR: { ext: ".tar", mime: "application/x-tar" },
  },
} as const;

/**
 * Accessibility Constants
 */
export const A11Y = {
  ARIA_ROLES: {
    BUTTON: "button",
    LINK: "link",
    TEXTBOX: "textbox",
    CHECKBOX: "checkbox",
    RADIO: "radio",
    COMBOBOX: "combobox",
    LISTBOX: "listbox",
    OPTION: "option",
    TAB: "tab",
    TABPANEL: "tabpanel",
    DIALOG: "dialog",
    ALERT: "alert",
    STATUS: "status",
    BANNER: "banner",
    NAVIGATION: "navigation",
    MAIN: "main",
    COMPLEMENTARY: "complementary",
    CONTENTINFO: "contentinfo",
  },

  ARIA_STATES: {
    EXPANDED: "aria-expanded",
    SELECTED: "aria-selected",
    CHECKED: "aria-checked",
    DISABLED: "aria-disabled",
    HIDDEN: "aria-hidden",
    PRESSED: "aria-pressed",
    CURRENT: "aria-current",
    LIVE: "aria-live",
    ATOMIC: "aria-atomic",
    RELEVANT: "aria-relevant",
  },
} as const;

/**
 * Animation and Transition Constants
 */
export const ANIMATIONS = {
  // Common CSS animation durations (in ms)
  DURATION: {
    FAST: 150,
    NORMAL: 300,
    SLOW: 500,
    EXTRA_SLOW: 1000,
  },

  // Common easing functions
  EASING: {
    EASE: "ease",
    EASE_IN: "ease-in",
    EASE_OUT: "ease-out",
    EASE_IN_OUT: "ease-in-out",
    LINEAR: "linear",
  },
} as const;

/**
 * Performance Thresholds
 */
export const PERFORMANCE = {
  // Page load time thresholds (in ms)
  LOAD_TIME: {
    EXCELLENT: 1000,
    GOOD: 2500,
    ACCEPTABLE: 5000,
  },

  // Core Web Vitals thresholds
  LCP: { GOOD: 2500, NEEDS_IMPROVEMENT: 4000 }, // Largest Contentful Paint
  FID: { GOOD: 100, NEEDS_IMPROVEMENT: 300 }, // First Input Delay
  CLS: { GOOD: 0.1, NEEDS_IMPROVEMENT: 0.25 }, // Cumulative Layout Shift
} as const;

// Type exports for better TypeScript support
export type TimeoutKey = keyof typeof TIMEOUTS;
export type AppPath = keyof typeof PATHS;
export type ViewportSize = keyof typeof BROWSER.VIEWPORT;
export type HTTPStatus = keyof typeof API.STATUS;
export type TestCategory = keyof typeof TEST_CONFIG.CATEGORIES;
export type AriaRole = keyof typeof A11Y.ARIA_ROLES;
export type FileExtension =
  | keyof typeof FILE_TYPES.IMAGES
  | keyof typeof FILE_TYPES.DOCUMENTS;
