import { test as base } from '@playwright/test';
import { Footer } from './footer';
import { Header } from './header';
import { Main } from './main';
import { Sidebar } from './sidebar';

type MyFixtures = {
    footer: Footer,
    header: Header,
    main: Main,
    sidebar: Sidebar,
}

export const test = base.extend<MyFixtures>({
    footer: async ({ page }, use) => {
        await use(new Footer(page));
    },
    header: async ({ page }, use) => {
        await use(new Header(page));
    },
    main: async ({ page }, use) => {
        await use(new Main(page));
    },
    sidebar: async ({ page }, use) => {
        await use(new Sidebar(page));
    }
});