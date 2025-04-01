import type { Page, Locator } from '@playwright/test';

export class Header {
    readonly page: Page;
    readonly fusion: Locator;
    readonly home: Locator;
    readonly colorMode: Locator;

  constructor(page: Page) {
    this.page = page;
    this.fusion = page.getByRole('link', { name: 'Fusion Docs' });
    this.home = page.getByRole('link', { name: 'Parts', exact: true });
    this.colorMode = page.getByRole('button', { name: 'Switch between dark and light' });
  }

}