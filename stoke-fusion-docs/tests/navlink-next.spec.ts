import { test } from '../src/pages/base';
import { expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto('/help/category/fusion/index.html');
});