import { test, expect } from '@playwright/test';

import { HomePage } from '../pages/home-page';

// using getNovaNavElement method
test('Click Nova and verify title', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.open();
    const novaNavElement = await homePage.getNovaNavElement();
    await novaNavElement.click();
    expect(await homePage.getTitle()).toBe('Nova | Stoke Space / 100% reusable rockets / USA');
});

// with novaNavButton element locator in page constructor (preferred)
test('Click Nova and verify title v2', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.open();
    await homePage.novaNavButton.click();
    expect(await homePage.getTitle()).toBe('Nova | Stoke Space / 100% reusable rockets / USA');
});