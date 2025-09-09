/**
 * Centralized blog content test data
 * Provides reusable content for blog post creation and testing
 */

/**
 * Blog post templates for testing
 */
export const BLOG_POST_TEMPLATES = {
  SIMPLE_POST: {
    title: (timestamp: number = Date.now()) => `E2E Test Post ${timestamp}`,
    content: "This is an automated test post created by E2E testing.",
    excerpt: "A simple test post for E2E validation",
  },

  DETAILED_POST: {
    title: (timestamp: number = Date.now()) =>
      `Detailed E2E Test Post ${timestamp}`,
    content: `# Test Blog Post

This is a comprehensive test blog post created by automated E2E testing.

## Content Overview
- **Purpose**: E2E Testing
- **Created**: ${new Date().toISOString()}
- **Type**: Automated Test Content

## Features Tested
1. Blog post creation
2. Content formatting
3. Title validation
4. Publishing workflow

## Technical Details
This post validates the complete blog creation and publishing pipeline.

### Code Example
\`\`\`javascript
const testPost = {
  title: "E2E Test Post",
  content: "Test content",
  status: "published"
};
\`\`\`

## Conclusion
This test post ensures the blog functionality works correctly.`,
    excerpt:
      "A detailed test post with comprehensive content for E2E validation",
  },

  RICH_CONTENT_POST: {
    title: (timestamp: number = Date.now()) => `Rich Content Test ${timestamp}`,
    content: `# Rich Content Test Post

This post tests various **markdown** and *formatting* capabilities.

## Lists
- Item 1
- Item 2
- Item 3

### Numbered List
1. First item
2. Second item
3. Third item

## Links and Media
[Test Link](https://example.com)

## Special Characters
Testing special characters: àáâãäå, éêë, îïí, ôõö, ûüú, ñç

## Emojis
🚀 🎯 ✨ 🔥 💡 📝 🎉 ✅`,
    excerpt:
      "Testing rich content formatting including markdown, lists, and special characters",
  },

  MINIMAL_POST: {
    title: (timestamp: number = Date.now()) => `Minimal Test ${timestamp}`,
    content: "Minimal test content.",
    excerpt: "Minimal test post",
  },
} as const;

/**
 * Blog post metadata for testing
 */
export const BLOG_METADATA = {
  TAGS: [
    "e2e-test",
    "automation",
    "testing",
    "playwright",
    "typescript",
    "frontend",
    "development",
  ],

  CATEGORIES: ["Testing", "Development", "Automation", "Quality Assurance"],

  STATUS_OPTIONS: ["draft", "published", "scheduled"] as const,
} as const;

/**
 * Helper functions for generating dynamic test content
 */
export const generateBlogContent = {
  /**
   * Generate a unique blog post with timestamp
   */
  simplePost: (prefix = "E2E") => ({
    title: `${prefix} Test Post ${Date.now()}`,
    content: `This is an automated test post created at ${new Date().toISOString()}`,
    excerpt: `${prefix} test post excerpt`,
  }),

  /**
   * Generate blog post with specific template
   */
  fromTemplate: (
    template: keyof typeof BLOG_POST_TEMPLATES,
    timestamp?: number
  ) => {
    const blogTemplate = BLOG_POST_TEMPLATES[template];
    return {
      title: blogTemplate.title(timestamp),
      content: blogTemplate.content,
      excerpt: blogTemplate.excerpt,
    };
  },

  /**
   * Generate random blog post content
   */
  randomPost: () => {
    const templates = Object.keys(
      BLOG_POST_TEMPLATES
    ) as (keyof typeof BLOG_POST_TEMPLATES)[];
    const randomTemplate =
      templates[Math.floor(Math.random() * templates.length)];
    return generateBlogContent.fromTemplate(randomTemplate);
  },
};

/**
 * Search and filter test data
 */
export const SEARCH_TEST_DATA = {
  VALID_TERMS: [
    "test",
    "blog",
    "post",
    "e2e",
    "automation",
    "typescript",
    "javascript",
    "development",
  ],

  INVALID_TERMS: ["", "   ", "nonexistentterm123456", "!@#$%^&*()"],

  SPECIAL_CHARACTERS: [
    "café",
    "naïve",
    "résumé",
    "pièce",
    "🔍",
    "test@email.com",
  ],
} as const;

/**
 * User interaction test data
 */
export const USER_ACTIONS = {
  FORM_INPUTS: {
    VALID_TITLES: [
      "Valid Blog Title",
      "Another Good Title",
      "Test Post Title 2024",
    ],

    INVALID_TITLES: [
      "",
      "   ",
      "a".repeat(201), // Too long
    ],

    VALID_CONTENT: [
      "This is valid blog content.",
      "# Markdown Header\n\nContent with formatting.",
      "Short content.",
    ],

    INVALID_CONTENT: ["", "   "],
  },
} as const;

// Default export for easy usage
export default {
  BLOG_POST_TEMPLATES,
  BLOG_METADATA,
  generateBlogContent,
  SEARCH_TEST_DATA,
  USER_ACTIONS,
};
