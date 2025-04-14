import type { Page, Locator } from '@playwright/test';

export class Main {
  readonly page: Page;
  readonly next: Locator;
  readonly previous: Locator;

  constructor(page: Page) {
    this.page = page;
    this.next = page.getByRole('link', { name: 'Next' });
    this.previous = page.getByRole('link', { name: 'Previous' });
  }

  async getH1(title: string): Promise<Locator> {
    const locator = this.page.getByRole('heading', { name: `${title}`, exact: true });
    if (await locator.count() === 0) {
      const h1 = await this.page.locator('h1').textContent()
      throw new Error(`"${locator}" not found. Found page.locator('h1') with text: "${h1}"`);
    }
    return locator;
  }

}