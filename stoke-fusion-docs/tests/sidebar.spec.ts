import { test } from '../src/pages/base';
import { expect } from '@playwright/test';

test.beforeEach(async ({ base }) => {
    await base.navigate('/help/category/fusion/index.html');
});

test('has title', async ({ page }) => {
    await expect(page).toHaveTitle('Fusion | Fusion Docs');
});