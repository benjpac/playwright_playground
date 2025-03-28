# playwright_playground
First attempt using Playwright.

Testing various methods of writing tests to validate best practices in playwright docs. 

## stoke-space-pom notes

Not sure why there's a linting error on page imports in base.ts.

Narrow down inconsistency with await on certain assertions. await expect() vs expect(await page.title())

## qaplayground notes

### dynamic-table.spec.ts 

Messed with playwright vscode extension and 'record new' feature. Very cool! Because it is a dynamically sized table, the toMatchAriaSnapshot assertion fails due to mismatched size when recording.

### verify-account.spec.ts

More playright vscode extension fun. Test explorer gives great control on running tests in various modes (run, debug, and continuous which I have not tested yet)

Realized that success page requires keyboard event to trigger success page. 
fill() just adds the value. 
type() works.
press() works.

Test recorder feature kind of sucks. I end up spending more time debugging code I wouldn't have written in the first place. I do learn things in the process, so it's still somewhat useful from an educational standpoint. 