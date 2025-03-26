import { test, expect } from '@playwright/test';

test.describe('Dynamic Table', () => {
  test('Testing Playwright VS Code "Record New" feature', async ({ page }) => {
    await page.goto('https://qaplayground.dev/apps/dynamic-table/');
    await page.getByText('Iron Man').click();
    await page.getByText('iron-man@avengers.com').click();
    await page.getByRole('row', { name: 'Iron Man iron-man@avengers.' }).locator('span').first().click();
    await page.getByText('Anthony \'Tony\' Stark').click();
    await page.getByRole('cell', { name: 'Black Widow black-widow@' }).click();
    await page.getByText('black-widow@avengers.com').click();
    await expect(page.locator('thead')).toContainText('Superhero');
    await expect(page.locator('thead')).toContainText('Status');
    await expect(page.locator('thead')).toContainText('Real Name');
    await page.getByRole('row', { name: 'Captain America captain-' }).locator('span').first().click();
    await expect(page.getByRole('row', { name: 'Ant-Man ant-man@avengers.com' }).locator('img')).toBeVisible();
    await page.getByRole('row', { name: 'Spider-Man spider-man@' }).getByRole('cell').nth(1).click();
    await page.getByRole('row', { name: 'Spider-Man spider-man@' }).getByRole('cell').nth(1).click();
    await expect(page.getByRole('row', { name: 'Spider-Man spider-man@' }).getByRole('cell').nth(1)).toBeVisible();
    await expect(page.locator('div').filter({ hasText: 'Superhero Status Real Name' })).toBeVisible();
  
    //assertion fails due to mismatched size when recording.
    await expect(page.locator('body')).toMatchAriaSnapshot(`
      - table:
        - rowgroup:
          - row "Superhero Status Real Name":
            - cell "Superhero"
            - cell "Status"
            - cell "Real Name"
        - rowgroup:
          - row "Iron Man iron-man@avengers.com Active Anthony 'Tony' Stark":
            - cell "Iron Man iron-man@avengers.com"
            - cell "Active"
            - cell "Anthony 'Tony' Stark"
          - row "Black Widow black-widow@avengers.com Active Natasha Alianovna Romanova":
            - cell "Black Widow black-widow@avengers.com"
            - cell "Active"
            - cell "Natasha Alianovna Romanova"
          - row "Deadpool deadpool@avengers.com Active Wade Wilson":
            - cell "Deadpool deadpool@avengers.com"
            - cell "Active"
            - cell "Wade Wilson"
          - row "Captain America captain-america@avengers.com Active Steve Rogers":
            - cell "Captain America captain-america@avengers.com"
            - cell "Active"
            - cell "Steve Rogers"
          - row "Ant-Man ant-man@avengers.com Active Eric O'Grady":
            - cell "Ant-Man ant-man@avengers.com"
            - cell "Active"
            - cell "Eric O'Grady"
          - row "Spider-Man spider-man@avengers.com Active Peter Parker":
            - cell "Spider-Man spider-man@avengers.com"
            - cell "Active"
            - cell "Peter Parker"
          - row "Doctor Strange doctor-strange@avengers.com Active Stephen Vincent Strange":
            - cell "Doctor Strange doctor-strange@avengers.com"
            - cell "Active"
            - cell "Stephen Vincent Strange"
          - row "Hulk hulk@avengers.com Active Robert Bruce Banner":
            - cell "Hulk hulk@avengers.com"
            - cell "Active"
            - cell "Robert Bruce Banner"
      `);
  });
})