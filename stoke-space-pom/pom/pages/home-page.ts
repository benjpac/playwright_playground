import type { Page, Locator } from '@playwright/test';

export class HomePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async open() {
    await this.page.goto('https://www.stokespace.com/');
  }

  // prefer constructor locator for page elements
  async getMenuPrimaryNavElement() {
    return await this.page.locator('#menu-primary-navigation')
  }

  // bad use of allInnerTexts
  async getMenuPrimaryNavElementAllInnerTexts() {
    const menuLocator = await this.getMenuPrimaryNavElement();
    return await menuLocator.allInnerTexts();
  }

}