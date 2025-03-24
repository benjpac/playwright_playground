import type { Page } from '@playwright/test';

export class HomePage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async open() {
    await this.page.goto('https://www.stokespace.com/');
  }

  async getTitle() {
    return await this.page.title();
  }

  async getMenuPrimaryNavElement() {
    return await this.page.locator('#menu-primary-navigation')
  }

  async getMenuPrimaryNavElementAllInnerTexts() {
    const menuLocator = await this.getMenuPrimaryNavElement();
    return menuLocator.allInnerTexts();
  }

}