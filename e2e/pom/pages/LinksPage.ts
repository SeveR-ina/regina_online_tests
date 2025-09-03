import { PATHS } from "@/data/constants";
import { Locator, Page } from "@playwright/test";
import {
  expectToBeGreaterThan,
  expectToBeVisible,
  expectToHaveAttribute,
  expectToHaveText,
} from "@utils/expect";
import { BasePage } from "./BasePage";

/**
 * Page Object Model for the Links Page
 * Extends BasePage with Links-specific functionality
 */
export class LinksPage extends BasePage {
  // Page sections
  readonly linksSection: Locator;
  readonly heroSection: Locator;

  // Header content
  readonly pageTitle: Locator;
  readonly pageDescription: Locator;

  // Links categories
  readonly socialLinksSection: Locator;
  readonly professionalLinksSection: Locator;
  readonly projectLinksSection: Locator;
  readonly contactLinksSection: Locator;

  // Social media links
  readonly linkedinLink: Locator;
  readonly githubLink: Locator;
  readonly twitterLink: Locator;
  readonly instagramLink: Locator;

  // Professional links
  readonly resumeLink: Locator;
  readonly portfolioLink: Locator;
  readonly blogLink: Locator;

  // Project links
  readonly projectsList: Locator;
  readonly projectItem: Locator;
  readonly projectTitle: Locator;
  readonly projectDescription: Locator;
  readonly projectLink: Locator;
  readonly projectGithub: Locator;

  // Contact links
  readonly emailLink: Locator;
  readonly phoneLink: Locator;
  readonly contactFormLink: Locator;

  // Link categories
  readonly linkCategory: Locator;
  readonly linkItem: Locator;
  readonly linkTitle: Locator;
  readonly linkDescription: Locator;
  readonly linkUrl: Locator;

  // Navigation elements
  readonly backToHomeLink: Locator;

  constructor(page: Page) {
    super(page);

    // Page sections
    this.linksSection = page.locator('[data-testid="links-section"]');
    this.heroSection = page.locator('[data-testid="links-hero"]');

    // Header content
    this.pageTitle = page.locator('[data-testid="links-title"]');
    this.pageDescription = page.locator('[data-testid="links-description"]');

    // Links categories
    this.socialLinksSection = page.locator(
      '[data-testid="social-links-section"]'
    );
    this.professionalLinksSection = page.locator(
      '[data-testid="professional-links-section"]'
    );
    this.projectLinksSection = page.locator(
      '[data-testid="project-links-section"]'
    );
    this.contactLinksSection = page.locator(
      '[data-testid="contact-links-section"]'
    );

    // Social media links
    this.linkedinLink = page.locator('[data-testid="linkedin-link"]');
    this.githubLink = page.locator('[data-testid="github-link"]');
    this.twitterLink = page.locator('[data-testid="twitter-link"]');
    this.instagramLink = page.locator('[data-testid="instagram-link"]');

    // Professional links
    this.resumeLink = page.locator('[data-testid="resume-link"]');
    this.portfolioLink = page.locator('[data-testid="portfolio-link"]');
    this.blogLink = page.locator('[data-testid="blog-link"]');

    // Project links
    this.projectsList = page.locator('[data-testid="projects-list"]');
    this.projectItem = page.locator('[data-testid="project-item"]');
    this.projectTitle = page.locator('[data-testid="project-title"]');
    this.projectDescription = page.locator(
      '[data-testid="project-description"]'
    );
    this.projectLink = page.locator('[data-testid="project-link"]');
    this.projectGithub = page.locator('[data-testid="project-github"]');

    // Contact links
    this.emailLink = page.locator('[data-testid="email-link"]');
    this.phoneLink = page.locator('[data-testid="phone-link"]');
    this.contactFormLink = page.locator('[data-testid="contact-form-link"]');

    // Link categories
    this.linkCategory = page.locator('[data-testid="link-category"]');
    this.linkItem = page.locator('[data-testid="link-item"]');
    this.linkTitle = page.locator('[data-testid="link-title"]');
    this.linkDescription = page.locator('[data-testid="link-description"]');
    this.linkUrl = page.locator('[data-testid="link-url"]');

    // Navigation elements
    this.backToHomeLink = page.locator('[data-testid="back-to-home"]');
  }

  /**
   * Navigation methods
   */
  async gotoLinks(): Promise<void> {
    await this.goto(PATHS.LINKS);
    await this.assertPageLoaded();
  }

  async goBackToHome(): Promise<void> {
    await this.safeClick(this.backToHomeLink);
    await this.waitForPageLoad();
  }

  /**
   * Link interaction methods
   */
  async clickLinkedInLink(): Promise<void> {
    await this.safeClick(this.linkedinLink);
  }

  async clickGitHubLink(): Promise<void> {
    await this.safeClick(this.githubLink);
  }

  async clickTwitterLink(): Promise<void> {
    if (await this.isElementVisible(this.twitterLink)) {
      await this.safeClick(this.twitterLink);
    }
  }

  async clickInstagramLink(): Promise<void> {
    if (await this.isElementVisible(this.instagramLink)) {
      await this.safeClick(this.instagramLink);
    }
  }

  async clickResumeLink(): Promise<void> {
    await this.safeClick(this.resumeLink);
  }

  async clickPortfolioLink(): Promise<void> {
    await this.safeClick(this.portfolioLink);
  }

  async clickBlogLink(): Promise<void> {
    await this.safeClick(this.blogLink);
  }

  async clickEmailLink(): Promise<void> {
    await this.safeClick(this.emailLink);
  }

  async clickPhoneLink(): Promise<void> {
    if (await this.isElementVisible(this.phoneLink)) {
      await this.safeClick(this.phoneLink);
    }
  }

  async clickContactFormLink(): Promise<void> {
    await this.safeClick(this.contactFormLink);
  }

  async clickProjectLink(projectIndex: number = 0): Promise<void> {
    const projectLinks = await this.projectLink.all();
    if (projectLinks[projectIndex]) {
      await this.safeClick(projectLinks[projectIndex]);
    }
  }

  async clickProjectGitHub(projectIndex: number = 0): Promise<void> {
    const githubLinks = await this.projectGithub.all();
    if (githubLinks[projectIndex]) {
      await this.safeClick(githubLinks[projectIndex]);
    }
  }

  /**
   * Content validation methods
   */
  async getLinkCategoriesCount(): Promise<number> {
    return await this.getElementCount(this.linkCategory);
  }

  async getTotalLinksCount(): Promise<number> {
    return await this.getElementCount(this.linkItem);
  }

  async getProjectsCount(): Promise<number> {
    return await this.getElementCount(this.projectItem);
  }

  async getAllLinkTitles(): Promise<string[]> {
    const titles: string[] = [];
    const titleElements = await this.linkTitle.all();

    for (const title of titleElements) {
      const titleText = await this.getElementText(title);
      titles.push(titleText);
    }

    return titles;
  }

  async getAllProjectTitles(): Promise<string[]> {
    const titles: string[] = [];
    const titleElements = await this.projectTitle.all();

    for (const title of titleElements) {
      const titleText = await this.getElementText(title);
      titles.push(titleText);
    }

    return titles;
  }

  async getLinkUrl(linkIndex: number = 0): Promise<string> {
    const urlElements = await this.linkUrl.all();
    if (urlElements[linkIndex]) {
      return (await urlElements[linkIndex].getAttribute("href")) ?? "";
    }
    return "";
  }

  /**
   * Assertion methods (implements BasePage abstract method)
   */
  async assertPageLoaded(): Promise<void> {
    await expectToBeVisible(this.pageTitle);
    await expectToBeVisible(this.linksSection);
  }

  async assertHeroSection(): Promise<void> {
    await expectToBeVisible(this.heroSection);
    await expectToBeVisible(this.pageTitle);
    await expectToBeVisible(this.pageDescription);
  }

  async assertSocialLinksSection(): Promise<void> {
    if (await this.isElementVisible(this.socialLinksSection)) {
      await expectToBeVisible(this.socialLinksSection);
      await expectToBeVisible(this.linkedinLink);
      await expectToBeVisible(this.githubLink);
    }
  }

  async assertProfessionalLinksSection(): Promise<void> {
    if (await this.isElementVisible(this.professionalLinksSection)) {
      await expectToBeVisible(this.professionalLinksSection);
      await expectToBeVisible(this.resumeLink);
      await expectToBeVisible(this.portfolioLink);
      await expectToBeVisible(this.blogLink);
    }
  }

  async assertProjectLinksSection(): Promise<void> {
    if (await this.isElementVisible(this.projectLinksSection)) {
      await expectToBeVisible(this.projectLinksSection);
      await expectToBeVisible(this.projectsList);

      const projectsCount = await this.getProjectsCount();
      await expectToBeGreaterThan(projectsCount, 0, {
        message: "No projects found in projects section",
      });
      // Remove hardcoded count message as no suitable constant exists
    }
  }

  async assertContactLinksSection(): Promise<void> {
    if (await this.isElementVisible(this.contactLinksSection)) {
      await expectToBeVisible(this.contactLinksSection);
      await expectToBeVisible(this.emailLink);
      await expectToBeVisible(this.contactFormLink);
    }
  }

  async assertAllLinksPresent(): Promise<void> {
    const linksCount = await this.getTotalLinksCount();
    await expectToBeGreaterThan(linksCount, 0, {
      message: "No links found on the page",
    });
    // Remove hardcoded count message as no suitable constant exists
  }

  async assertLinksFunctional(): Promise<void> {
    const linkElements = await this.linkUrl.all();

    for (let i = 0; i < linkElements.length; i++) {
      const href = await linkElements[i].getAttribute("href");
      if (!href || href.trim() === "") {
        await expectToHaveAttribute(linkElements[i], "href", /.+/, {
          message: `Link at index ${i} is missing href attribute`,
        });
      }
    }
    // Remove hardcoded success message as no suitable constant exists
  }

  async assertLinksPageTitle(expectedTitle?: string): Promise<void> {
    if (expectedTitle) {
      await expectToHaveText(this.pageTitle, new RegExp(expectedTitle, "i"));
    }
  }

  /**
   * Link validation methods
   */
  async validateLinkAccessibility(): Promise<void> {
    // Check that all links have accessible names
    const linkElements = await this.linkItem.all();

    for (let i = 0; i < linkElements.length; i++) {
      const link = linkElements[i];
      const ariaLabel = await link.getAttribute("aria-label");
      const linkText = await this.getElementText(link);

      if (!ariaLabel && !linkText.trim()) {
        // Create a more appropriate assertion for accessibility
        const hasAccessibleName = ariaLabel ?? linkText.trim();
        await expectToBeGreaterThan(hasAccessibleName ? 1 : 0, 0, {
          message: `Link at index ${i} lacks accessible name (aria-label or text content)`,
        });
      }
    }
    // Remove hardcoded success message as no suitable constant exists
  }

  /**
   * Comprehensive page validation
   */
  async validateFullLinksPage(): Promise<void> {
    // Core page elements
    await this.assertPageLoaded();
    await this.assertHeroSection();

    // Content sections
    await this.assertSocialLinksSection();
    await this.assertProfessionalLinksSection();
    await this.assertProjectLinksSection();
    await this.assertContactLinksSection();

    // Link validation
    await this.assertAllLinksPresent();
    await this.assertLinksFunctional();
    await this.validateLinkAccessibility();
  }
}
