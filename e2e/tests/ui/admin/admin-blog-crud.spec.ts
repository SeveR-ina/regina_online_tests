import { generateBlogContent } from "@/data/blog-content";
import { PATHS } from "@/data/constants";
import { test } from "@fixtures/test-fixtures";
import { expectToBeVisible } from "@utils/expect";
import { skipOnProduction } from "@utils/production-safety.utils";

test.describe("Admin blog CRUD @create @delete @crud", () => {
  // Skip all destructive tests on production
  test.beforeAll(() => {
    skipOnProduction(
      "Blog CRUD operations are destructive and not allowed on production"
    );
  });

  test.skip(({ storageState }) => !storageState, "Requires storage state");

  test.beforeEach(async ({ adminDashboardPage }) => {
    await adminDashboardPage.goto();
    await adminDashboardPage.assertLoaded();
  });

  test("create and view new post", async ({ blogEditorPage, adminPage }) => {
    // Navigate to create new post
    await blogEditorPage.gotoNew();

    // Generate test post using centralized test data
    const testPost = generateBlogContent.simplePost("E2E");
    const { title, content } = testPost;

    // Create the post
    await blogEditorPage.create(title, content);

    // Verify it appears on blog index
    await adminPage.goto(PATHS.BLOG);
    await adminPage
      .getByRole("link", { name: new RegExp(title, "i") })
      .first()
      .click();
    await expectToBeVisible(
      adminPage.getByRole("heading", { name: new RegExp(title, "i") })
    );
  });
});
