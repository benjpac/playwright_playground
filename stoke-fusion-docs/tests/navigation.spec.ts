import { test, expect } from '../src/fixtures/navigation'

test.beforeEach(async ({ page }) => {
    await page.goto('/help/category/fusion/index.html')
});

test.describe('Navigation', () => {
    test('h1', async ({ page, main, flattenedLinks }) => {
        await page.goto('/help/category/fusion/index.html')
        for (const link of flattenedLinks) {
            console.log(link);
            await page.goto(`/help${link.url}/index.html`);
            const h1 = await main.getH1(link.text)
            console.log(h1);
            expect(await h1.textContent()).toBe(link.text);
        }
    })

})