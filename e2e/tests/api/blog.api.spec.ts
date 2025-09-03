import { PATHS } from "@/data/constants";
import { MESSAGES, createMessage } from "@/data/messages";
import { test } from "@fixtures/test-fixtures";
import { ApiClient } from "@utils/api.utils";
import {
  expectNotToBeNull,
  expectResponseStatusToBeLessThan,
  expectResponseStatusToBeOneOf,
  expectResponseToBeOK,
  expectToBeArray,
  expectToBeTruthy,
} from "@utils/expect";

test.describe("Blog API", () => {
  test(`@smoke GET /api/blog returns posts`, async ({ api }) => {
    const res = await api.get(`/api${PATHS.BLOG}?limit=5`);
    await expectResponseToBeOK(res);
    const json = await res.json();

    // Response structure: { success: true, data: { data: [...], pagination: {...} } }
    const posts = json.data?.data ?? json.data ?? json.posts ?? json;
    await expectToBeArray(posts, {
      message: MESSAGES.API.SHOULD_RETURN_ARRAY,
    });
  });

  test(`@smoke API Health Check`, async ({ request }) => {
    const apiClient = new ApiClient(request);

    // Basic API health check
    const isHealthy = await apiClient.checkHealth();
    await expectToBeTruthy(isHealthy, {
      message: MESSAGES.API.HEALTH_CHECK_TRUTHY,
    });

    // Test blog posts API endpoint
    const postsResult = await apiClient.getBlogPosts({ limit: 1 });
    await expectNotToBeNull(postsResult, {
      message: MESSAGES.API.SHOULD_RETURN_OBJECT,
    });

    // Validate API response structure
    if (postsResult && postsResult.posts.length > 0) {
      ApiClient.validateBlogPostStructure(postsResult.posts[0]);
    }
  });

  test("@regression GET /api/blog/year/:year works", async ({ api }) => {
    const year = new Date().getFullYear();
    const res = await api.get(`/api${PATHS.BLOG}/year/${year}`);
    await expectResponseStatusToBeLessThan(res, 500, {
      message: createMessage.apiEndpointError(`/api${PATHS.BLOG}/year/${year}`),
    });
  });

  test("@regression GET /api/blog/:slug returns 404 for unknown slug", async ({
    api,
  }) => {
    const res = await api.get(`/api${PATHS.BLOG}/not-a-real-slug-xyz`);
    await expectResponseStatusToBeOneOf(res, [404, 400], {
      message: MESSAGES.API.UNKNOWN_BLOG_SLUG,
    });
  });
});
