import { test, expect } from '../pom/base.ts';

test.beforeEach(async ({ homePage }) => {
    await homePage.open();
});

test('Home page should have correct title', async ({ page }) => {
    expect(await page.title()).toBe('Stoke Space / 100% reusable rockets / USA');
});

// this isn't a good way to write this test, but I thought it's interesting that only fails on webkit. some formatting issue after "SHOP"
test.skip('Home page should have correct header button text (BAD EXAMPLE)', async ({ homePage }) => {
    const headerButtonArray = await homePage.getMenuPrimaryNavElementAllInnerTexts();
    console.log(headerButtonArray);
    expect(headerButtonArray).toEqual(expect.arrayContaining(['NOVA\nTEAM\nCAREERS\nNEWS\nFUSION BY STOKE SPACE\nSHOP']));
});

test('Home page should have correct header button text', async ({ menuPrimaryNavigation, homePage }) => {
    expect(await menuPrimaryNavigation.nova.textContent()).toBe('Nova');
    expect(await menuPrimaryNavigation.team.textContent()).toBe('Team');
    expect(await menuPrimaryNavigation.careers.textContent()).toBe('Careers');
    expect(await menuPrimaryNavigation.news.textContent()).toBe('News');
    expect(await menuPrimaryNavigation.fusion.textContent()).toBe('Fusion by Stoke Space');
    expect(await menuPrimaryNavigation.shop.textContent()).toBe('Shop');
});
