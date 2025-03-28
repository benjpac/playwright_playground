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
        test.skip('Enter correct code using fill()', async ({ page }) => {

            // VS Code Playwright extension only v1
            // why does the recorder use locator('.code').first() instead of locator('input:nth-child(1)') when the DOM is consistent?
            await page.locator('.code').first().fill('9');
            await page.locator('input:nth-child(2)').fill('9');
            await page.locator('input:nth-child(3)').fill('9');
            await page.locator('input:nth-child(4)').fill('9');
            await page.locator('input:nth-child(5)').fill('9');
            await page.locator('input:nth-child(6)').fill('9');
            // never makes it to the success page (chrome, firefox, webkit), despite this reproducing that page using manual test steps
            await expect(page.getByText('Success')).toBeVisible();
            await expect(page.locator('small')).toContainText('Success');

            // VS Code Playwright extension only v2
            // added page loading visibility assertions just in case, but the test still fails on 'success' assertion
            await expect(page.locator('.code').first()).toBeVisible();
            await expect(page.getByRole('heading', { name: 'Verify Your Account' })).toBeVisible();
            await page.locator('.code').first().click();
            await page.locator('.code').first().fill('9');
            await page.locator('input:nth-child(2)').fill('9');
            await page.locator('input:nth-child(3)').fill('9');
            await page.locator('input:nth-child(4)').fill('9');
            await page.locator('input:nth-child(5)').fill('9');
            await page.locator('input:nth-child(6)').fill('9');
            // same issue. never makes it to the success page
            await expect(page.locator('small')).toContainText('Success');   
            
            // Added value assertions to see if the inputs are being filled correctly and look for .success class which is unique to sucesss page, but still fails on 'success' assertion
            await page.locator('input:nth-child(1)').fill('9')
            await expect(page.locator('input:nth-child(1)')).toHaveValue('9');
            await page.locator('input:nth-child(2)').fill('9')
            await expect(page.locator('input:nth-child(2)')).toHaveValue('9');
            await page.locator('input:nth-child(3)').fill('9')
            await expect(page.locator('input:nth-child(3)')).toHaveValue('9');
            await page.locator('input:nth-child(4)').fill('9')
            await expect(page.locator('input:nth-child(4)')).toHaveValue('9');
            await page.locator('input:nth-child(5)').fill('9')
            await expect(page.locator('input:nth-child(5)')).toHaveValue('9');
            await page.locator('input:nth-child(6)').fill('9')
            await expect(page.locator('input:nth-child(6)')).toHaveValue('9');
            // same issue even with unique class locator
            // nth-child(6).fill('9') doesn't seem to trigger the success page
            await expect(page.locator('.success')).toBeVisible(); 
            
            // Added value assertions to see if the inputs are being filled correctly and look for .success class which is unique to sucesss page, but still fails on 'success' assertion
            await page.locator('input:nth-child(1)').fill('9')
            await expect(page.locator('input:nth-child(1)')).toHaveValue('9');
            await page.locator('input:nth-child(2)').fill('9')
            await expect(page.locator('input:nth-child(2)')).toHaveValue('9');
            await page.locator('input:nth-child(3)').fill('9')
            await expect(page.locator('input:nth-child(3)')).toHaveValue('9');
            await page.locator('input:nth-child(4)').fill('9')
            await expect(page.locator('input:nth-child(4)')).toHaveValue('9');
            await page.locator('input:nth-child(5)').fill('9')
            await expect(page.locator('input:nth-child(5)')).toHaveValue('9');
            await page.locator('input:nth-child(6)').fill('9')
            await expect(page.locator('input:nth-child(6)')).toHaveValue('9');
            // fails on 'success' assertion, even with unique class locator
            await expect(page.locator('.success')).toBeVisible();         

        }) 

        test('Enter correct code using type()', async ({ page }) => {
            
            // Test passes using deprecated type() instead of fill()
            // https://playwright.dev/docs/api/class-keyboard#keyboard-type 
            // "In most cases, you should use locator.fill() instead. You only need to press keys one by one if there is special keyboard handling on the page - in this case use locator.pressSequentially()."    
                
            await page.locator('input:nth-child(1)').type('9')
            await expect(page.locator('input:nth-child(1)')).toHaveValue('9');
            await page.locator('input:nth-child(2)').type('9')
            await expect(page.locator('input:nth-child(2)')).toHaveValue('9');
            await page.locator('input:nth-child(3)').type('9')
            await expect(page.locator('input:nth-child(3)')).toHaveValue('9');
            await page.locator('input:nth-child(4)').type('9')
            await expect(page.locator('input:nth-child(4)')).toHaveValue('9');
            await page.locator('input:nth-child(5)').type('9')
            await expect(page.locator('input:nth-child(5)')).toHaveValue('9');
            await page.locator('input:nth-child(6)').type('9')
            await expect(page.locator('input:nth-child(6)')).toHaveValue('9');
            // best success assert I came up with since it covers class change and exact text match
            await expect(page.locator('.success')).toHaveText('Success');

            // clean up test using a loop
            const codeInputs = await page.locator('.code')
            for (let i = 0; i < 6; i++) {
                await codeInputs.nth(i).type('9');
                await expect(codeInputs.nth(i)).toHaveValue('9');
            }
            await expect(page.locator('.success')).toHaveText('Success');
            
        })  

        test('Enter correct code using type() using loop', async ({ page }) => {
            
            const codeInputs = await page.locator('.code')
            for (let i = 0; i < 6; i++) {
                await codeInputs.nth(i).type('9');
                await expect(codeInputs.nth(i)).toHaveValue('9');
            }
            await expect(page.locator('.success')).toHaveText('Success');
            
        })     
        
        test('Enter correct code using single type() command', async ({ page }) => {

            // fails without delay
            await page.keyboard.type('999999', { delay: 100 });
            const codeInputs = await page.locator('.code')
            for (let i = 0; i < 6; i++) {
                await expect(codeInputs.nth(i)).toHaveValue('9');
            }
            await expect(page.locator('.success')).toHaveText('Success');
        })           
        
        test('Enter correct code using keyboard.press()', async ({ page }) => {

            // fails without delay
            const codeInputs = await page.locator('.code')
            for (let i = 0; i < 6; i++) {
                await page.keyboard.press('9', { delay: 100 });
                await expect(codeInputs.nth(i)).toHaveValue('9');
            }
            await expect(page.locator('.success')).toHaveText('Success');
        })      
        
    })
})