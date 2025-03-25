import { test as base } from '@playwright/test';
import { HomePage } from './pages/home-page';
import { NovaPage } from './pages/nova-page';
import { MenuPrimaryNavigation } from './common/menu-primary-navigation';

type MyFixtures = {
    homePage: HomePage;
    novaPage: NovaPage;
    menuPrimaryNavigation: MenuPrimaryNavigation;
}

export const test = base.extend<MyFixtures>({
    homePage: async ({ page }, use) => {
        await use(new HomePage(page));
    },
    novaPage: async ({ page }, use) => {
        await use(new NovaPage(page));
    },
    menuPrimaryNavigation: async ({ page }, use) => {
        await use(new MenuPrimaryNavigation(page));
    }
});

export { expect } from '@playwright/test';