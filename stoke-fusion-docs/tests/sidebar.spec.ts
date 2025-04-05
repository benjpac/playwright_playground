import { test } from '../src/pages/base';
import { expect } from '@playwright/test';

test.describe('Sidebar Tests', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/help/category/fusion/index.html');
    });
    
    test('page has title', async ({ page }) => {
        await expect(page).toHaveTitle('Fusion | Fusion Docs');
    });

    test('Fusion', async({ sidebar }) => {
        await expect(sidebar.fusion).toHaveText('Fusion')
    })

})