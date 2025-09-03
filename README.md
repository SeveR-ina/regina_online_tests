# Regina Online E2E Tests

This repository contains Playwright end-to-end and API tests for https://reginaonline.de and the
local dev site.

Highlights

- Page Object Model (POM)
- Auto-waiting and retrying assertions (no manual timeouts)
- Parallel execution across browsers and mobile devices (Chrome, Safari/WebKit, iPhone 13, iPad
  Mini)
- Tracing, screenshots, and videos retained on failure
- API tests using Playwright's request fixture
- Fixtures for authenticated admin flows via storageState
- Mocking examples with page.route
- CI: smoke and regression workflows, manual dispatch, schedules, and repository_dispatch triggers

## Prerequisites

- Node 20+
- Install browsers: `npm run install:browsers`

## Environment

Copy .env.example to .env (or provide variables via CI secrets):

- TARGET=local|prod
- TEST_BASE_URL_LOCAL, API_BASE_URL_LOCAL
- TEST_BASE_URL_PROD, API_BASE_URL_PROD
- ADMIN_EMAIL, ADMIN_PASSWORD

## Run locally

- Smoke: `npm run test:smoke`
- Regression: `npm run test:regression`
- Specific suite: `npm run test:ui` or `npm run test:api`
- Report: `npm run show-report`

## CI triggers from website repo

Add this job at the end of your website repo pipeline after successful deploy:

```yaml path=null start=null
- name: Trigger E2E smoke
  if: ${{ success() }}
  uses: peter-evans/repository-dispatch@v3
  with:
    token: ${{ secrets.E2E_TOKEN }}
    repository: regina-chepkunova/regina_online_tests_public
    event-type: run-e2e-smoke
    client-payload: '{"target":"prod"}'
```

Create a Fine-grained PAT with repo:public_repo access and save as E2E_TOKEN in your website repo
secrets.

## Notes

- Admin storage state is created in global-setup if ADMIN_EMAIL and ADMIN_PASSWORD are provided. If
  absent, admin tests will skip automatically.
