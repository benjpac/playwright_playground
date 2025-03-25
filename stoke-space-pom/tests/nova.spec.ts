import { test, expect } from '../pom/base.ts';

test.beforeEach(async ({ menuPrimaryNavigation, homePage }) => {
    await homePage.open();
    await menuPrimaryNavigation.nova.click();
})

test('Click Nova and verify title', async ({ page }) => {
    await expect(await page.title()).toBe('Nova | Stoke Space / 100% reusable rockets / USA');
});

test.describe('Downmass Features', () => {
    test('Text content', async ({ novaPage }) => {
        await expect(novaPage.downmassFeatures).toHaveText('Downmass Features')
    })    
    test('Hover behavior', async ({ novaPage }) => {
        await expect(novaPage.downmassFeatures).toHaveCSS('color', 'rgb(44, 171, 226)');
        await novaPage.downmassFeatures.hover();
        await expect(novaPage.downmassFeatures).toHaveCSS('color', 'rgb(255, 255, 255)');
    })
})
