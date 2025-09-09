import { Locator } from "@playwright/test";
import Component from "./component";

export default class ElementsCollection extends Component {
  getItemByIndex(index: number | "last"): Locator {
    return index === "last" ? this.rootEl.last() : this.rootEl.nth(index);
  }

  async getItemCount(withWait = true): Promise<number> {
    if (withWait) await this.rootEl.first().waitFor();
    return this.rootEl.count();
  }

  getItemTextByIndex(index: number): Promise<string> {
    return this.rootEl.nth(index).innerText();
  }

  async chooseFirst(): Promise<void> {
    return this.rootEl.first().click();
  }

  async chooseLast(): Promise<void> {
    return this.rootEl.last().click();
  }

  async clickItemByIndex(index: number): Promise<void> {
    const element = this.getItemByIndex(index);
    return element.click({ force: true, delay: 500 });
  }

  getItemByText(text: string): Locator {
    return this.rootEl.filter({ hasText: text }).first();
  }

  async clickItemByText(text: string): Promise<void> {
    return this.getItemByText(text).click();
  }

  async getAllItemsText(): Promise<string[]> {
    await this.rootEl.first().waitFor();
    return this.rootEl.allInnerTexts();
  }

  // async getAllItemsLinks(): Promise<string[]> {
  //   const count = await this.getItemCount(true);
  //   const links = [];

  //   for (let i = 0; i < count; i++) {
  //     links.push(await this.rootEl.nth(i).getAttribute("href"));
  //   }

  //   return links;
  // }

  // async getAttributeByIndex(
  //   index: number | "last",
  //   attribute: TAttributes
  // ): Promise<string> {
  //   return this.getItemByIndex(index).getAttribute(attribute);
  // }
}
