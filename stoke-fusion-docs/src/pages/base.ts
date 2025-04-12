import { test as base } from '@playwright/test';
import { Footer } from './footer';
import { Header } from './header';
import { MainContainer } from './main-container';
import { Sidebar } from './sidebar';

type MyFixtures = {
    footer: Footer,
    header: Header,
    mainContainer: MainContainer,
    sidebar: Sidebar,
}

export const test = base.extend<MyFixtures>({
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