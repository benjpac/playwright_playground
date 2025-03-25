import { test, expect } from '../pom/base.ts';

test.beforeEach(async ({ menuPrimaryNavigation, homePage }) => {
    await homePage.open();
    await menuPrimaryNavigation.nova.click();
})

test('Click Nova and verify title', async ({ page }) => {
    expect(await page.title()).toBe('Nova | Stoke Space / 100% reusable rockets / USA');
});

test.describe('Downmass Features', () => {
    test.only('Hover behavior', async ({ novaPage }) => {
        await novaPage.downmassFeatures.hover();
        expect(await novaPage.downmassFeatures.textContent()).toBe('Downmass Features');
    })
})
