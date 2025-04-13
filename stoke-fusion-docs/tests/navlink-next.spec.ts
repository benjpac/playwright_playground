import { test } from '../src/pages/base';
import { expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto('/help/category/fusion/index.html');
});

// test the next button functionality and get href data for navigation.yml
test('navlink--next', async ({ main }) => {

    let pageCount = 1;

    while (true) {

        const nextHref = await main.next.getAttribute('href') || ''

        // log href
        console.log(nextHref.split('/help')[1])

        // stop if last page reached
        if (nextHref === '/help/fusion/Organization/') {
            console.log(`Last page reached. Total pages: ${pageCount}`)
            break
        }

        await main.next.click()

        // ensures next page is loaded
        await expect(main.next).not.toHaveAttribute('href', nextHref)

        pageCount++
    }
})