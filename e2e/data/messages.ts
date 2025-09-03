/**
 * Centralized test assertion messages
 * Provides consistent and reusable error messages for test assertions
 */

/**
 * API-related assertion messages
 */
export const API_MESSAGES = {
  // General API responses
  SHOULD_RETURN_ARRAY: "API should return an array of blog posts",
  SHOULD_RETURN_OBJECT: "API should return blog posts result object",
  HEALTH_CHECK_TRUTHY: "API health check should return truthy value",
  POSTS_AS_ARRAY: "Blog posts should be returned as an array",

  // API errors and status codes
  NON_EXISTENT_ENDPOINT: "Non-existent endpoint should return 404 or 405",
  INVALID_BLOG_POST_ID: "Invalid blog post ID should return 404 or 400",
  NO_SERVER_ERROR: (endpoint: string) =>
    `${endpoint} should not return server error`,
  UNKNOWN_BLOG_SLUG: "Unknown blog slug should return 404 or 400 status",
} as const;

/**
 * Performance-related assertion messages
 */
export const PERFORMANCE_MESSAGES = {
  PAGE_LOAD_TIME: (maxTime: number) =>
    `Home page should load within ${maxTime}ms`,
  SEARCH_PERFORMANCE: (maxTime: number) =>
    `Blog search should complete within ${maxTime}ms`,
  BASELINE_PERFORMANCE: (maxTime: number) =>
    `Home page performance should be under ${maxTime}ms`,
  LCP_THRESHOLD: "LCP should be under 2.5 seconds for good user experience",
  CLS_THRESHOLD: "CLS should be under 0.1 for good user experience",
} as const;

/**
 * UI and authentication-related assertion messages
 */
export const UI_MESSAGES = {
  // Authentication and access control
  LOGIN_FORM_VISIBLE: "Login form should be visible for guests accessing admin",

  // Dashboard and statistics
  TOTAL_POSTS_NON_NEGATIVE: "Total posts count should be non-negative",
  PUBLISHED_POSTS_NON_NEGATIVE: "Published posts count should be non-negative",
  DRAFT_POSTS_NON_NEGATIVE: "Draft posts count should be non-negative",
} as const;

/**
 * SEO and meta tag assertion messages
 */
export const SEO_MESSAGES = {
  META_DESCRIPTION_PRESENT: "Meta description should be present on home page",
  META_DESCRIPTION_LENGTH:
    "Meta description should be at least 50 characters long",
  OG_TITLE_NOT_EMPTY: "Open Graph title should not be empty",
} as const;

/**
 * Error handling assertion messages
 */
export const ERROR_MESSAGES = {
  NOT_FOUND_REDIRECT:
    "404 page should return 404 or redirect to valid page (200)",
} as const;

/**
 * Combined messages object for easy access
 */
export const MESSAGES = {
  API: API_MESSAGES,
  PERFORMANCE: PERFORMANCE_MESSAGES,
  UI: UI_MESSAGES,
  SEO: SEO_MESSAGES,
  ERROR: ERROR_MESSAGES,
} as const;

/**
 * Utility function to create dynamic messages
 */
export const createMessage = {
  /**
   * Create API endpoint error message
   */
  apiEndpointError: (endpoint: string) =>
    `GET ${endpoint} should not return server error`,

  /**
   * Create performance threshold message
   */
  performanceThreshold: (context: string, maxTime: number) =>
    `${context} should complete within ${maxTime}ms`,

  /**
   * Create numeric comparison message
   */
  numericComparison: (field: string, comparison: string, value: number) =>
    `${field} should be ${comparison} ${value}`,

  /**
   * Create data type validation message
   */
  dataType: (field: string, expectedType: string) =>
    `${field} should be ${expectedType}`,
};

// Default export for easy usage
export default MESSAGES;
