# E2E Tests

Playwright end-to-end testing framework with TypeScript and Page Object Model.

## Table of Contents

- [Setup](#setup)
- [Environment](#environment)
- [GitHub Secrets](#github-secrets)
- [Run Tests](#run-tests)
- [Docker](#docker)
  - [Build and Run](#build-and-run)
  - [Option 1: Direct Docker Commands](#option-1-direct-docker-commands)
  - [Option 2: Docker Compose (Recommended)](#option-2-docker-compose)
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

### Option 1: Direct Docker Commands

```bash
# Build the image (uses 'base' stage by default)
docker build -t regina-e2e-tests .

# Run against LOCALHOST (app on your Mac)
# IMPORTANT: use host.docker.internal so the container can reach your host
# Smoke:
docker run --init --ipc=host --rm \
  -e TARGET=local \
  -e TEST_BASE_URL_LOCAL=http://host.docker.internal:3000 \
  -e API_BASE_URL_LOCAL=http://host.docker.internal:3001/api \
  regina-e2e-tests npm run test:smoke
# All tests:
docker run --init --ipc=host --rm \
  -e TARGET=local \
  -e TEST_BASE_URL_LOCAL=http://host.docker.internal:3000 \
  -e API_BASE_URL_LOCAL=http://host.docker.internal:3001/api \
  regina-e2e-tests

# Run against PROD (replace with your real URLs)
# Smoke:
docker run --init --ipc=host --rm \
  -e TARGET=prod \
  -e TEST_BASE_URL_PROD=https://your-domain.com \
  -e API_BASE_URL_PROD=https://your-domain.com/api \
  regina-e2e-tests npm run test:smoke
# All tests:
docker run --init --ipc=host --rm \
  -e TARGET=prod \
  -e TEST_BASE_URL_PROD=https://your-domain.com \
  -e API_BASE_URL_PROD=https://your-domain.com/api \
  regina-e2e-tests

# Save results locally (optional)
docker run --init --ipc=host --rm \
  -e TARGET=local \
  -e TEST_BASE_URL_LOCAL=http://host.docker.internal:3000 \
  -e API_BASE_URL_LOCAL=http://host.docker.internal:3001/api \
  -v $(pwd)/test-results:/home/pwuser/app/test-results \
  regina-e2e-tests
```

### Option 2: Docker Compose

```bash
# Local development testing
docker-compose -f docker-compose.dev.yml up e2e-tests
docker-compose -f docker-compose.dev.yml up smoke-tests

# Production testing
docker-compose -f docker-compose.prod.yml up smoke-tests
docker-compose -f docker-compose.prod.yml up e2e-tests
```

### Build Targets

The Dockerfile has different stages:

- **base** (default): Standard testing
- **development**: Includes debugging tools
- **ci**: Optimized for CI/CD

```bash
# Build specific target
docker build --target development -t regina-e2e-dev .
```

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
