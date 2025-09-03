import { TIMEOUTS, getProtectedPaths } from "@/data/constants";
import { Locator, Page } from "@playwright/test";
import { expectToBeVisible } from "@utils/expect";
import { BasePage } from "./BasePage";

/**
 * Page Object Model for the Blog Create/Edit Page
 * Extends BasePage with blog creation/editing functionality
 */
export class BlogCreatePage extends BasePage {
  // Page sections
  readonly editorSection: Locator;
  readonly previewSection: Locator;

  // Form elements
  readonly blogForm: Locator;
  readonly titleInput: Locator;
  readonly excerptInput: Locator;
  readonly contentEditor: Locator;
  readonly tagsInput: Locator;
  readonly categorySelect: Locator;

  // Rich text editor elements
  readonly editorToolbar: Locator;
  readonly boldButton: Locator;
  readonly italicButton: Locator;
  readonly underlineButton: Locator;
  readonly headingSelect: Locator;
  readonly linkButton: Locator;
  readonly imageButton: Locator;
  readonly codeButton: Locator;

  // Status and visibility controls
  readonly statusSelect: Locator;
  readonly visibilitySelect: Locator;
  readonly publishDateInput: Locator;
  readonly featuredCheckbox: Locator;

  // Image upload
  readonly featuredImageSection: Locator;
  readonly imageUploadButton: Locator;
  readonly imageUploadInput: Locator;
  readonly imagePreview: Locator;
  readonly removeImageButton: Locator;

  // SEO section
  readonly seoSection: Locator;
  readonly seoTitleInput: Locator;
  readonly seoDescriptionInput: Locator;
  readonly seoKeywordsInput: Locator;

  // Action buttons
  readonly saveDraftButton: Locator;
  readonly publishButton: Locator;
  readonly updateButton: Locator;
  readonly previewButton: Locator;
  readonly cancelButton: Locator;
  readonly deleteButton: Locator;

  // Validation messages
  readonly validationMessages: Locator;
  readonly successMessage: Locator;
  readonly errorMessage: Locator;

  // Word count and character limits
  readonly wordCount: Locator;
  readonly characterCount: Locator;

  // Auto-save indicator
  readonly autoSaveIndicator: Locator;

  constructor(page: Page) {
    super(page);

    // Initialize page sections
    this.editorSection = page.locator('[data-testid="blog-editor-section"]');
    this.previewSection = page.locator('[data-testid="blog-preview-section"]');

    // Initialize form elements
    this.blogForm = page.locator('[data-testid="blog-form"]');
    this.titleInput = page.locator('[data-testid="blog-title-input"]');
    this.excerptInput = page.locator('[data-testid="blog-excerpt-input"]');
    this.contentEditor = page.locator('[data-testid="blog-content-editor"]');
    this.tagsInput = page.locator('[data-testid="blog-tags-input"]');
    this.categorySelect = page.locator('[data-testid="blog-category-select"]');

    // Initialize rich text editor elements
    this.editorToolbar = page.locator('[data-testid="editor-toolbar"]');
    this.boldButton = page.locator('[data-testid="editor-bold"]');
    this.italicButton = page.locator('[data-testid="editor-italic"]');
    this.underlineButton = page.locator('[data-testid="editor-underline"]');
    this.headingSelect = page.locator('[data-testid="editor-heading-select"]');
    this.linkButton = page.locator('[data-testid="editor-link"]');
    this.imageButton = page.locator('[data-testid="editor-image"]');
    this.codeButton = page.locator('[data-testid="editor-code"]');

    // Initialize status and visibility controls
    this.statusSelect = page.locator('[data-testid="blog-status-select"]');
    this.visibilitySelect = page.locator(
      '[data-testid="blog-visibility-select"]'
    );
    this.publishDateInput = page.locator('[data-testid="blog-publish-date"]');
    this.featuredCheckbox = page.locator(
      '[data-testid="blog-featured-checkbox"]'
    );

    // Initialize image upload
    this.featuredImageSection = page.locator(
      '[data-testid="featured-image-section"]'
    );
    this.imageUploadButton = page.locator(
      '[data-testid="image-upload-button"]'
    );
    this.imageUploadInput = page.locator('[data-testid="image-upload-input"]');
    this.imagePreview = page.locator('[data-testid="image-preview"]');
    this.removeImageButton = page.locator(
      '[data-testid="remove-image-button"]'
    );

    // Initialize SEO section
    this.seoSection = page.locator('[data-testid="seo-section"]');
    this.seoTitleInput = page.locator('[data-testid="seo-title-input"]');
    this.seoDescriptionInput = page.locator(
      '[data-testid="seo-description-input"]'
    );
    this.seoKeywordsInput = page.locator('[data-testid="seo-keywords-input"]');

    // Initialize action buttons
    this.saveDraftButton = page.locator('[data-testid="save-draft-button"]');
    this.publishButton = page.locator('[data-testid="publish-button"]');
    this.updateButton = page.locator('[data-testid="update-button"]');
    this.previewButton = page.locator('[data-testid="preview-button"]');
    this.cancelButton = page.locator('[data-testid="cancel-button"]');
    this.deleteButton = page.locator('[data-testid="delete-button"]');

    // Initialize validation messages
    this.validationMessages = page.locator(
      '[data-testid="validation-message"]'
    );
    this.successMessage = page.locator('[data-testid="success-message"]');
    this.errorMessage = page.locator('[data-testid="error-message"]');

    // Initialize word count and character limits
    this.wordCount = page.locator('[data-testid="word-count"]');
    this.characterCount = page.locator('[data-testid="character-count"]');

    // Initialize auto-save indicator
    this.autoSaveIndicator = page.locator(
      '[data-testid="auto-save-indicator"]'
    );
  }

  /**
   * Navigation methods
   */
  async gotoCreateBlog(): Promise<void> {
    const protectedPaths = getProtectedPaths();
    await this.goto(protectedPaths.PROTECTED_CONTENT_CREATE);
    await this.assertPageLoaded();
  }

  async gotoEditBlog(blogId: string): Promise<void> {
    const protectedPaths = getProtectedPaths();
    await this.goto(`${protectedPaths.PROTECTED_CONTENT_EDIT}/${blogId}`);
    await this.assertPageLoaded();
  }

  async goBackToBlogList(): Promise<void> {
    await this.safeClick(this.cancelButton);
    await this.waitForPageLoad();
  }

  /**
   * Form filling methods
   */
  async fillBlogTitle(title: string): Promise<void> {
    await this.safeFill(this.titleInput, title);
  }

  async fillBlogExcerpt(excerpt: string): Promise<void> {
    await this.safeFill(this.excerptInput, excerpt);
  }

  async fillBlogContent(content: string): Promise<void> {
    await this.safeFill(this.contentEditor, content);
  }

  async fillBlogTags(tags: string[]): Promise<void> {
    const tagsString = tags.join(", ");
    await this.safeFill(this.tagsInput, tagsString);
  }

  async selectCategory(category: string): Promise<void> {
    await this.safeSelectOption(this.categorySelect, category);
  }

  async selectStatus(
    status: "draft" | "published" | "scheduled"
  ): Promise<void> {
    await this.safeSelectOption(this.statusSelect, status);
  }

  async selectVisibility(
    visibility: "public" | "private" | "password"
  ): Promise<void> {
    await this.safeSelectOption(this.visibilitySelect, visibility);
  }

  async setPublishDate(date: string): Promise<void> {
    await this.safeFill(this.publishDateInput, date);
  }

  async toggleFeatured(): Promise<void> {
    await this.safeClick(this.featuredCheckbox);
  }

  /**
   * Rich text editor methods
   */
  async formatTextBold(): Promise<void> {
    await this.safeClick(this.boldButton);
  }

  async formatTextItalic(): Promise<void> {
    await this.safeClick(this.italicButton);
  }

  async formatTextUnderline(): Promise<void> {
    await this.safeClick(this.underlineButton);
  }

  async setHeading(
    level: "h1" | "h2" | "h3" | "h4" | "h5" | "h6"
  ): Promise<void> {
    await this.safeSelectOption(this.headingSelect, level);
  }

  /**
   * Image upload methods
   */
  async uploadFeaturedImage(imagePath: string): Promise<void> {
    await this.imageUploadInput.setInputFiles(imagePath);
  }

  async removeFeaturedImage(): Promise<void> {
    await this.safeClick(this.removeImageButton);
  }

  /**
   * SEO methods
   */
  async fillSEOTitle(title: string): Promise<void> {
    await this.safeFill(this.seoTitleInput, title);
  }

  async fillSEODescription(description: string): Promise<void> {
    await this.safeFill(this.seoDescriptionInput, description);
  }

  async fillSEOKeywords(keywords: string[]): Promise<void> {
    const keywordsString = keywords.join(", ");
    await this.safeFill(this.seoKeywordsInput, keywordsString);
  }

  /**
   * Action methods
   */
  async saveDraft(): Promise<void> {
    await this.safeClick(this.saveDraftButton);
    await this.waitForSuccessMessage();
  }

  async publishBlog(): Promise<void> {
    await this.safeClick(this.publishButton);
    await this.waitForSuccessMessage();
  }

  async updateBlog(): Promise<void> {
    await this.safeClick(this.updateButton);
    await this.waitForSuccessMessage();
  }

  async previewBlog(): Promise<void> {
    await this.safeClick(this.previewButton);
  }

  async deleteBlog(): Promise<void> {
    await this.safeClick(this.deleteButton);

    // Handle confirmation dialog
    await this.handleDialog("accept", "delete");
  }

  /**
   * Validation and helper methods
   */
  async waitForSuccessMessage(): Promise<void> {
    await expectToBeVisible(this.successMessage, { timeout: TIMEOUTS.LONG });
  }

  async waitForErrorMessage(): Promise<void> {
    await expectToBeVisible(this.errorMessage, { timeout: TIMEOUTS.DEFAULT });
  }

  async getWordCount(): Promise<number> {
    const wordCountText = await this.getElementText(this.wordCount);
    return parseInt(wordCountText.replace(/\D/g, "")) || 0;
  }

  async getCharacterCount(): Promise<number> {
    const charCountText = await this.getElementText(this.characterCount);
    return parseInt(charCountText.replace(/\D/g, "")) || 0;
  }

  async waitForAutoSave(): Promise<void> {
    await expectToBeVisible(this.autoSaveIndicator, {
      timeout: TIMEOUTS.MEDIUM,
    });
  }

  /**
   * Complete blog creation workflow
   */
  async createCompleteBlog(blogData: {
    title: string;
    excerpt: string;
    content: string;
    tags?: string[];
    category?: string;
    status?: "draft" | "published" | "scheduled";
    visibility?: "public" | "private" | "password";
    featured?: boolean;
    seoTitle?: string;
    seoDescription?: string;
    seoKeywords?: string[];
  }): Promise<void> {
    // Fill basic content
    await this.fillBlogTitle(blogData.title);
    await this.fillBlogExcerpt(blogData.excerpt);
    await this.fillBlogContent(blogData.content);

    // Fill optional fields
    if (blogData.tags && blogData.tags.length > 0) {
      await this.fillBlogTags(blogData.tags);
    }

    if (blogData.category) {
      await this.selectCategory(blogData.category);
    }

    if (blogData.status) {
      await this.selectStatus(blogData.status);
    }

    if (blogData.visibility) {
      await this.selectVisibility(blogData.visibility);
    }

    if (blogData.featured) {
      await this.toggleFeatured();
    }

    // Fill SEO fields
    if (blogData.seoTitle) {
      await this.fillSEOTitle(blogData.seoTitle);
    }

    if (blogData.seoDescription) {
      await this.fillSEODescription(blogData.seoDescription);
    }

    if (blogData.seoKeywords && blogData.seoKeywords.length > 0) {
      await this.fillSEOKeywords(blogData.seoKeywords);
    }

    // Save or publish
    if (blogData.status === "published") {
      await this.publishBlog();
    } else {
      await this.saveDraft();
    }
  }

  /**
   * Assertion methods (implements BasePage abstract method)
   */
  async assertPageLoaded(): Promise<void> {
    await expectToBeVisible(this.editorSection);
    await expectToBeVisible(this.blogForm);
  }

  async assertFormFields(): Promise<void> {
    await expectToBeVisible(this.titleInput);
    await expectToBeVisible(this.excerptInput);
    await expectToBeVisible(this.contentEditor);
    await expectToBeVisible(this.statusSelect);
  }

  async assertEditorToolbar(): Promise<void> {
    await expectToBeVisible(this.editorToolbar);
    await expectToBeVisible(this.boldButton);
    await expectToBeVisible(this.italicButton);
  }

  async assertSEOSection(): Promise<void> {
    const seoSection = this.seoSection;
    if (await this.isElementVisible(seoSection)) {
      await expectToBeVisible(seoSection);
      await expectToBeVisible(this.seoTitleInput);
      await expectToBeVisible(this.seoDescriptionInput);
    }
  }

  async assertActionButtons(): Promise<void> {
    await expectToBeVisible(this.saveDraftButton);
    await expectToBeVisible(this.publishButton);
    await expectToBeVisible(this.cancelButton);
  }

  /**
   * Comprehensive page validation
   */
  async validateFullBlogCreatePage(): Promise<void> {
    // Core page elements
    await this.assertPageLoaded();
    await this.assertFormFields();
    await this.assertEditorToolbar();
    await this.assertSEOSection();
    await this.assertActionButtons();
  }
}
