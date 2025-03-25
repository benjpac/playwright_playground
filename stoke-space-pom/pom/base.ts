import { test as base } from '@playwright/test';
import { HomePage } from './pages/home-page';
import { NovaPage } from './pages/nova-page';
import { menuPrimaryNavigation } from './common/menu-primary-navigation';

type MyFixtures = {
    homePage: HomePage;
    novaPage: NovaPage;
    menuPrimaryNavigation: menuPrimaryNavigation;
}

export const test = base.extend<MyFixtures>({
    homePage: async ({ page }, use) => {
        await use(new HomePage(page));
    },
    novaPage: async ({ page }, use) => {
        await use(new NovaPage(page));
    },
    menuPrimaryNavigation: async ({ page }, use) => {
        await use(new menuPrimaryNavigation(page));
    }
});

export { expect } from '@playwright/test';