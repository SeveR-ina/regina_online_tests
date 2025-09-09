import { Locator, Page } from "@playwright/test";
import { getProtectedPaths } from "@test-data/constants";
import { BasePage } from "./BasePage";

export class BlogEditorPage extends BasePage {
  readonly title: Locator;
  readonly content: Locator;
  readonly saveBtn: Locator;

  constructor(protected readonly page: Page) {
    super(page);

    this.title = this.page.getByLabel(/title|titel/i);
    this.content = this.page
      .getByLabel(/content|inhalt/i)
      .or(this.page.locator('[contenteditable="true"]'));
    this.saveBtn = this.page.getByRole("button", {
      name: /save|publish|speichern|veröffentlichen/i,
    });
  }

  /**
   * Implementation of abstract method from BasePage
   */
  async assertPageLoaded(): Promise<void> {
    await this.title.waitFor({ state: "visible" });
    await this.content.waitFor({ state: "visible" });
    await this.saveBtn.waitFor({ state: "visible" });
  }

  async gotoNew() {
    const protectedPaths = getProtectedPaths();
    await this.page.goto(protectedPaths.PROTECTED_CONTENT_CREATE);
  }

  async create(title: string, content: string) {
    await this.title.fill(title);
    await this.content.fill(content);
    await this.saveBtn.click();
  }
}
