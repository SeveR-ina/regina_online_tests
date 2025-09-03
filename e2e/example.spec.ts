import { test } from "@playwright/test";
import { expectPageToHaveTitle, expectToBeVisible } from "./utils/expect";

test("has title", async ({ page }) => {
  await page.goto("https://playwright.dev/");

  // Expect a title "to contain" a substring.
  await expectPageToHaveTitle(page, /Playwright/);
});

test("get started link", async ({ page }) => {
  await page.goto("https://playwright.dev/");

  // Click the get started link.
  await page.getByRole("link", { name: "Get started" }).click();

  // Expects page to have a heading with the name of Installation.
  await expectToBeVisible(page.getByRole("heading", { name: "Installation" }));
});
