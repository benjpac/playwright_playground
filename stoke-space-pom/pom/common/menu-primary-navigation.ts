import type { Page, Locator } from '@playwright/test';

export class MenuPrimaryNavigation {
    readonly page: Page;
    readonly nova: Locator;
    readonly team: Locator;
    readonly careers: Locator;
    readonly news: Locator;
    readonly fusion: Locator;
    readonly shop: Locator;

  constructor(page: Page) {
    this.page = page;
    this.nova = page.locator('#menu-primary-navigation #menu-item-360', { hasText: 'Nova'});
    this.team = page.locator('#menu-primary-navigation #menu-item-361', { hasText: 'Team'});
    this.careers = page.locator('#menu-primary-navigation #menu-item-358', { hasText: 'Careers'});
    this.news = page.locator('#menu-primary-navigation #menu-item-357', { hasText: 'News'});
    this.fusion = page.locator('#menu-primary-navigation #menu-item-864', { hasText: 'Fusion by Stoke Space'});
    this.shop = page.locator('#menu-primary-navigation #menu-item-857', { hasText: 'Shop'});
  }

}