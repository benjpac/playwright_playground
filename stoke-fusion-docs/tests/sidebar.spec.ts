import { test } from '../src/pages/base';
import { expect } from '@playwright/test';

test.describe('Sidebar Tests', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/help/category/fusion/index.html');
    });
    
    test('title', async ({ page }) => {
        await expect(page).toHaveTitle('Fusion | Fusion Docs');
    });

    test.describe('Fusion', () => {
        test('menu link text', async({ sidebar }) => {
            await expect(sidebar.fusion).toHaveText('Fusion')
        })

        test('menu link text color', async({ sidebar }) => {
            await expect(sidebar.fusion).toHaveCSS('color', 'rgb(46, 133, 85)')
        })

        test.fixme('collapse and expand', async({ sidebar }) => {
          expect(await sidebar.getSidebar()).toMatchAriaSnapshot(`
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
          await sidebar.collapse('Fusion')
          expect(await sidebar.getSidebar()).toMatchAriaSnapshot(`
            - navigation "Docs sidebar":
              - list:
                - listitem:
                  - link "Fusion"
                  - button "Expand sidebar category 'Fusion'"
            `);
          await sidebar.expand('Fusion')

          // fails after expanding
          expect(await sidebar.getSidebar()).toMatchAriaSnapshot(`
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