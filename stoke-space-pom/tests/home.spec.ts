import { test, expect } from '../base.ts';

test.only('Home page should have correct title', async ({ homePage }) => {
    await homePage.open();
    expect(await homePage.getTitle()).toBe('Stoke Space / 100% reusable rockets / USA');
});

// this isn't a good way to write this test, but I thought it's interesting that only fails on webkit. some formatting issue after "SHOP"
test('Home page should have correct header button text', async ({ homePage }) => {
    await homePage.open();
    const headerButtonArray = await homePage.getMenuPrimaryNavElementAllInnerTexts();
    console.log(headerButtonArray);
    expect(headerButtonArray).toEqual(expect.arrayContaining(['NOVA\nTEAM\nCAREERS\nNEWS\nFUSION BY STOKE SPACE\nSHOP']));
});

// better way to test header button text. would move menu item locators to pages/home-page.ts
test('Home page should have correct header button text v2', async ({ homePage }) => {
    await homePage.open();
    const menuPrimaryNavElement = await homePage.getMenuPrimaryNavElement();
    expect(await menuPrimaryNavElement.locator('#menu-item-360').textContent()).toBe('Nova');
    expect(await menuPrimaryNavElement.locator('#menu-item-361').textContent()).toBe('Team');
    expect(await menuPrimaryNavElement.locator('#menu-item-358').textContent()).toBe('Careers');
    expect(await menuPrimaryNavElement.locator('#menu-item-357').textContent()).toBe('News');
    expect(await menuPrimaryNavElement.locator('#menu-item-864').textContent()).toBe('Fusion by Stoke Space');
    expect(await menuPrimaryNavElement.locator('#menu-item-857').textContent()).toBe('Shop');
});
