# E2E test runner image for Playwright
# Align image and @playwright/test version to avoid browser mismatch

FROM mcr.microsoft.com/playwright:v1.55.0-noble AS base

# Use the built-in non-root user recommended by Playwright
# Ref: https://playwright.dev/docs/docker
USER pwuser
WORKDIR /home/pwuser/app

# Ensure npm cache directory exists and is writable
RUN mkdir -p /home/pwuser/.npm && chmod -R 700 /home/pwuser/.npm

# Prevent @playwright/test from attempting to download browsers
ENV PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1
ENV NODE_ENV=test
ENV CI=true

# 1) Install deps with better caching
COPY --chown=pwuser:pwuser package*.json ./
RUN npm ci --ignore-scripts && npm cache clean --force

# 2) Copy source
COPY --chown=pwuser:pwuser . .

# Optional: Playwright creates result folders automatically; keep if your tooling expects them
RUN mkdir -p test-results && chmod -R 755 test-results

# Default command (headless tests)
CMD ["npm", "run", "test"]

# Development stage with extra tools (kept separate to avoid bloating CI image)
FROM mcr.microsoft.com/playwright:v1.55.0-noble AS development
USER root
RUN apt-get update && apt-get install -y --no-install-recommends \
    curl wget vim \
  && rm -rf /var/lib/apt/lists/*
USER pwuser
WORKDIR /home/pwuser/app
ENV PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1
ENV NODE_ENV=test
ENV CI=true
COPY --chown=pwuser:pwuser package*.json ./
RUN npm ci --ignore-scripts && npm cache clean --force
COPY --chown=pwuser:pwuser . .
CMD ["npm", "run", "test:headed"]

# CI stage (lean; uses pwuser; no healthcheck)
FROM base AS ci
# If CI needs env flags or reporter config, set them here:
ENV GITHUB_ACTIONS=true
# Reporter can be configured in playwright.config; environment overrides are optional.
CMD ["npm", "run", "test"]
