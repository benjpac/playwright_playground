import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto('https://qaplayground.dev/apps/verify-account/');
});

test.describe('Verify Account', () => {
    test('Visibility testing exclusively using Playwright VS Code extension with no manual edits', async ({ page }) => {

        // Verify Your Account

        await expect(page.getByText('Verify Your Account')).toBeVisible();
        await expect(page.getByRole('heading', { name: 'Verify Your Account' })).toBeVisible();
        await expect(page.locator('#title')).toContainText('Verify Your Account');
        

        // We emailed you the six digit code to cool_guy@email.com
        // Enter the code below to confirm your email address.

        await expect(page.getByText('We emailed you the six digit')).toBeVisible();
        await expect(page.locator('div').filter({ hasText: 'Verify Your Account We' }).locator('div')).toBeVisible();
        await expect(page.locator('#msg')).toContainText('We emailed you the six digit code to cool_guy@email.com Enter the code below to confirm your email address.');


        // The confirmation code is 9-9-9-9-9-9

        await expect(page.getByText('The confirmation code is 9-9-9-9-9-')).toBeVisible();
        await expect(page.locator('small')).toContainText('The confirmation code is 9-9-9-9-9-9');


        // All the credit for this mini-app goes to Brad Traversy

        await expect(page.getByRole('contentinfo')).toBeVisible();
        await expect(page.getByText('All the credit for this mini-')).toBeVisible();
        await expect(page.getByRole('contentinfo')).toContainText('All the credit for this mini-app goes to Brad Traversy');


        // body aria snapshot
        await expect(page.locator('body')).toMatchAriaSnapshot(`
            - navigation:
              - link "QA Playground":
                - heading "QA Playground" [level=1]
              - link "full courses":
                - img
              - link "Playwright logo View Test Suite":
                - img "Playwright logo"
            - main:
              - heading "Verify Your Account" [level=2]
              - paragraph: We emailed you the six digit code to cool_guy@email.com Enter the code below to confirm your email address.
              - spinbutton
              - spinbutton
              - spinbutton
              - spinbutton
              - spinbutton
              - spinbutton
              - text: The confirmation code is 9-9-9-9-9-9
            - contentinfo:
              - text: All the credit for this mini-app goes to
              - link "Brad Traversy"
            `);
    })

    test.only('Visibility testing without using Playwright VS Code extension', async ({ page }) => {

        // Verify Your Account

        // initial instinct was to use locator 'h2#title'
        // used toHaveText instead of toContainText for exact match
        await expect(page.locator('h2#title')).toHaveText('Verify Your Account');

        // based on the documentation https://playwright.dev/docs/locators, it states "We recommend using text locators to find non interactive elements like div, span, p, etc."
        // added exact: true to make sure it is an exact match
        await expect(page.getByText('Verify Your Account', { exact: true })).toBeVisible();


        // We emailed you the six digit code to cool_guy@email.com
        // Enter the code below to confirm your email address.

        // this p#msg element has some unique formatting, that looks like lazy coding, but I'll assume it's intentional and test for it
        await expect(page.locator('p#msg')).toHaveText('Enter the code below to confirm your email address.')
    })
});