import { Page } from "@playwright/test";

export async function mockAnalytics(page: Page) {
  await page.route(/google-analytics|gtag|analytics\.js/i, route =>
    route.abort()
  );
}

export async function mockApiFailure(page: Page, urlPart: RegExp) {
  await page.route(urlPart, async route => {
    await route.fulfill({
      status: 500,
      body: JSON.stringify({ error: "Mocked failure" }),
    });
  });
}
