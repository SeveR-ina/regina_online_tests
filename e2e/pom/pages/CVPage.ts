import { PATHS } from "@/data/constants";
import { Locator, Page } from "@playwright/test";
import {
  expectToBeGreaterThan,
  expectToBeTruthy,
  expectToBeVisible,
  expectToHaveText,
} from "@utils/expect";
import { BasePage } from "./BasePage";

/**
 * Page Object Model for the CV Page
 * Extends BasePage with CV-specific functionality
 */
export class CVPage extends BasePage {
  // Page sections
  readonly cvSection: Locator;
  readonly heroSection: Locator;

  // Header content
  readonly pageTitle: Locator;
  readonly pageSubtitle: Locator;

  // Personal information
  readonly personalInfoSection: Locator;
  readonly fullName: Locator;
  readonly jobTitle: Locator;
  readonly location: Locator;
  readonly email: Locator;
  readonly phone: Locator;
  readonly website: Locator;
  readonly profilePhoto: Locator;

  // Professional summary
  readonly summarySection: Locator;
  readonly summaryText: Locator;

  // Work experience
  readonly experienceSection: Locator;
  readonly experienceList: Locator;
  readonly experienceItem: Locator;
  readonly experienceTitle: Locator;
  readonly companyName: Locator;
  readonly workDuration: Locator;
  readonly experienceDescription: Locator;
  readonly achievements: Locator;

  // Education
  readonly educationSection: Locator;
  readonly educationList: Locator;
  readonly educationItem: Locator;
  readonly degree: Locator;
  readonly institution: Locator;
  readonly graduationDate: Locator;
  readonly educationDescription: Locator;

  // Skills
  readonly skillsSection: Locator;
  readonly technicalSkills: Locator;
  readonly softSkills: Locator;
  readonly skillCategory: Locator;
  readonly skillItem: Locator;
  readonly skillLevel: Locator;

  // Languages
  readonly languagesSection: Locator;
  readonly languageItem: Locator;
  readonly languageName: Locator;
  readonly languageProficiency: Locator;

  // Certifications
  readonly certificationsSection: Locator;
  readonly certificationItem: Locator;
  readonly certificationName: Locator;
  readonly issuingOrganization: Locator;
  readonly certificationDate: Locator;

  // Projects
  readonly projectsSection: Locator;
  readonly projectItem: Locator;
  readonly projectName: Locator;
  readonly projectDescription: Locator;
  readonly projectTechnologies: Locator;
  readonly projectUrl: Locator;

  // Actions
  readonly downloadPdfButton: Locator;
  readonly printButton: Locator;
  readonly shareButton: Locator;
  readonly backToHomeLink: Locator;

  // Contact links
  readonly linkedinProfile: Locator;
  readonly githubProfile: Locator;

  constructor(page: Page) {
    super(page);

    // Page sections
    this.cvSection = page.locator('[data-testid="cv-section"]');
    this.heroSection = page.locator('[data-testid="cv-hero"]');

    // Header content
    this.pageTitle = page.locator('[data-testid="cv-title"]');
    this.pageSubtitle = page.locator('[data-testid="cv-subtitle"]');

    // Personal information
    this.personalInfoSection = page.locator(
      '[data-testid="personal-info-section"]'
    );
    this.fullName = page.locator('[data-testid="full-name"]');
    this.jobTitle = page.locator('[data-testid="job-title"]');
    this.location = page.locator('[data-testid="location"]');
    this.email = page.locator('[data-testid="email"]');
    this.phone = page.locator('[data-testid="phone"]');
    this.website = page.locator('[data-testid="website"]');
    this.profilePhoto = page.locator('[data-testid="profile-photo"]');

    // Professional summary
    this.summarySection = page.locator('[data-testid="summary-section"]');
    this.summaryText = page.locator('[data-testid="summary-text"]');

    // Work experience
    this.experienceSection = page.locator('[data-testid="experience-section"]');
    this.experienceList = page.locator('[data-testid="experience-list"]');
    this.experienceItem = page.locator('[data-testid="experience-item"]');
    this.experienceTitle = page.locator('[data-testid="experience-title"]');
    this.companyName = page.locator('[data-testid="company-name"]');
    this.workDuration = page.locator('[data-testid="work-duration"]');
    this.experienceDescription = page.locator(
      '[data-testid="experience-description"]'
    );
    this.achievements = page.locator('[data-testid="achievements"]');

    // Education
    this.educationSection = page.locator('[data-testid="education-section"]');
    this.educationList = page.locator('[data-testid="education-list"]');
    this.educationItem = page.locator('[data-testid="education-item"]');
    this.degree = page.locator('[data-testid="degree"]');
    this.institution = page.locator('[data-testid="institution"]');
    this.graduationDate = page.locator('[data-testid="graduation-date"]');
    this.educationDescription = page.locator(
      '[data-testid="education-description"]'
    );

    // Skills
    this.skillsSection = page.locator('[data-testid="skills-section"]');
    this.technicalSkills = page.locator('[data-testid="technical-skills"]');
    this.softSkills = page.locator('[data-testid="soft-skills"]');
    this.skillCategory = page.locator('[data-testid="skill-category"]');
    this.skillItem = page.locator('[data-testid="skill-item"]');
    this.skillLevel = page.locator('[data-testid="skill-level"]');

    // Languages
    this.languagesSection = page.locator('[data-testid="languages-section"]');
    this.languageItem = page.locator('[data-testid="language-item"]');
    this.languageName = page.locator('[data-testid="language-name"]');
    this.languageProficiency = page.locator(
      '[data-testid="language-proficiency"]'
    );

    // Certifications
    this.certificationsSection = page.locator(
      '[data-testid="certifications-section"]'
    );
    this.certificationItem = page.locator('[data-testid="certification-item"]');
    this.certificationName = page.locator('[data-testid="certification-name"]');
    this.issuingOrganization = page.locator(
      '[data-testid="issuing-organization"]'
    );
    this.certificationDate = page.locator('[data-testid="certification-date"]');

    // Projects
    this.projectsSection = page.locator('[data-testid="projects-section"]');
    this.projectItem = page.locator('[data-testid="project-item"]');
    this.projectName = page.locator('[data-testid="project-name"]');
    this.projectDescription = page.locator(
      '[data-testid="project-description"]'
    );
    this.projectTechnologies = page.locator(
      '[data-testid="project-technologies"]'
    );
    this.projectUrl = page.locator('[data-testid="project-url"]');

    // Actions
    this.downloadPdfButton = page.locator(
      '[data-testid="download-pdf-button"]'
    );
    this.printButton = page.locator('[data-testid="print-button"]');
    this.shareButton = page.locator('[data-testid="share-button"]');
    this.backToHomeLink = page.locator('[data-testid="back-to-home"]');

    // Contact links
    this.linkedinProfile = page.locator('[data-testid="linkedin-profile"]');
    this.githubProfile = page.locator('[data-testid="github-profile"]');
  }

  /**
   * Navigation methods
   */
  async gotoCV(): Promise<void> {
    await this.goto(PATHS.CV);
    await this.assertPageLoaded();
  }

  async goBackToHome(): Promise<void> {
    await this.backToHomeLink.click();
    await this.waitForPageLoad();
  }

  /**
   * Action methods
   */
  async downloadPDF(): Promise<void> {
    await this.downloadPdfButton.click();
  }

  async printCV(): Promise<void> {
    if (await this.isElementVisible(this.printButton)) {
      await this.printButton.click();
    }
  }

  async clickLinkedInProfile(): Promise<void> {
    await this.linkedinProfile.click();
  }

  async clickGitHubProfile(): Promise<void> {
    await this.githubProfile.click();
  }

  /**
   * Content validation methods
   */
  async getExperienceCount(): Promise<number> {
    return await this.getElementCount(this.experienceItem);
  }

  async getEducationCount(): Promise<number> {
    return await this.getElementCount(this.educationItem);
  }

  async getSkillsCount(): Promise<number> {
    return await this.getElementCount(this.skillItem);
  }

  async getLanguagesCount(): Promise<number> {
    return await this.getElementCount(this.languageItem);
  }

  async getCertificationsCount(): Promise<number> {
    return await this.getElementCount(this.certificationItem);
  }

  async getProjectsCount(): Promise<number> {
    return await this.getElementCount(this.projectItem);
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

  async getAllExperienceTitles(): Promise<string[]> {
    const titles: string[] = [];
    const titleElements = await this.experienceTitle.all();

    for (const title of titleElements) {
      const titleText = await this.getElementText(title);
      titles.push(titleText);
    }

    return titles;
  }

  async getContactInformation(): Promise<{
    email?: string;
    phone?: string;
    website?: string;
    location?: string;
  }> {
    const email = await this.getElementText(this.email);
    const phone = await this.getElementText(this.phone);
    const website = await this.getElementText(this.website);
    const location = await this.getElementText(this.location);

    return { email, phone, website, location };
  }

  /**
   * Assertion methods (implements BasePage abstract method)
   */
  async assertPageLoaded(): Promise<void> {
    await expectToBeVisible(this.pageTitle);
    await expectToBeVisible(this.cvSection);
  }

  async assertHeroSection(): Promise<void> {
    await expectToBeVisible(this.heroSection);
    await expectToBeVisible(this.pageTitle);
    await expectToBeVisible(this.pageSubtitle);
  }

  async assertPersonalInformation(): Promise<void> {
    await expectToBeVisible(this.personalInfoSection);
    await expectToBeVisible(this.fullName);
    await expectToBeVisible(this.jobTitle);

    // Optional fields
    if (await this.isElementVisible(this.email)) {
      await expectToBeVisible(this.email);
    }

    if (await this.isElementVisible(this.location)) {
      await expectToBeVisible(this.location);
    }

    if (await this.isElementVisible(this.profilePhoto)) {
      await expectToBeVisible(this.profilePhoto);
    }
  }

  async assertSummarySection(): Promise<void> {
    if (await this.isElementVisible(this.summarySection)) {
      await expectToBeVisible(this.summarySection);
      await expectToBeVisible(this.summaryText);
    }
  }

  async assertExperienceSection(): Promise<void> {
    await expectToBeVisible(this.experienceSection);
    await expectToBeVisible(this.experienceList);

    const experienceCount = await this.getExperienceCount();
    await expectToBeGreaterThan(experienceCount, 0, {
      message:
        "No work experience entries found - expected at least 1 experience entry",
    });
    // Remove hardcoded count message as no suitable constant exists
  }

  async assertEducationSection(): Promise<void> {
    await expectToBeVisible(this.educationSection);
    await expectToBeVisible(this.educationList);

    const educationCount = await this.getEducationCount();
    await expectToBeGreaterThan(educationCount, 0, {
      message:
        "No education entries found - expected at least 1 education entry",
    });
    // Remove hardcoded count message as no suitable constant exists
  }

  async assertSkillsSection(): Promise<void> {
    await expectToBeVisible(this.skillsSection);

    const skillsCount = await this.getSkillsCount();
    await expectToBeGreaterThan(skillsCount, 0, {
      message: "No skills found - expected at least 1 skill",
    });
    // Remove hardcoded count message as no suitable constant exists

    if (await this.isElementVisible(this.technicalSkills)) {
      await expectToBeVisible(this.technicalSkills);
    }

    if (await this.isElementVisible(this.softSkills)) {
      await expectToBeVisible(this.softSkills);
    }
  }

  async assertLanguagesSection(): Promise<void> {
    if (await this.isElementVisible(this.languagesSection)) {
      await expectToBeVisible(this.languagesSection);
      // Remove hardcoded count message as no suitable constant exists
    }
  }

  async assertCertificationsSection(): Promise<void> {
    if (await this.isElementVisible(this.certificationsSection)) {
      await expectToBeVisible(this.certificationsSection);
      // Remove hardcoded count message as no suitable constant exists
    }
  }

  async assertProjectsSection(): Promise<void> {
    if (await this.isElementVisible(this.projectsSection)) {
      await expectToBeVisible(this.projectsSection);
      // Remove hardcoded count message as no suitable constant exists
    }
  }

  async assertDownloadFunctionality(): Promise<void> {
    if (await this.isElementVisible(this.downloadPdfButton)) {
      await expectToBeVisible(this.downloadPdfButton);
    }
  }

  async assertContactLinks(): Promise<void> {
    if (await this.isElementVisible(this.linkedinProfile)) {
      await expectToBeVisible(this.linkedinProfile);
    }

    if (await this.isElementVisible(this.githubProfile)) {
      await expectToBeVisible(this.githubProfile);
    }
  }

  async assertCVPageTitle(expectedTitle?: string): Promise<void> {
    if (expectedTitle) {
      await expectToHaveText(this.pageTitle, new RegExp(expectedTitle, "i"));
    }
  }

  /**
   * CV validation methods
   */
  async validateCVCompleteness(): Promise<void> {
    // Check required sections
    const requiredSections = [
      { name: "Personal Info", check: () => this.assertPersonalInformation() },
      { name: "Experience", check: () => this.assertExperienceSection() },
      { name: "Education", check: () => this.assertEducationSection() },
      { name: "Skills", check: () => this.assertSkillsSection() },
    ];

    for (const section of requiredSections) {
      // eslint-disable-next-line no-useless-catch
      try {
        await section.check();
      } catch (error) {
        // Remove hardcoded error message as no suitable constant exists
        throw error;
      }
    }
  }

  async validateContactInformation(): Promise<void> {
    const contactInfo = await this.getContactInformation();

    await expectToBeTruthy(contactInfo.email, {
      message: "Email contact information is missing",
    });

    await expectToBeTruthy(contactInfo.location, {
      message: "Location information is missing",
    });
  }

  /**
   * Comprehensive page validation
   */
  async validateFullCVPage(): Promise<void> {
    // Core page elements
    await this.assertPageLoaded();
    await this.assertHeroSection();
    await this.assertPersonalInformation();

    // Content sections
    await this.assertSummarySection();
    await this.assertExperienceSection();
    await this.assertEducationSection();
    await this.assertSkillsSection();

    // Optional sections
    await this.assertLanguagesSection();
    await this.assertCertificationsSection();
    await this.assertProjectsSection();

    // Functionality
    await this.assertDownloadFunctionality();
    await this.assertContactLinks();

    // Validation checks
    await this.validateCVCompleteness();
    await this.validateContactInformation();
  }
}
