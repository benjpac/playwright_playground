# playwright_playground
First attempt using Playwright.

Testing various methods of writing tests to validate best practices in playwright docs. 

## stoke-space-pom

www.stokefusion.com

Not sure why there's a linting error on page imports in base.ts.

Narrow down inconsistency with await on certain assertions. await expect() vs expect(await page.title())
***figured it out in stoke-fusion-docs project. see notes below**

## qaplayground

https://qaplayground.dev/#apps

### dynamic-table.spec.ts 

https://qaplayground.dev/apps/dynamic-table/

Messed with playwright vscode extension and 'record new' feature. Very cool! 

Because it is a dynamically sized table, the toMatchAriaSnapshot assertion fails due to mismatched size when recording.

### verify-account.spec.ts

https://qaplayground.dev/apps/verify-account/

More playright vscode extension fun. Test explorer gives great control on running tests in various modes (run, debug, and continuous which I have not tested yet)

Realized that success page requires keyboard event to trigger success page. 
* **fill()** just adds the value. 
* **type()** works.
* **press()** works.

Mixed thoughts on test recorder. 

I end up spending more time debugging code I wouldn't have written in the first place. I do learn things in the process, so it's still somewhat useful from an educational standpoint. 

## stoke-fusion-docs

https://app.stokefusion.com/

Use this link to bypass login:
https://app.stokefusion.com/help/category/fusion/index.html


This fails:
```
await expect(await page.title()).toBe('Fusion | Fusion Docs');
```
**page.title()** returns "Fusion Docs" before the page is done loading. Retrying assert on string "Fusion Docs" toBe "Fusion | Fusion Docs" will always fail.


This passes:
```
await expect(page).toHaveTitle('Fusion | Fusion Docs');
await expect(await page.title()).toBe('Fusion | Fusion Docs');
```
The assertion is retried until **page** returns 'Fusion | Fusion Docs', therefore **await page.title()** returns "Fusion | Fusion Docs" and passes without needing to retry the assertion.

Realized I didn't understand the purpose of having a Base class with methods that already exist on the Page class built into Playwright, so I removed it. Initial thinking was that because getTitle() and navigate() methods were included in the example tests when installing Playwright that they must be a good idea / best practice. I will use built in page.title() and page.goto() unless I see a reason not to.

**aria-snapshots**

https://playwright.dev/docs/aria-snapshots

Playing with aria-snapshots in sidebar.spec.ts > Fusion > collapse and expand.

Using toMatchAriaSnapshot assertion does not fail if aria snapshot contains additional data. It just checks if expected is contained in snapshot. I'm not sure how useful this is for sidebar testing. Documentation says snapshot testing is ideal for regression testing outputs that rarely change, broad structural checks for complex UI components, and UI testing of whole pages and components. The sidebar would probably rarely change structure, but I think there's a better way to test it. Maybe using a fixture would work better? 

locator.ariaSnapshot().toBe(exact aria match) can be used for exact matches. 

Using toMatchAriaSnapshot (and probably the equivilent for screenshots) for specific sets of visual regression tests that aren't part of CI/CD might be a good approach. Running tests with the --update-snapshots flag will update snapshots that did not match. Matching snapshots will not be updated.
```
npx playwright test --update-snapshots --update-source-method=overwrite
```

