import type { Page, Locator } from '@playwright/test';

export class HomePage {
  readonly page: Page;
  readonly novaNavButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.novaNavButton = page.locator('#menu-primary-navigation #menu-item-360', { hasText: 'Nova'});
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
    return await menuLocator.allInnerTexts();
  }

  async getNovaNavElement() {
    const menuLocator = await this.getMenuPrimaryNavElement()
    return await menuLocator.locator('#menu-item-360');
  }

}