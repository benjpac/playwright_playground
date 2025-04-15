import type { Page, Locator } from '@playwright/test';

export class Sidebar {
  readonly page: Page;
  readonly fusion: Locator;
  readonly parts: Locator;
  readonly inventory: Locator;
  readonly workflows: Locator;
  readonly workPlans: Locator;
  readonly organization: Locator;
  readonly container: Locator;

  constructor(page: Page) {
    this.page = page;
    this.fusion = page.getByRole('link', { name: 'Fusion', exact: true });
    this.parts = page.getByRole('link', { name: 'Parts', exact: true });
    this.inventory = page.getByRole('link', { name: 'Inventory', exact: true });
    this.workflows = page.getByRole('link', { name: 'Workflows', exact: true });
    this.workPlans = page.getByRole('link', { name: 'Work Plans', exact: true });
    this.organization = page.getByRole('link', { name: 'Organization', exact: true });
    this.container = page.getByRole('navigation', { name: 'Docs sidebar' });
  }

  async getMenuToggleButton(category: string): Promise<Locator> {
    const locator = this.page.getByRole('button', { name: `sidebar category \'${category}\'` });
    return locator;
  }

  async expandMenu(category: string) {
    const button = await this.getMenuToggleButton(category);
    const ariaLabel = await button.getAttribute('aria-label');

    if (!ariaLabel || !ariaLabel.includes('Expand')) {
      throw new Error(`aria-label="${ariaLabel}"`);
    }

    await button.click();
  }

  async collapseMenu(category: string) {
    const button = await this.getMenuToggleButton(category);
    const ariaLabel = await button.getAttribute('aria-label');

    if (!ariaLabel || !ariaLabel.includes('Collapse')) {
      throw new Error(`aria-label="${ariaLabel}"`);
    }

    await button.click();
  }

}