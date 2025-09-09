import { Locator } from "@playwright/test";
import { expectToBeVisible } from "@utils/expect";
import Component from "./basic/component";

export default class Footer extends Component {
  readonly footerText: Locator;
  readonly emailLink: Locator;
  readonly linkedinLink: Locator;

  constructor(locator: Locator) {
    super(locator);
    this.footerText = this.rootEl.locator('[data-testid="footer-text"]');
    this.emailLink = this.rootEl.locator('[data-testid="footer-email"]');
    this.linkedinLink = this.rootEl.locator('[data-testid="footer-linkedin"]');
  }

  async clickEmailLink(): Promise<void> {
    await this.emailLink.click();
  }

  async clickLinkedInLink(): Promise<void> {
    await this.linkedinLink.click();
  }

  async assertFooterVisible(): Promise<void> {
    await expectToBeVisible(this.rootEl);
    await expectToBeVisible(this.footerText);
  }
}
