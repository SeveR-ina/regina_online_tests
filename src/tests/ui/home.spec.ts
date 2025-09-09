import { guestTest as test } from "@fixtures/test-fixtures";
import { TEST_DATA } from "@test-data/constants";
import { expectToBeVisible } from "@utils/expect";

test.describe("@smoke Home", () => {
  test.beforeEach(async ({ homePage }) => {
    await homePage.goto();
    await homePage.assertPageLoaded();
  });

  test(`loads and shows main navigation`, async ({ homePage }) => {
    await expectToBeVisible(homePage.aboutLink);
    await expectToBeVisible(homePage.blogLink);
    await expectToBeVisible(homePage.cvLink);
    await expectToBeVisible(homePage.linksLink);
  });

  test(`@Home Page - Core Functionality`, async ({ homePage }) => {
    await homePage.assertNavigationVisible();
    await homePage.assertExploreSectionVisible();

    // Navigation smoke test - verify page title
    await homePage.checkPageHasTitle(TEST_DATA.SITE_INFO.SITE_TITLE);
  });
});
