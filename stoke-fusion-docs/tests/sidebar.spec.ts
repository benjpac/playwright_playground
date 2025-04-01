import { test } from '../pages/base';
import { expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto('/help/category/fusion/index.html');
});

test('has title', async ({ page }) => {
    await expect(page).toHaveTitle('Fusion | Fusion Docs');
});