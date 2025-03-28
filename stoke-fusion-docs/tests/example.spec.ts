import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  // Go to the Fusion Docs page
  await page.goto('/help/category/fusion/index.html');
});

test('has title', async ({ page }) => {

  await expect(page).toHaveTitle('Fusion | Fusion Docs');
});