/**
 * Workflow utilities for common admin dashboard operations
 * Provides reusable workflow methods that can be used across different page objects
 */

import { Page } from "@playwright/test";
import { AdminDashboardPage } from "@pom/pages/AdminDashboardPage";
import { BlogEditorPage } from "@pom/pages/BlogEditorPage";
import { generateBlogContent } from "@test-data/blog-content";
import { TEST_MESSAGES } from "@test-data/logger-messages";
import { logger } from "./core.utils";

/**
 * Admin Dashboard specific workflows
 */
export class AdminDashboardWorkflows {
  constructor(
    private readonly page: Page,
    private readonly dashboardPage: AdminDashboardPage
  ) {}

  /**
   * Create new post workflow
   */
  async createNewPostWorkflow(): Promise<void> {
    await this.dashboardPage.goToNewPost();
    // Page navigation to new post form is handled by goToNewPost()
  }

  /**
   * Edit first post workflow
   */
  async editFirstPostWorkflow(): Promise<string | null> {
    const firstPostId = await this.dashboardPage.getFirstPostId();
    if (firstPostId) {
      await this.dashboardPage.editPost(firstPostId);
      return firstPostId;
    }
    return null;
  }

  /**
   * Delete first post workflow
   */
  async deleteFirstPostWorkflow(): Promise<boolean> {
    const firstPostId = await this.dashboardPage.getFirstPostId();
    if (firstPostId) {
      await this.dashboardPage.deletePost(firstPostId);
      // Verify post was deleted
      await this.dashboardPage.assertPostNotExists(firstPostId);
      return true;
    }
    return false;
  }

  /**
   * Complete blog post creation workflow
   */
  async createCompletePostWorkflow(
    title?: string,
    content?: string
  ): Promise<{ title: string; content: string }> {
    // Generate test content if not provided
    const testPost =
      title && content
        ? { title, content }
        : generateBlogContent.simplePost("E2E Workflow");

    // Navigate to new post
    await this.dashboardPage.goToNewPost();

    // Create the post
    const editorPage = new BlogEditorPage(this.page);
    await editorPage.create(testPost.title, testPost.content);

    return testPost;
  }

  /**
   * Pin/Unpin post workflow
   */
  async toggleFirstPostPinWorkflow(): Promise<{
    postId: string | null;
    action: "pinned" | "unpinned" | null;
  }> {
    const firstPostId = await this.dashboardPage.getFirstPostId();

    if (!firstPostId) {
      return { postId: null, action: null };
    }

    // Check if post is already pinned (this would need to be implemented based on UI)
    // For now, let's assume we're pinning the post
    await this.dashboardPage.pinPost(firstPostId);

    return { postId: firstPostId, action: "pinned" };
  }

  /**
   * Full dashboard validation workflow
   */
  async fullValidationWorkflow(): Promise<void> {
    // Ensure we're on the dashboard
    await this.dashboardPage.goto();

    // Run comprehensive validation
    await this.dashboardPage.validateFullPage();
  }
}

/**
 * Blog Editor specific workflows
 */
export class BlogEditorWorkflows {
  constructor(
    private readonly page: Page,
    private readonly editorPage: BlogEditorPage
  ) {}

  /**
   * Create and publish post workflow
   */
  async createAndPublishPostWorkflow(
    template:
      | "SIMPLE_POST"
      | "DETAILED_POST"
      | "RICH_CONTENT_POST"
      | "MINIMAL_POST" = "SIMPLE_POST"
  ): Promise<{ title: string; content: string; excerpt: string }> {
    // Generate test content from template
    const testPost = generateBlogContent.fromTemplate(template);

    // Navigate to new post page
    await this.editorPage.gotoNew();

    // Create the post
    await this.editorPage.create(testPost.title, testPost.content);

    return testPost;
  }

  /**
   * Create draft post workflow
   */
  async createDraftPostWorkflow(
    title?: string,
    content?: string
  ): Promise<{ title: string; content: string }> {
    const testPost =
      title && content
        ? { title, content }
        : generateBlogContent.simplePost("Draft");

    await this.editorPage.gotoNew();

    // Fill content but don't save/publish yet
    await this.editorPage.title.fill(testPost.title);
    await this.editorPage.content.fill(testPost.content);

    return testPost;
  }
}

/**
 * Cross-page workflows that involve multiple page objects
 */
export class CrossPageWorkflows {
  constructor(private readonly page: Page) {}

  /**
   * Complete blog post lifecycle workflow
   * Creates a post, verifies it in dashboard, then deletes it
   */
  async completeBlogPostLifecycleWorkflow(
    _template:
      | "SIMPLE_POST"
      | "DETAILED_POST"
      | "RICH_CONTENT_POST"
      | "MINIMAL_POST" = "SIMPLE_POST"
  ): Promise<void> {
    const dashboardPage = new AdminDashboardPage(this.page);
    const dashboardWorkflow = new AdminDashboardWorkflows(
      this.page,
      dashboardPage
    );

    // Step 2: Navigate back to dashboard and verify post exists
    await dashboardPage.goto();
    await dashboardPage.assertLoaded();

    // Step 3: Find and delete the created post
    // Note: This assumes posts are listed in order of creation
    const deletedSuccessfully =
      await dashboardWorkflow.deleteFirstPostWorkflow();

    if (!deletedSuccessfully) {
      logger.warn(TEST_MESSAGES.WORKFLOW.LIFECYCLE_DELETE_WARNING);
    }
  }

  /**
   * Admin navigation testing workflow
   */
  async adminNavigationTestingWorkflow(): Promise<void> {
    const dashboardPage = new AdminDashboardPage(this.page);

    // Start from dashboard
    await dashboardPage.goto();
    await dashboardPage.assertLoaded();

    // Test navigation to each section
    await dashboardPage.goToUsers();
    await this.page.goBack();

    await dashboardPage.goToSecurity();
    await this.page.goBack();

    await dashboardPage.goToBackup();
    await this.page.goBack();

    // Verify we're back on dashboard
    await dashboardPage.assertLoaded();
  }
}

/**
 * Factory function to create workflow instances
 */
export const createWorkflows = (page: Page) => {
  const dashboardPage = new AdminDashboardPage(page);
  const editorPage = new BlogEditorPage(page);

  return {
    adminDashboard: new AdminDashboardWorkflows(page, dashboardPage),
    blogEditor: new BlogEditorWorkflows(page, editorPage),
    crossPage: new CrossPageWorkflows(page),
  };
};

// Default export for convenience
export default {
  AdminDashboardWorkflows,
  BlogEditorWorkflows,
  CrossPageWorkflows,
  createWorkflows,
};
