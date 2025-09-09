import { Locator } from "@playwright/test";

interface IComponent {
  readonly rootEl: Locator;
}

export default class Component implements IComponent {
  readonly rootEl: Locator;

  constructor(readonly locator: Locator) {
    this.rootEl = locator;
  }

  async waitFor(state: "visible" | "hidden" = "visible"): Promise<void> {
    return this.rootEl.waitFor({ state });
  }

  async selectOption(option: string): Promise<string[]> {
    return this.rootEl.selectOption(option);
  }

  async scrollIntoView(): Promise<void> {
    return this.rootEl.scrollIntoViewIfNeeded();
  }

  async isVisible(): Promise<boolean> {
    return this.rootEl.isVisible();
  }
}
