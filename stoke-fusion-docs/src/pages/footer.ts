import type { Page, Locator } from '@playwright/test';

export class Footer {
  readonly page: Page;
  readonly resources: Locator;
  readonly status: Locator;

  constructor(page: Page) {
    this.page = page;
    this.resources = page.getByText('Resources');
    this.status = page.getByRole('link', { name: 'Site Status' });
  }
}
