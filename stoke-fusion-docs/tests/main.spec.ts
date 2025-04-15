import { test, expect } from '../src/fixtures/navigation'

test.describe('Main Container', () => {
    test.beforeAll(({ flattenedLinks }) => {
        const invalid = flattenedLinks.filter(l => !l.url.startsWith('/') || l.url.endsWith('/'))
        if (invalid.length) throw new Error(`Invalid URLs: ${JSON.stringify(invalid)}`)
    })

    test('all pages', async ({ page, main, baseURL, flattenedLinks }) => {
        for (const link of flattenedLinks) {
            console.log(link);

            await test.step(`go to: ${link.url}`, async () => {
                await page.goto(`/help${link.url}/index.html`);
                await expect(page).toHaveURL(`${baseURL}/help${link.url}/index.html`);
            })

            await test.step(`h1 is: ${link.text}`, async () => {
                const h1 = await main.getH1(link.text)
                await expect(h1, `should it be "${await page.locator('h1').first().textContent()}"?`).toHaveText(link.text);
            })
        }
    })

})