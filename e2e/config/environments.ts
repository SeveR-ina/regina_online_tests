/**
 * Centralized environment configuration with type safety
 * Supports local development and production environments only
 */

export type Environment = "local" | "prod";
export type TestType =
  | "smoke"
  | "regression"
  | "smoke-desktop"
  | "smoke-mobile"
  | "regression-desktop"
  | "regression-mobile";

export interface EnvironmentConfig {
  name: Environment;
  baseURL: string;
  apiBaseURL: string;
  description: string;
  retries: number;
  timeout: number;
  workers: number | string;
  headless: boolean;
  features: {
    auth: boolean;
    api: boolean;
    screenshots: boolean;
    videos: boolean;
    tracing: boolean;
  };
}

/**
 * Environment configurations
 */
export const ENVIRONMENTS: Record<Environment, EnvironmentConfig> = {
  local: {
    name: "local",
    baseURL: "http://localhost:3000",
    apiBaseURL: "http://localhost:3000/api",
    description: "Local development environment",
    retries: 1,
    timeout: 60_000,
    workers: "auto",
    headless: false,
    features: {
      auth: true,
      api: true,
      screenshots: true,
      videos: true,
      tracing: true,
    },
  },
  prod: {
    name: "prod",
    baseURL: "https://reginaonline.de",
    apiBaseURL: "https://reginaonline.de/api",
    description: "Production environment - use with caution",
    retries: 2,
    timeout: 90_000,
    workers: 1,
    headless: true,
    features: {
      auth: true,
      api: true,
      screenshots: true,
      videos: false,
      tracing: false,
    },
  },
};

/**
 * Test type configurations for categorization
 */
export const TEST_TYPES: Record<
  TestType,
  {
    name: TestType;
    description: string;
    tags: string[];
    timeout: number;
    parallel: boolean;
  }
> = {
  smoke: {
    name: "smoke",
    description: "Quick validation tests",
    tags: ["@smoke"],
    timeout: 30_000,
    parallel: true,
  },
  regression: {
    name: "regression",
    description: "Full regression suite including smoke tests",
    tags: ["@regression", "@smoke"],
    timeout: 60_000,
    parallel: true,
  },
  "smoke-desktop": {
    name: "smoke-desktop",
    description: "Smoke tests for desktop browsers",
    tags: ["@smoke", "@desktop"],
    timeout: 30_000,
    parallel: true,
  },
  "smoke-mobile": {
    name: "smoke-mobile",
    description: "Smoke tests for mobile devices",
    tags: ["@smoke", "@mobile"],
    timeout: 45_000,
    parallel: true,
  },
  "regression-desktop": {
    name: "regression-desktop",
    description: "Regression tests for desktop browsers",
    tags: ["@regression", "@smoke", "@desktop"],
    timeout: 60_000,
    parallel: true,
  },
  "regression-mobile": {
    name: "regression-mobile",
    description: "Regression tests for mobile devices",
    tags: ["@regression", "@smoke", "@mobile"],
    timeout: 75_000,
    parallel: true,
  },
};

/**
 * Environment utilities
 */
export class EnvironmentManager {
  private static instance: EnvironmentManager;
  private currentEnvironment: Environment;

  private constructor() {
    this.currentEnvironment = this.detectEnvironment();
  }

  public static getInstance(): EnvironmentManager {
    if (!EnvironmentManager.instance) {
      EnvironmentManager.instance = new EnvironmentManager();
    }
    return EnvironmentManager.instance;
  }

  private detectEnvironment(): Environment {
    const target = process.env.TARGET as Environment;

    if (target && Object.keys(ENVIRONMENTS).includes(target)) {
      return target;
    }

    const baseURL =
      process.env.TEST_BASE_URL_LOCAL ?? process.env.TEST_BASE_URL_PROD;
    if (baseURL) {
      if (baseURL.includes("localhost") || baseURL.includes("127.0.0.1")) {
        return "local";
      }
      if (baseURL.includes("reginaonline.de")) {
        return "prod";
      }
    }

    return "local";
  }

  public getCurrentEnvironment(): EnvironmentConfig {
    return ENVIRONMENTS[this.currentEnvironment];
  }

  public getEnvironment(env: Environment): EnvironmentConfig {
    return ENVIRONMENTS[env];
  }

  public isProduction(): boolean {
    return this.currentEnvironment === "prod";
  }

  public isLocal(): boolean {
    return this.currentEnvironment === "local";
  }

  public getTestType(): TestType | undefined {
    const testType = process.env.TEST_TYPE as TestType;
    return testType && Object.keys(TEST_TYPES).includes(testType)
      ? testType
      : undefined;
  }

  public getTestTypeConfig(
    type?: TestType
  ): (typeof TEST_TYPES)[TestType] | undefined {
    const targetType = type ?? this.getTestType();
    return targetType ? TEST_TYPES[targetType] : undefined;
  }

  public validateEnvironment(env?: Environment): boolean {
    const environment = env ?? this.currentEnvironment;
    const config = ENVIRONMENTS[environment];

    if (!config) {
      return false;
    }

    const baseURLValid = this.isValidURL(config.baseURL);
    const apiURLValid = this.isValidURL(config.apiBaseURL);

    return baseURLValid && apiURLValid;
  }

  private isValidURL(urlString: string): boolean {
    const urlPattern = /^https?:\/\/[^\s/$.?#].[^\s]*$/i;
    return urlPattern.test(urlString);
  }

  public getPlaywrightConfig() {
    const config = this.getCurrentEnvironment();
    const isCI = !!process.env.CI;
    const isDocker = !!process.env.DOCKER;

    return {
      baseURL: config.baseURL,
      timeout: config.timeout,
      retries: isCI ? Math.max(config.retries, 2) : config.retries,
      workers: isDocker ? 1 : config.workers,
      headless: config.headless || isCI || isDocker,
      features: config.features,
    };
  }

  public getEnvironmentSummary(): string {
    const config = this.getCurrentEnvironment();
    const testType = this.getTestType();

    return [
      `Environment: ${config.name.toUpperCase()} (${config.description})`,
      `Base URL: ${config.baseURL}`,
      `API URL: ${config.apiBaseURL}`,
      testType ? `Test Type: ${testType}` : null,
      `Features: ${Object.entries(config.features)
        .filter(([, enabled]) => enabled)
        .map(([feature]) => feature)
        .join(", ")}`,
      `Workers: ${config.workers}`,
      `Retries: ${config.retries}`,
      `Timeout: ${config.timeout / 1000}s`,
    ]
      .filter(Boolean)
      .join("\n");
  }

  public getCurrentEnvironmentName(): Environment {
    return this.currentEnvironment;
  }
}

// Export singleton instance
export const environmentManager = EnvironmentManager.getInstance();
