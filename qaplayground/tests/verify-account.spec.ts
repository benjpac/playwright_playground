import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto('https://qaplayground.dev/apps/verify-account/');
});


