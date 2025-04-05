import { test } from '../src/pages/base';
import { expect } from '@playwright/test';

test.describe('Sidebar Tests', () => {
    test.beforeEach(async ({ base }) => {
        await base.navigate('/help/category/fusion/index.html');
    });
    
    test('page has title', async ({ page }) => {
        await expect(page).toHaveTitle('Fusion | Fusion Docs');
    });
    
    // returns 'Fusion Docs' instead of 'Fusion | Fusion Docs'
    // title is 'Fusion | Fusion Docs' when ran in UI mode. page load race condition?
    test.fixme('base getTitle()', async ({ base }) => {
        await expect(await base.getTitle()).toBe('Fusion | Fusion Docs');
    });

    test('Fusion', async({ sidebar }) => {
        await expect(sidebar.fusion).toHaveText('Fusion')
    })

})
