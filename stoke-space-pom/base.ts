import { test as base } from '@playwright/test';
import { HomePage, NovaPage } from './pom/pages';

type MyFixtures = {
    homePage: HomePage;
    novaPage: NovaPage;
}

export const test = base.extend<MyFixtures>({
    homePage: async ({ page }, use) => {
        await use(new HomePage(page));
    },
    novaPage: async ({ page }, use) => {
        await use(new NovaPage(page));
    },
});

export { expect } from '@playwright/test';