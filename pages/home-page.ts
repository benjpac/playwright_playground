import type { Page } from '@playwright/test';

export class HomePage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async open() {
    await this.page.goto('https://www.stokespace.com/');
  }

  async getTitle() {
    return await this.page.title();
  }

  async getHeaderButtonText() {
    return await this.page.textContent('[id^="menu-item"]');
  }

  async getAllChildTextContentOfMenu(): Promise<string[]> {
    const elements = this.page.locator('#menu-primary-navigation').locator('*'); // Select all child elements
    const count = await elements.count();
    const textContents: string[] = [];
    for (let i = 0; i < count; i++) {
      textContents.push(await elements.nth(i).textContent() || '');
    }
    return textContents;
  }
}