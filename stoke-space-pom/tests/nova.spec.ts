import { test, expect } from '../base.ts';

// using getNovaNavElement method
test('Click Nova and verify title', async ({ homePage }) => {
    await homePage.open();
    const novaNavElement = await homePage.getNovaNavElement();
    await novaNavElement.click();
    expect(await homePage.getTitle()).toBe('Nova | Stoke Space / 100% reusable rockets / USA');
});

// with novaNavButton element locator in page constructor (preferred)
test('Click Nova and verify title v2', async ({ homePage }) => {
    await homePage.open();
    await homePage.novaNavButton.click();
    expect(await homePage.getTitle()).toBe('Nova | Stoke Space / 100% reusable rockets / USA');
});