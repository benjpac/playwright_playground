import { test } from '../src/pages/base';
import { expect } from '@playwright/test';

test.describe('Sidebar Tests', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/help/category/fusion/index.html');
    });
    
    test('title', async ({ page }) => {
        await expect(page).toHaveTitle('Fusion | Fusion Docs');
    });

    test('initial aria snapshot', async({ page }) => {
      expect(await page.getByRole('navigation', { name: 'Docs sidebar' })).toMatchAriaSnapshot(`
        - navigation "Docs sidebar":
          - list:
            - listitem:
              - link "Fusion" [expanded]
              - button "Collapse sidebar category 'Fusion'"
              - list:
                - listitem:
                  - link "Parts"
                  - button "Expand sidebar category 'Parts'"
                - listitem:
                  - link "Inventory"
                  - button "Expand sidebar category 'Inventory'"
                - listitem:
                  - link "Workflows"
                  - button "Expand sidebar category 'Workflows'"
                - listitem:
                  - link "Work Plans"
                  - button "Expand sidebar category 'Work Plans'"
                - listitem:
                  - link "Organization"
                  - button "Expand sidebar category 'Organization'"
        `);            
    })    

    test.describe('Fusion', () => {
        test('menu link text', async({ sidebar }) => {
            await expect(sidebar.fusion).toHaveText('Fusion')
        })

        test('menu link text color', async({ sidebar }) => {
            await expect(sidebar.fusion).toHaveCSS('color', 'rgb(46, 133, 85)')
        })

        test.only('collapse and expand', async({ page, sidebar }) => {
          await sidebar.collapse('Fusion')
          expect(await page.getByRole('navigation', { name: 'Docs sidebar' }).ariaSnapshot()).toBe(`
            - navigation "Docs sidebar":
              - list:
                - listitem:
                  - link "Fusion"
                  - button "Expand sidebar category 'Fusion'"
            `);
          await sidebar.expand('Fusion')

          expect(await page.getByRole('navigation', { name: 'Docs sidebar' })).toMatchAriaSnapshot(`
          - navigation "Docs sidebar":
              - list:
              - listitem:
                  - link "Fusion" [expanded]
                  - button "Collapse sidebar category 'Fusion'"
                  - list:
                  - listitem:
                      - link "Parts"
                      - button "Expand sidebar category 'Parts'"
                  - listitem:
                      - link "Inventory"
                      - button "Expand sidebar category 'Inventory'"
                  - listitem:
                      - link "Workflows"
                      - button "Expand sidebar category 'Workflows'"
                  - listitem:
                      - link "Work Plans"
                      - button "Expand sidebar category 'Work Plans'"
                  - listitem:
                      - link "Organization"
                      - button "Expand sidebar category 'Organization'"
          `);  

        })

    })

})