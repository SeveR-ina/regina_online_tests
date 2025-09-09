import { guestTest as test } from "@fixtures/test-fixtures";
import { TestConfig } from "@utils/core.utils";
import { expectToBeVisible } from "@utils/expect";

const hasCreds = !!(
  TestConfig.adminCredentials.email && TestConfig.adminCredentials.password
);

test.describe("Admin login", () => {
  test.skip(!hasCreds, "ADMIN_EMAIL/ADMIN_PASSWORD not provided");

  test(`@smoke can login with valid credentials`, async ({
    adminLoginPage,
    page,
  }) => {
    await adminLoginPage.gotoLogin();
    await adminLoginPage.loginAsAdmin();

    await expectToBeVisible(
      page.getByRole("heading", { name: /dashboard|admin/i })
    );
  });
});
