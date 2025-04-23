import type { Page, Locator } from '@playwright/test';

export class Main {
  readonly page: Page;
  readonly next: Locator;
  readonly previous: Locator;
  readonly content: Locator;

  constructor(page: Page) {
    this.page = page;
    this.next = page.getByRole('link', { name: 'Next' });
    this.previous = page.getByRole('link', { name: 'Previous' });
    this.content = page.getByRole('main').locator('div').first();
  }

  async getH1(title: string): Promise<Locator> {
    const locator = this.page.getByRole('heading', { name: `${title}`, exact: true });
    return locator;
  }

}