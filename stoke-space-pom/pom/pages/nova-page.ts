import type { Page, Locator } from '@playwright/test';

export class NovaPage {
    readonly page: Page;
    readonly downmassFeatures: Locator;

    constructor(page: Page) {
        this.page = page;
        this.downmassFeatures = page.locator('button', { hasText: 'Downmass Features'});
      }

      async open() {
        await this.page.goto('https://www.stokespace.com/nova');
      }
}
