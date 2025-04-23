import { test, expect } from '../src/fixtures/navigation'
import fs from 'fs'

test.describe('Main Container', () => {
    test.beforeAll(({ flattenedLinks }) => {
        const invalid = flattenedLinks.filter(l => !l.url.startsWith('/') || l.url.endsWith('/'))
        if (invalid.length) throw new Error(`Invalid URLs: ${JSON.stringify(invalid)}`)
    })

    test.only('all pages', async ({ page, main, baseURL, flattenedLinks }) => {
        test.setTimeout(60000); // Set timeout to 60 seconds for this test only

        for (const link of flattenedLinks) {
            console.log(link);

            await test.step(`go to "${link.url}"`, async () => {
                await page.goto(`/help${link.url}/index.html`);

                // ensure we're at the correct URL
                await expect(page).toHaveURL(`${baseURL}/help${link.url}/index.html`);
            })


            await test.step(`h1 is "${link.text}"`, async () => {
                const h1 = await main.getH1(link.text)

                // compare expected h1 text from navigation.json with the current h1 text on the page
                await expect(h1, `should it be "${await page.locator('h1').first().textContent()}"?`).toHaveText(link.text);
            })

            await test.step('aria snapshot', async () => {
                const ariaSnapshot = await main.content.ariaSnapshot()

                const ariaSnapshotPath = `../src/data/aria-snapshots/main/${link.url}.json`

                fs.writeFileSync(ariaSnapshotPath, JSON.stringify(ariaSnapshot, null, 2))

                // await expect(main.content).toMatchAriaSnapshot(ariaSnapshotPath)
            })
        }
    })

})