import { PATHS } from "@/data/constants";
import { Locator, Page } from "@playwright/test";
import {
  expectToBeGreaterThan,
  expectToBeVisible,
  expectToHaveText,
} from "@utils/expect";
import { BasePage } from "./BasePage";

/**
 * Page Object Model for the About Me Page
 * Extends BasePage with About Me-specific functionality
 */
export class AboutMePage extends BasePage {
  // Page sections
  readonly aboutSection: Locator;
  readonly heroSection: Locator;
  readonly skillsSection: Locator;
  readonly experienceSection: Locator;
  readonly educationSection: Locator;

  // Header content
  readonly pageTitle: Locator;
  readonly pageSubtitle: Locator;
  readonly profileImage: Locator;

  // About content
  readonly aboutText: Locator;
  readonly aboutDescription: Locator;

  // Skills section
  readonly skillsList: Locator;
  readonly skillItem: Locator;
  readonly technicalSkills: Locator;
  readonly softSkills: Locator;

  // Experience section
  readonly experienceList: Locator;
  readonly experienceItem: Locator;
  readonly jobTitle: Locator;
  readonly companyName: Locator;
  readonly jobDuration: Locator;
  readonly jobDescription: Locator;

  // Education section
  readonly educationList: Locator;
  readonly educationItem: Locator;
  readonly degree: Locator;
  readonly institution: Locator;
  readonly graduationYear: Locator;

  // Contact information
  readonly contactInfo: Locator;
  readonly emailContact: Locator;
  readonly socialLinks: Locator;
  readonly linkedinLink: Locator;
  readonly githubLink: Locator;

  // Navigation elements
  readonly backToHomeLink: Locator;
  readonly downloadCVButton: Locator;

  constructor(page: Page) {
    super(page);

    // Page sections
    this.aboutSection = page.locator('[data-testid="about-section"]');
    this.heroSection = page.locator('[data-testid="about-hero"]');
    this.skillsSection = page.locator('[data-testid="skills-section"]');
    this.experienceSection = page.locator('[data-testid="experience-section"]');
    this.educationSection = page.locator('[data-testid="education-section"]');

    // Header content
    this.pageTitle = page.locator('[data-testid="about-title"]');
    this.pageSubtitle = page.locator('[data-testid="about-subtitle"]');
    this.profileImage = page.locator('[data-testid="profile-image"]');

    // About content
    this.aboutText = page.locator('[data-testid="about-text"]');
    this.aboutDescription = page.locator('[data-testid="about-description"]');

    // Skills section
    this.skillsList = page.locator('[data-testid="skills-list"]');
    this.skillItem = page.locator('[data-testid="skill-item"]');
    this.technicalSkills = page.locator('[data-testid="technical-skills"]');
    this.softSkills = page.locator('[data-testid="soft-skills"]');

    // Experience section
    this.experienceList = page.locator('[data-testid="experience-list"]');
    this.experienceItem = page.locator('[data-testid="experience-item"]');
    this.jobTitle = page.locator('[data-testid="job-title"]');
    this.companyName = page.locator('[data-testid="company-name"]');
    this.jobDuration = page.locator('[data-testid="job-duration"]');
    this.jobDescription = page.locator('[data-testid="job-description"]');

    // Education section
    this.educationList = page.locator('[data-testid="education-list"]');
    this.educationItem = page.locator('[data-testid="education-item"]');
    this.degree = page.locator('[data-testid="degree"]');
    this.institution = page.locator('[data-testid="institution"]');
    this.graduationYear = page.locator('[data-testid="graduation-year"]');

    // Contact information
    this.contactInfo = page.locator('[data-testid="contact-info"]');
    this.emailContact = page.locator('[data-testid="email-contact"]');
    this.socialLinks = page.locator('[data-testid="social-links"]');
    this.linkedinLink = page.locator('[data-testid="linkedin-link"]');
    this.githubLink = page.locator('[data-testid="github-link"]');

    // Navigation elements
    this.backToHomeLink = page.locator('[data-testid="back-to-home"]');
    this.downloadCVButton = page.locator('[data-testid="download-cv-button"]');
  }

  /**
   * Navigation methods
   */
  async gotoAbout(): Promise<void> {
    await this.goto(PATHS.ABOUT);
    await this.assertPageLoaded();
  }

  async goBackToHome(): Promise<void> {
    await this.safeClick(this.backToHomeLink);
    await this.waitForPageLoad();
  }

  /**
   * Content interaction methods
   */
  async downloadCV(): Promise<void> {
    if (await this.isElementVisible(this.downloadCVButton)) {
      await this.safeClick(this.downloadCVButton);
    }
  }

  async clickLinkedInProfile(): Promise<void> {
    await this.safeClick(this.linkedinLink);
  }

  async clickGitHubProfile(): Promise<void> {
    await this.safeClick(this.githubLink);
  }

  async clickEmailContact(): Promise<void> {
    await this.safeClick(this.emailContact);
  }

  /**
   * Content validation methods
   */
  async getSkillsCount(): Promise<number> {
    return await this.getElementCount(this.skillItem);
  }

  async getExperienceCount(): Promise<number> {
    return await this.getElementCount(this.experienceItem);
  }

  async getEducationCount(): Promise<number> {
    return await this.getElementCount(this.educationItem);
  }

  async getAllSkills(): Promise<string[]> {
    const skills: string[] = [];
    const skillElements = await this.skillItem.all();

    for (const skill of skillElements) {
      const skillText = await this.getElementText(skill);
      skills.push(skillText);
    }

    return skills;
  }

  /**
   * Assertion methods (implements BasePage abstract method)
   */
  async assertPageLoaded(): Promise<void> {
    await expectToBeVisible(this.pageTitle);
    await expectToBeVisible(this.aboutSection);
  }

  async assertHeroSection(): Promise<void> {
    await expectToBeVisible(this.heroSection);
    await expectToBeVisible(this.pageTitle);
    await expectToBeVisible(this.pageSubtitle);

    if (await this.isElementVisible(this.profileImage)) {
      await expectToBeVisible(this.profileImage);
    }
  }

  async assertAboutContent(): Promise<void> {
    await expectToBeVisible(this.aboutText);
    await expectToBeVisible(this.aboutDescription);
  }

  async assertSkillsSection(): Promise<void> {
    await expectToBeVisible(this.skillsSection);
    await expectToBeVisible(this.skillsList);

    const skillCount = await this.getSkillsCount();
    await expectToBeGreaterThan(skillCount, 0, {
      message: "No skills found in skills section - expected at least 1 skill",
    });
  }

  async assertExperienceSection(): Promise<void> {
    await expectToBeVisible(this.experienceSection);
    await expectToBeVisible(this.experienceList);

    const experienceCount = await this.getExperienceCount();
    await expectToBeGreaterThan(experienceCount, 0, {
      message:
        "No experience entries found - expected at least 1 experience entry",
    });
  }

  async assertEducationSection(): Promise<void> {
    await expectToBeVisible(this.educationSection);
    await expectToBeVisible(this.educationList);

    const educationCount = await this.getEducationCount();
    await expectToBeGreaterThan(educationCount, 0, {
      message:
        "No education entries found - expected at least 1 education entry",
    });
  }

  async assertContactInformation(): Promise<void> {
    if (await this.isElementVisible(this.contactInfo)) {
      await expectToBeVisible(this.contactInfo);
    }

    if (await this.isElementVisible(this.emailContact)) {
      await expectToBeVisible(this.emailContact);
    }

    if (await this.isElementVisible(this.socialLinks)) {
      await expectToBeVisible(this.socialLinks);
    }
  }

  async assertSocialLinks(): Promise<void> {
    if (await this.isElementVisible(this.linkedinLink)) {
      await expectToBeVisible(this.linkedinLink);
    }

    if (await this.isElementVisible(this.githubLink)) {
      await expectToBeVisible(this.githubLink);
    }
  }

  async assertAboutPageTitle(expectedTitle?: string): Promise<void> {
    if (expectedTitle) {
      await expectToHaveText(this.pageTitle, new RegExp(expectedTitle, "i"));
    }
  }

  /**
   * Comprehensive page validation
   */
  async validateFullAboutPage(): Promise<void> {
    // Core page elements
    await this.assertPageLoaded();
    await this.assertHeroSection();
    await this.assertAboutContent();

    // Content sections
    await this.assertSkillsSection();
    await this.assertExperienceSection();
    await this.assertEducationSection();

    // Contact information
    await this.assertContactInformation();
    await this.assertSocialLinks();
  }
}
