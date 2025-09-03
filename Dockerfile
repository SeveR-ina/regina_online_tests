# Multi-stage Dockerfile for Regina Online E2E Tests
# Optimized for CI/CD and local development

FROM mcr.microsoft.com/playwright:v1.55.0-jammy as base

# Set working directory
WORKDIR /app

# Set environment variables
ENV NODE_ENV=test
ENV CI=true
ENV DOCKER=true
ENV PLAYWRIGHT_BROWSERS_PATH=/ms-playwright

# Install dependencies
COPY package*.json ./
RUN npm ci --ignore-scripts && npm cache clean --force

# Copy source code
COPY . .

# Create directories for test results
RUN mkdir -p test-results test-results/html-report test-results/screenshots test-results/videos

# Set permissions
RUN chmod -R 755 test-results

# Production image
FROM base as production

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3000/health || exit 1

# Default command
CMD ["npm", "run", "test"]

# Development image with additional tools
FROM base as development

# Install debugging tools
RUN apt-get update && apt-get install -y \
    curl \
    wget \
    vim \
    && rm -rf /var/lib/apt/lists/*

# Default command for development
CMD ["npm", "run", "test:headed"]

# CI image optimized for GitHub Actions
FROM base as ci

# Copy all files including test configs
COPY . .

# Set CI-specific environment variables
ENV GITHUB_ACTIONS=true
ENV REPORTER=github,html,junit

# Create user for security
RUN groupadd -r testuser && useradd -r -g testuser testuser
RUN chown -R testuser:testuser /app
USER testuser

# Default command for CI
CMD ["npm", "run", "test"]
