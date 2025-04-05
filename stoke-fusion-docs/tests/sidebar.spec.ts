import { test } from '../src/pages/base';
import { expect } from '@playwright/test';

test.describe('Sidebar Tests', () => {
    test.beforeEach(async ({ base }) => {
        await base.navigate('/help/category/fusion/index.html');
    });
    
    test.only('page has title', async ({ page }) => {
        const title = await page.title();
        console.log('Title:', title);
        await expect(page).toHaveTitle('Fusion | Fusion Docs');
        await expect(await page.title()).toBe('Fusion | Fusion Docs');
    });
    
    test('base getTitle()', async ({ base }) => {
        const title = await base.getTitle();
        console.log('Title:', title);
        await expect(await base.getTitle()).toBe('Fusion | Fusion Docs');
    });

    test('Fusion', async({ sidebar }) => {
        await expect(sidebar.fusion).toHaveText('Fusion')
    })

})