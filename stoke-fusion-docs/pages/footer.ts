import type { Page, Locator } from '@playwright/test';

export class Footer {
    readonly page: Page;
    readonly fusion: Locator;
    readonly parts: Locator;

    constructor(page: Page) {
        this.page = page;
        this.fusion = page.getByRole('link', { name: 'Fusion Docs' });
        this.parts = page.getByRole('link', { name: 'Parts', exact: true });
    }
}