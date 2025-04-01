import { test as base, Page } from '@playwright/test';
import { Footer } from './footer';
import { Header } from './header';
import { MainContainer } from './main-container';
import { Sidebar } from './sidebar';

class Base {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async navigate(url: string) {
        await this.page.goto(url);
    }
    async getTitle() {
        return await this.page.title();
    }
}

type MyFixtures = {
    base: Base;
    footer: Footer,
    header: Header,
    mainContainer: MainContainer,
    sidebar: Sidebar,
}

export const test = base.extend<MyFixtures>({
    base: async ({ page }, use) => {
        await use(new Base(page));
    },
    footer: async ({ page }, use) => {
        await use(new Footer(page));
    },
    header: async ({ page }, use) => {
        await use(new Header(page));
    },
    mainContainer: async ({ page }, use) => {
        await use(new MainContainer(page));
    },
    sidebar: async ({ page }, use) => {
        await use(new Sidebar(page));
    }
});