import type { Page, Locator } from '@playwright/test';

export class NovaPage {
    readonly page: Page;
    
    constructor(page: Page) {
        this.page = page;
      }
}
