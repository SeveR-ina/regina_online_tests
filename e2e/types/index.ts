/**
 * Comprehensive TypeScript type definitions for the E2E test framework
 * Provides type safety across the entire test suite
 */

// Core test types
export type TestLevel = "smoke" | "regression";
export type DeviceType = "desktop" | "mobile";
export type Environment = "local" | "prod";
export type TestStatus = "passed" | "failed" | "skipped" | "broken";
export type BrowserType = "chromium" | "webkit" | "firefox";

// Test tags and categorization
export interface TestTags {
  level: TestLevel[];
  device: DeviceType[];
  feature: string[];
  priority: "low" | "medium" | "high" | "critical";
  category: "ui" | "api" | "e2e" | "integration";
}

// Configuration types
export interface TestConfig {
  environment: Environment;
  baseURL: string;
  apiBaseURL: string;
  timeout: number;
  retries: number;
  workers: number | string;
  headless: boolean;
  debug: boolean;
  slowMo?: number;
}

export interface BrowserConfig {
  name: BrowserType;
  viewport: {
    width: number;
    height: number;
  };
  userAgent?: string;
  locale?: string;
  timezone?: string;
}

// Page object types
export interface PageObject {
  readonly page: import("@playwright/test").Page;
  readonly url: string;
  navigate(): Promise<void>;
  waitForLoad(): Promise<void>;
  isLoaded(): Promise<boolean>;
}

export interface ComponentObject {
  readonly locator: import("@playwright/test").Locator;
  isVisible(): Promise<boolean>;
  click(): Promise<void>;
  getText(): Promise<string>;
}

// Test data types
export interface BlogPost {
  title: string;
  content: string;
  excerpt?: string;
  status: "draft" | "published";
  featured_image?: string;
  external_link?: string;
  hide_link?: boolean;
  seo_meta?: {
    title: string;
    description: string;
    keywords: string;
  };
  created_at?: string;
  updated_at?: string;
}

export interface User {
  name: string;
  email: string;
  password: string;
  role: "admin" | "user" | "editor";
  created_at?: string;
  last_login?: string;
}

export interface SearchQuery {
  term: string;
  category?: string;
  filters?: Record<string, any>;
  sortBy?: "date" | "relevance" | "title";
  sortOrder?: "asc" | "desc";
}

// API response types
export interface APIResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  errors?: string[];
  pagination?: {
    page: number;
    per_page: number;
    total: number;
    total_pages: number;
  };
}

export interface BlogPostAPI {
  id: number;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  status: "draft" | "published" | "archived";
  featured_image: string | null;
  external_link: string | null;
  hide_link: boolean;
  seo_title: string | null;
  seo_description: string | null;
  seo_keywords: string | null;
  created_at: string;
  updated_at: string;
  author: {
    id: number;
    name: string;
    email: string;
  };
}

// Error types
export interface TestError {
  name: string;
  message: string;
  stack?: string;
  screenshot?: string;
  video?: string;
  trace?: string;
  timestamp: string;
}

export interface ValidationError {
  field: string;
  message: string;
  code: string;
}

// Assertion types
export interface AssertionOptions {
  timeout?: number;
  message?: string;
  soft?: boolean;
  ignoreCase?: boolean;
}

export interface VisibilityOptions extends AssertionOptions {
  visible?: boolean;
}

export interface TextOptions extends AssertionOptions {
  exact?: boolean;
  trim?: boolean;
}

export interface CountOptions extends AssertionOptions {
  condition?: "equal" | "greater" | "less" | "greaterOrEqual" | "lessOrEqual";
}

// Locator strategies
export type LocatorStrategy =
  | "data-testid"
  | "id"
  | "class"
  | "css"
  | "xpath"
  | "text"
  | "role"
  | "label"
  | "placeholder";

export interface LocatorConfig {
  strategy: LocatorStrategy;
  value: string;
  options?: {
    exact?: boolean;
    hasText?: string;
    hasNotText?: string;
  };
}

// Test execution types
export interface TestStep {
  name: string;
  action: () => Promise<void>;
  timeout?: number;
  retries?: number;
  optional?: boolean;
}

export interface TestScenario {
  name: string;
  description: string;
  tags: Partial<TestTags>;
  preconditions?: TestStep[];
  steps: TestStep[];
  cleanup?: TestStep[];
}

// Reporting types
export interface TestResult {
  name: string;
  status: TestStatus;
  duration: number;
  error?: TestError;
  screenshots?: string[];
  videos?: string[];
  traces?: string[];
  tags: Partial<TestTags>;
  environment: Environment;
  browser: BrowserType;
  timestamp: string;
}

export interface TestSuite {
  name: string;
  tests: TestResult[];
  summary: {
    total: number;
    passed: number;
    failed: number;
    skipped: number;
    duration: number;
  };
  environment: Environment;
  timestamp: string;
}

// Utility types
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export type RequiredFields<T, K extends keyof T> = T & Required<Pick<T, K>>;

export type OptionalFields<T, K extends keyof T> = Omit<T, K> &
  Partial<Pick<T, K>>;

// Function types for common operations
export type NavigationFunction = (url?: string) => Promise<void>;
export type ClickFunction = (
  selector: string,
  options?: { timeout?: number; force?: boolean }
) => Promise<void>;
export type TypeFunction = (
  selector: string,
  text: string,
  options?: { clear?: boolean; timeout?: number }
) => Promise<void>;
export type WaitFunction = (
  selector: string,
  options?: { state?: "attached" | "visible" | "hidden"; timeout?: number }
) => Promise<void>;

// Generic types for data transformations
export type DataTransformer<T, U> = (input: T) => U;
export type DataValidator<T> = (data: T) => boolean;
export type DataGenerator<T> = (options?: Partial<T>) => T;

// Mock data types
export interface MockData {
  users: User[];
  blogPosts: BlogPost[];
  searchQueries: SearchQuery[];
}

export interface MockAPIResponse<T> {
  data: T;
  delay?: number;
  statusCode?: number;
  headers?: Record<string, string>;
}

// Constants that can be typed
export const TEST_TIMEOUTS = {
  SHORT: 5_000,
  MEDIUM: 10_000,
  LONG: 30_000,
  EXTRA_LONG: 60_000,
} as const;

export const TEST_PRIORITIES = {
  LOW: "low",
  MEDIUM: "medium",
  HIGH: "high",
  CRITICAL: "critical",
} as const;

export const ELEMENT_STATES = {
  ATTACHED: "attached",
  DETACHED: "detached",
  VISIBLE: "visible",
  HIDDEN: "hidden",
} as const;

// Re-export commonly used Playwright types with our naming convention
export type {
  Page,
  Locator,
  BrowserContext,
  Response,
  Request,
  APIResponse as PlaywrightAPIResponse,
} from "@playwright/test";
