/**
 * Enhanced logger implementation with module-specific logging
 * Based on best practices from enterprise test frameworks
 */

import winston from "winston";

export interface LoggerOptions {
  level?: string;
  enableFileLogging?: boolean;
  enableConsoleLogging?: boolean;
  logDirectory?: string;
}

export class Logger {
  readonly module: string;
  private static loggers: Map<string, winston.Logger> = new Map();
  private static defaultOptions: LoggerOptions = {
    level: process.env.LOG_LEVEL ?? "info",
    enableFileLogging: true,
    enableConsoleLogging: true,
    logDirectory: "test-results",
  };

  constructor(module: string, options: LoggerOptions = {}) {
    this.module = module;

    if (!Logger.loggers.has(module)) {
      const mergedOptions = { ...Logger.defaultOptions, ...options };
      Logger.loggers.set(module, this.createLogger(mergedOptions));
    }
  }

  private createLogger(options: LoggerOptions): winston.Logger {
    const logFormat = winston.format.printf(
      ({ level, message, timestamp, module, stack }) => {
        const modulePrefix = module ? `[${module}]` : "";
        return `${timestamp} ${level.toUpperCase()} ${modulePrefix}: ${stack ?? message}`;
      }
    );

    const transports: winston.transport[] = [];

    if (options.enableConsoleLogging) {
      transports.push(
        new winston.transports.Console({
          level: options.level,
          format: winston.format.combine(
            winston.format.colorize(),
            winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
            winston.format.errors({ stack: true }),
            logFormat
          ),
        })
      );
    }

    if (options.enableFileLogging) {
      transports.push(
        new winston.transports.File({
          filename: `${options.logDirectory}/test-execution.log`,
          level: "debug",
          format: winston.format.combine(
            winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
            winston.format.errors({ stack: true }),
            logFormat
          ),
        })
      );
    }

    return winston.createLogger({
      level: options.level,
      transports,
      defaultMeta: { module: this.module },
    });
  }

  private getLogger(): winston.Logger {
    return Logger.loggers.get(this.module)!;
  }

  info(message: string): void {
    this.getLogger().info(message);
  }

  debug(message: string): void {
    if (process.env.DEBUG ?? process.env.LOG_LEVEL === "debug") {
      this.getLogger().debug(message);
    }
  }

  warn(message: string): void {
    this.getLogger().warn(message);
  }

  error(message: string, error?: Error): void {
    if (error) {
      this.getLogger().error(message, { stack: error.stack });
    } else {
      this.getLogger().error(message);
    }
  }

  step(message: string): void {
    this.info(`STEP: ${message}`);
  }

  action(message: string): void {
    this.debug(`ACTION: ${message}`);
  }

  assertion(message: string): void {
    this.debug(`ASSERTION: ${message}`);
  }

  result(message: string, success: boolean): void {
    if (success) {
      this.info(`✓ ${message}`);
    } else {
      this.warn(`✗ ${message}`);
    }
  }

  timing(label: string, startTime: number): void {
    const duration = Date.now() - startTime;
    this.debug(`TIMING [${label}]: ${duration}ms`);
  }

  static createModuleLogger(
    moduleName: string,
    options?: LoggerOptions
  ): Logger {
    return new Logger(moduleName, options);
  }

  static setGlobalLogLevel(level: string): void {
    Logger.defaultOptions.level = level;
    // Update existing loggers
    Logger.loggers.forEach(logger => {
      logger.level = level;
    });
  }

  static clearLogs(): void {
    Logger.loggers.clear();
  }
}

// Export pre-configured loggers for common modules
export const testLogger = new Logger("TEST");
export const pageLogger = new Logger("PAGE");
export const apiLogger = new Logger("API");
export const setupLogger = new Logger("SETUP");
export const teardownLogger = new Logger("TEARDOWN");
export const configLogger = new Logger("CONFIG");
export const reportLogger = new Logger("REPORT");

// Export logger messages constants
export const LOGGER_MESSAGES = {
  TEST: {
    STARTED: "Test started",
    COMPLETED: "Test completed",
    FAILED: "Test failed",
    SKIPPED: "Test skipped",
    RETRYING: "Test retrying",
  },
  PAGE: {
    NAVIGATING: "Navigating to page",
    LOADED: "Page loaded successfully",
    LOAD_FAILED: "Page load failed",
    ELEMENT_FOUND: "Element found",
    ELEMENT_NOT_FOUND: "Element not found",
    CLICKING: "Clicking element",
    TYPING: "Typing in element",
    SCROLLING: "Scrolling to element",
  },
  API: {
    REQUEST_SENT: "API request sent",
    RESPONSE_RECEIVED: "API response received",
    REQUEST_FAILED: "API request failed",
    INVALID_RESPONSE: "Invalid API response",
    TIMEOUT: "API request timeout",
  },
  SETUP: {
    STARTING: "Setup starting",
    COMPLETED: "Setup completed",
    FAILED: "Setup failed",
    AUTH_SUCCESS: "Authentication successful",
    AUTH_FAILED: "Authentication failed",
  },
  CONFIG: {
    LOADING: "Loading configuration",
    LOADED: "Configuration loaded",
    VALIDATION_FAILED: "Configuration validation failed",
    ENV_DETECTED: "Environment detected",
    FEATURE_ENABLED: "Feature enabled",
    FEATURE_DISABLED: "Feature disabled",
  },
  ASSERTION: {
    PASSED: "Assertion passed",
    FAILED: "Assertion failed",
    SOFT_FAILED: "Soft assertion failed",
    COMPARING: "Comparing values",
    VALIDATING: "Validating condition",
  },
} as const;

// Default logger instance for backwards compatibility
export const logger = testLogger;
