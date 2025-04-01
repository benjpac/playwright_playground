import type { Page, Locator } from '@playwright/test';

export class MainContainer {
    readonly page: Page;
    readonly header: Locator;
    readonly sidebar: Locator;
    readonly content: Locator;

  constructor(page: Page) {
    this.page = page;
    this.header = page.locator('#header');
    this.sidebar = page.locator('#sidebar');
    this.content = page.locator('#content');
  }

}