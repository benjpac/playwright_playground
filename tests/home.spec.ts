import { test, expect } from '@playwright/test';

import { HomePage } from '../pages/home-page';

test('Home page should have correct title', async ({ page }) => {
  const homePage = new HomePage(page);
  await homePage.open();
  expect(await homePage.getTitle()).toBe('Stoke Space / 100% reusable rockets / USA');
});