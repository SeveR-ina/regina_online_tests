# E2E Tests

Playwright end-to-end testing framework with TypeScript and Page Object Model.

## Table of Contents

- [Setup](#setup)
- [Environment](#environment)
- [GitHub Secrets](#github-secrets)
- [Run Tests](#run-tests)
- [Docker](#docker)
  - [Development Testing](#development-testing)
  - [Production Testing](#production-testing)
  - [Docker Services](#docker-services)
  - [Build Targets](#build-targets)
  - [Volume Mounts](#volume-mounts)
- [Reports](#reports)
- [Test Tags](#test-tags)
- [Code Quality](#code-quality)

## Setup

```bash
npm install
npm run install:browsers
```

## Environment

Copy `.env.example` to `.env` and configure:

```
TARGET=local|prod
TEST_BASE_URL_LOCAL=http://localhost:3000
API_BASE_URL_LOCAL=http://localhost:3001/api
TEST_BASE_URL_PROD=https://your-domain.com
API_BASE_URL_PROD=https://your-domain.com/api
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=password
```

## GitHub Secrets

For CI/CD, add these repository secrets:

```
TEST_BASE_URL_PROD
API_BASE_URL_PROD
ADMIN_EMAIL
ADMIN_PASSWORD
```

## Run Tests

```bash
# Smoke tests (Chrome only)
npm run test:smoke

# Regression tests (all browsers)
npm run test:regression

# Specific suites
npm run test:ui
npm run test:api
npm run test:mobile

# Environment-specific
npm run test:smoke:prod
npm run test:smoke:local

# Debug
npm run test:headed
npm run test:debug
```

## Docker

Run tests in containerized environment with Docker Compose.

### Development Testing

For local development against `localhost:3000`:

```bash
# Full E2E test suite
docker-compose -f docker-compose.dev.yml up e2e-tests

# Quick smoke tests (Chrome only)
docker-compose -f docker-compose.dev.yml up smoke-tests

# Interactive debug mode
docker-compose -f docker-compose.dev.yml --profile debug up dev-runner

# Code generation tool
docker-compose -f docker-compose.dev.yml --profile codegen up codegen
```

### Production Testing

For testing against production environment:

```bash
# Set environment variables
export TEST_BASE_URL_PROD=https://your-domain.com
export API_BASE_URL_PROD=https://your-domain.com/api

# Quick smoke tests
docker-compose -f docker-compose.prod.yml up smoke-tests

# Full E2E test suite
docker-compose -f docker-compose.prod.yml up e2e-tests

# Comprehensive regression tests
docker-compose -f docker-compose.prod.yml --profile regression up regression-tests

# API-only tests
docker-compose -f docker-compose.prod.yml --profile api up api-tests
```

### Docker Services

| Service              | Purpose               | Configuration                  | Command                   |
| -------------------- | --------------------- | ------------------------------ | ------------------------- |
| **e2e-tests**        | Full test suite       | All browsers, full recording   | `npm run test`            |
| **smoke-tests**      | Quick validation      | Chrome only, minimal recording | `npm run test:smoke`      |
| **regression-tests** | Comprehensive testing | All browsers, traces enabled   | `npm run test:regression` |
| **api-tests**        | API testing only      | No browser, API endpoints      | `npm run test:api`        |
| **dev-runner**       | Debug mode            | Interactive, hot reload        | `npm run test:debug`      |
| **codegen**          | Code generation       | Interactive recorder           | `npm run codegen:local`   |

### Build Targets

- **production**: Optimized for CI/CD, minimal tools
- **development**: Full dev tools, debugging capabilities
- **ci**: GitHub Actions optimized, security hardened

### Volume Mounts

- `./test-results` - Test artifacts and reports
- `./playwright-report` - HTML reports
- `./logs` - Application logs (dev only)
- `.` - Source code (dev hot reload)

## Reports

```bash
npm run report
npm run show-trace
```

## Test Tags

- `@smoke` - Critical functionality (fast)
- `@regression` - Extended functionality (comprehensive)

## Code Quality

```bash
npm run lint
npm run lint:fix
npm run format
npm run type-check
```
