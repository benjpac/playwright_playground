import { test, expect } from '../pom/base.ts';

test.beforeEach(async ({ homePage }) => {
    await homePage.open();
});

test('Home page should have correct title', async ({ page }) => {
    await expect(await page.title()).toBe('Stoke Space / 100% reusable rockets / USA');
});

// this isn't a good way to write this test, but I thought it's interesting that only fails on webkit. some formatting issue after "SHOP"
// test.skip(): Skips the test unconditionally or based on a condition.
// test.fixme(): Marks the test as failing and skips it.
test.skip('Home page should have correct header button text (BAD EXAMPLE)', async ({ homePage }) => {
    const headerButtonArray = await homePage.getMenuPrimaryNavElementAllInnerTexts();
    console.log(headerButtonArray);
    await expect(headerButtonArray).toEqual(expect.arrayContaining(['NOVA\nTEAM\nCAREERS\nNEWS\nFUSION BY STOKE SPACE\nSHOP']));
});

test('Home page should have correct header button text', async ({ menuPrimaryNavigation }) => {
    expect(menuPrimaryNavigation.nova).toHaveText('Nova');
    await expect(menuPrimaryNavigation.team).toHaveText('Team');
    await expect(menuPrimaryNavigation.careers).toHaveText('Careers');
    await expect(menuPrimaryNavigation.news).toHaveText('News');
    await expect(menuPrimaryNavigation.fusion).toHaveText('Fusion by Stoke Space');
    await expect(menuPrimaryNavigation.shop).toHaveText('Shop');
});
