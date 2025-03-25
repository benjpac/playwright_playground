import { test, expect } from '../pom/base.ts';

test('Home page should have correct title', async ({ homePage }) => {
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
test('Home page should have correct header button text v2', async ({ menuPrimaryNavigation, homePage }) => {
    await homePage.open();
    expect(await menuPrimaryNavigation.nova.textContent()).toBe('Nova');
    expect(await menuPrimaryNavigation.team.textContent()).toBe('Team');
    expect(await menuPrimaryNavigation.careers.textContent()).toBe('Careers');
    expect(await menuPrimaryNavigation.news.textContent()).toBe('News');
    expect(await menuPrimaryNavigation.fusion.textContent()).toBe('Fusion by Stoke Space');
    expect(await menuPrimaryNavigation.shop.textContent()).toBe('Shop');
});
