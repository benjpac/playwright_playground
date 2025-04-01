// import { test } from '../pages/base';
import { expect } from '@playwright/test';
import { test } from '@playwright/test';

test.describe('Login Page API', () => {
    // test.fixme('404 on app-build-manifest.json on page load', async ({ page }) => {
    //     page.on('response', async (response) => {
    //         if (response.request().method() === 'GET' && response.url().includes('/app-build-manifest.json')) {
    //             expect(response.status()).toBe(400);
    //         }
    //     });
    //     await page.goto('/');
    // }),

    // TDD (Test Driven Development) test case
    // 404 happens on live https://app.stokefusion.com page load
    // change expected status when the issue is fixed
    test('404 on app-build-manifest.json', async ({ request }) => {
        const response = await request.get(`/_next/app-build-manifest.json`)
        expect(response.status()).toBe(404);
    })
})