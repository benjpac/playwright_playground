import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  // Go to the Fusion Docs page
  await page.goto('/help/category/fusion/index.html');
});

test('has title', async ({ page }) => {

  await expect(page).toHaveTitle('Fusion | Fusion Docs');

  await expect(page.getByRole('link', { name: 'Fusion Docs' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Home' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Switch between dark and light' })).toBeVisible();

  await expect(page.getByLabel('Breadcrumbs').getByText('Fusion')).toBeVisible();

  await expect(page.getByRole('heading', { name: 'Fusion' })).toBeVisible();
  await expect(page.getByText('Walk through the most')).toBeVisible();
  await expect(page.locator('header')).toMatchAriaSnapshot(`
    - heading "Fusion" [level=1]
    - paragraph: Walk through the most important concepts in Fusion to get started on your first build fast.
    `);  

  await expect(page.getByRole('link', { name: '🗃️ Parts 5 items' })).toBeVisible();
  await expect(page.getByRole('link', { name: '🗃️ Inventory 6 items' })).toBeVisible();
  await expect(page.getByRole('link', { name: '🗃️ Workflows 6 items' })).toBeVisible();
  await expect(page.getByRole('link', { name: '🗃️ Work Plans 7 items' })).toBeVisible();
  await expect(page.getByRole('link', { name: '🗃️ Organization 6 items' })).toBeVisible();

  await expect(page.getByRole('link', { name: 'Next Parts »' })).toBeVisible();

  await expect(page.getByRole('navigation', { name: 'Docs sidebar' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Fusion', exact: true })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Collapse sidebar category \'' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Parts', exact: true })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Expand sidebar category \'Parts\'' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Inventory', exact: true })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Expand sidebar category \'Inventory\'' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Workflows', exact: true })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Expand sidebar category \'Workflows\'' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Work Plans', exact: true })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Expand sidebar category \'Work Plans\'' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Organization', exact: true })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Expand sidebar category \'Organization\'' })).toBeVisible();
  await expect(page.getByLabel('Docs sidebar')).toMatchAriaSnapshot(`
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


  await expect(page.getByRole('contentinfo')).toBeVisible();
  await expect(page.getByText('Resources')).toBeVisible();
  await expect(page.getByRole('link', { name: 'Site Status' })).toBeVisible();


  await expect(page.getByRole('main')).toMatchAriaSnapshot(`
    - navigation "Breadcrumbs":
      - list:
        - listitem: Fusion
    - heading "Fusion" [level=1]
    - paragraph: Walk through the most important concepts in Fusion to get started on your first build fast.
    - article:
      - article:
        - link "🗃️ Parts 5 items":
          - heading "🗃️ Parts" [level=2]
          - paragraph: 5 items
      - article:
        - link "🗃️ Inventory 6 items":
          - heading "🗃️ Inventory" [level=2]
          - paragraph: 6 items
      - article:
        - link "🗃️ Workflows 6 items":
          - heading "🗃️ Workflows" [level=2]
          - paragraph: 6 items
      - article:
        - link "🗃️ Work Plans 7 items":
          - heading "🗃️ Work Plans" [level=2]
          - paragraph: 7 items
      - article:
        - link "🗃️ Organization 6 items":
          - heading "🗃️ Organization" [level=2]
          - paragraph: 6 items
    - navigation "Docs pages":
      - link "Next Parts »"
    `);

  await expect(page.locator('section')).toMatchAriaSnapshot(`
    - article:
      - link "🗃️ Parts 5 items":
        - heading "🗃️ Parts" [level=2]
        - paragraph: 5 items
    - article:
      - link "🗃️ Inventory 6 items":
        - heading "🗃️ Inventory" [level=2]
        - paragraph: 6 items
    - article:
      - link "🗃️ Workflows 6 items":
        - heading "🗃️ Workflows" [level=2]
        - paragraph: 6 items
    - article:
      - link "🗃️ Work Plans 7 items":
        - heading "🗃️ Work Plans" [level=2]
        - paragraph: 7 items
    - article:
      - link "🗃️ Organization 6 items":
        - heading "🗃️ Organization" [level=2]
        - paragraph: 6 items
    `);
});