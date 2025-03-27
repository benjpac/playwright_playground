import { test, expect } from '@playwright/test';


test.describe('Verify Account', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('https://qaplayground.dev/apps/verify-account/');
    });

    test.describe('Visibility testing', () => {
        test('Verify Your Account', async ({ page }) => {
    
            // VS Code Playwright extension only
            await expect(page.getByText('Verify Your Account')).toBeVisible();
            await expect(page.getByRole('heading', { name: 'Verify Your Account' })).toBeVisible();
            await expect(page.locator('#title')).toContainText('Verify Your Account');

            // initial instinct was to use locator 'h2#title'
            // used toHaveText instead of toContainText for exact match
            await expect(page.locator('h2#title')).toHaveText('Verify Your Account');
    
            // based on the documentation https://playwright.dev/docs/locators, it states "We recommend using text locators to find non interactive elements like div, span, p, etc."
            // added exact: true to make sure it is an exact match
            await expect(page.getByText('Verify Your Account', { exact: true })).toBeVisible();
  
        })

        test('We emailed you the six digit code to...', async ({ page }) => {
    
            // VS Code Playwright extension only
            await expect(page.getByText('We emailed you the six digit')).toBeVisible();
            await expect(page.locator('div').filter({ hasText: 'Verify Your Account We' }).locator('div')).toBeVisible();
            await expect(page.locator('#msg')).toContainText('We emailed you the six digit code to cool_guy@email.com Enter the code below to confirm your email address.');

            // this p#msg element has some unique formatting I wouldn't use, but I'll assume it's intentional and test for it
            await expect(page.locator('p#msg')).toHaveText("\n          We emailed you the six digit code to cool_guy@email.com \n          Enter the code below to confirm your email address.\n        ")
    
            // less insane way to test the same thing. this is how it looks in the DOM regardless of window size
            // exact match assertion doesn't work here because the element contains all 3 lines of text
            await expect(page.getByText(' We emailed you the six digit ')).toBeVisible();
            await expect(page.getByText('cool_guy@email.com')).toBeVisible();
            await expect(page.getByText(' Enter the code below to confirm your email address. ')).toBeVisible();            
        })   
        
        test('The confirmation code is 9-9-9-9-9-9', async ({ page }) => {
    
            // VS Code Playwright extension only
            await expect(page.getByText('The confirmation code is 9-9-9-9-9-')).toBeVisible();
            await expect(page.locator('small')).toContainText('The confirmation code is 9-9-9-9-9-9');
  
            // following best practice of using text locators for non-interactive elements
            // exact match with spaces included
            await expect(page.getByText(' The confirmation code is 9-9-9-9-9-9 ', { exact: true })).toBeVisible();
        }) 
        
        test('body aria snapshot', async ({ page }) => {
    
            // VS Code Playwright extension only
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

    })

    test.describe('Functionality testing', () => {
        test('Confirmation code input', async ({ page }) => {
    
            // VS Code Playwright extension only
            await page.fill('#confirmationCode', '999999');
            await expect(page.locator('#confirmationCode')).toHaveValue('999999');
    
            // initial instinct was to use locator 'input#confirmationCode'
            // used toHaveValue instead of toHaveText because we are testing the value attribute
            await expect(page.locator('input#confirmationCode')).toHaveValue('999999');
        }) 
        
        test('Submit button', async ({ page }) => {
    
            // VS Code Playwright extension only
            await page.click('button[type="submit"]');
    
            // initial instinct was to use locator 'button[type="submit"]'
            // used toHaveAttribute instead of toHaveText because we are testing the type attribute
            await expect(page.locator('button[type="submit"]')).toHaveAttribute('type', 'submit');
        }) 
        
        test('Error message', async ({ page }) => {
    
            // VS Code Playwright extension only
            await page.fill('#confirmationCode', '999999');
            await page.click('button[type="submit"]');
            await expect(page.locator('#error')).toContainText('Invalid code');
    
            // initial instinct was to use locator 'div#error'
            // used toContainText instead of toHaveText because the error message is not the only text in the element
            await expect(page.locator('div#error')).toContainText('Invalid code');
        }) 
        
        test('Success message', async ({ page }) => {
    
            // VS Code Playwright extension only
            await page.fill('#confirmationCode', '999999');
            await page.click('button[type="submit"]');
            await expect(page.locator('#success')).toContainText('Success! You have confirmed your email address.');
    
            // initial instinct was to use locator 'div#success'
            // used toContainText instead of toHaveText because the success message is not the only text in the element
            await expect(page.locator('div#success')).toContainText('Success! You have confirmed your email address.');
        })
    })
})