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
    console.log(`locator: ${await locator.textContent()}`);
    const count = await locator.count();
    if (count === 0) {
      const h1 = this.page.locator('h1')
      throw new Error(`Heading with title "${title}" not found. Found page.locator('h1'): "${await h1.textContent()}"`);
    }
    return locator;
  }

}