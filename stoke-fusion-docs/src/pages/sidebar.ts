import type { Page, Locator } from '@playwright/test';

export class Sidebar {
    readonly page: Page;
    readonly fusion: Locator;
    readonly parts: Locator;
    readonly inventory: Locator;
    readonly workflows: Locator;
    readonly workPlans: Locator;
    readonly organization: Locator;

  constructor(page: Page) {
    this.page = page;
    this.fusion = page.getByRole('link', { name: 'Fusion', exact: true });
    this.parts = page.getByRole('link', { name: 'Parts', exact: true });
    this.inventory = page.getByRole('link', { name: 'Inventory', exact: true });
    this.workflows = page.getByRole('link', { name: 'Workflows', exact: true });
    this.workPlans = page.getByRole('link', { name: 'Work Plans', exact: true });
    this.organization = page.getByRole('link', { name: 'Organization', exact: true });
  }

  async collapse(category: String) {
    await this.page.getByRole('button', { name: `Collapse sidebar category \'${category}\'` }).click();
  }

  async expand(category: String) {
    await this.page.getByRole('button', { name: `Expand sidebar category \'${category}\'` }).click();
  }

  async getSidebar() {
    return this.page.getByRole('navigation', { name: 'Docs sidebar' });
  }

}