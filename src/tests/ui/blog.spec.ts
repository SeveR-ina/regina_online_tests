import { guestTest as test } from "@fixtures/test-fixtures";

test.describe("Blog", () => {
  test.beforeEach(async ({ blogPage }) => {
    await blogPage.goto();
    await blogPage.assertLoaded();
    // Ensure search input is clear before each test
    await blogPage.clearSearch();
  });

  test(`@smoke blog list has posts`, async ({ blogPage }) => {
    await blogPage.assertHasPosts();
  });

  test(`@smoke Blog Page - Core Functionality`, async ({ blogPage }) => {
    // Navigate and verify basic functionality
    await blogPage.assertHeroContent();
    await blogPage.assertSearchFunctionality();

    await blogPage.assertHasPosts();
    await blogPage.assertBlogCardStructure(0);
  });
});
