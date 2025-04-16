# playwright_playground
First attempt using Playwright. 

Using this README for notes.

## stoke-space-pom
www.stokefusion.com

## qaplayground
https://qaplayground.dev/#apps

### dynamic-table.spec.ts 
https://qaplayground.dev/apps/dynamic-table/

### verify-account.spec.ts
https://qaplayground.dev/apps/verify-account/

Realized that success page requires keyboard event to trigger success page. 
* **fill()** just adds the value. 
* **type()** works.
* **press()** works.

## stoke-fusion-docs
https://app.stokefusion.com/

Use this link to bypass login:
https://app.stokefusion.com/help/category/fusion/index.html


This fails:
```
expect(await page.title()).toBe('Fusion | Fusion Docs');
```
**page.title()** returns "Fusion Docs" before the page is done loading. Retrying assert on string "Fusion Docs" toBe "Fusion | Fusion Docs" will always fail.


This passes:
```
await expect(page).toHaveTitle('Fusion | Fusion Docs');
expect(await page.title()).toBe('Fusion | Fusion Docs');
```
The assertion is retried until **page** returns the title 'Fusion | Fusion Docs', therefore **await page.title()** returns "Fusion | Fusion Docs" and passes without needing to retry the assertion.

Initially, I created a Base class with methods like `getTitle()` and `navigate()` because these methods were included in the example tests provided during Playwright's installation. However, I later realized that these methods already exist as built-in functionalities in Playwright's `Page` class (e.g., `page.title()` and `page.goto()`). Since the Base class added unnecessary abstraction without providing additional value, I decided to remove it and rely directly on Playwright's built-in methods for simplicity and maintainability.

**aria-snapshots**

https://playwright.dev/docs/aria-snapshots

Playing with aria-snapshots in sidebar.spec.ts > Fusion > collapse and expand.

Using toMatchAriaSnapshot assertion does not fail if aria snapshot contains additional data. It just checks if expected is contained in snapshot. I'm not sure how useful this is for sidebar testing. Documentation says snapshot testing is ideal for regression testing outputs that rarely change, broad structural checks for complex UI components, and UI testing of whole pages and components. The sidebar would probably rarely change structure, but I think there's a better way to test it. Maybe using a fixture would work better? 

locator.ariaSnapshot().toBe(exact aria match) can be used for exact matches. 

Using toMatchAriaSnapshot (and probably the equivilent for screenshots) for specific sets of visual regression tests that aren't part of CI/CD might be a good approach. Running tests with the --update-snapshots flag will update snapshots that did not match. Matching snapshots will not be updated.
```
npx playwright test --update-snapshots --update-source-method=overwrite
```

Playwright's test fixtures documentation provides guidance on creating reusable test setups and managing test dependencies. Refer to it for best practices and examples:

https://playwright.dev/docs/test-fixtures

Moved 'base.ts' fixture to 'src/fixtures/' and created 'navigation.ts' fixture.

"How to run your Playwright end-to-end tests in SloMo"
https://youtu.be/T7O4D78E2fY?si=qflaONTY6ftTTUfe --- Can add delays between steps to emulate real user flow. might come in handy for debugging in UI mode.

"Add accessibility checks to your Playwright end-to-end tests"
https://youtu.be/cs5-Kk9nQDA?si=Hnqebq1UYbYjNNc4 --- Emulates chrome lighthouse accessibility tests. 

"Avoid flaky end-to-end tests due to poorly hydrated Frontends with Playwright's toPass()"
https://youtu.be/8g7FvoRToGo?si=ppK4-D3KT-A0lJtf --- 

Locators are retried before every action, so I removed if statements w/error handling, as they remove the built in retry logic and are prone to race conditions. 

Added screenshot and video on fail to playwright.config.ts. Screenshot is useful. Not sure about video yet. 

Added custom error message to assertion in main.spec.ts.
```
await test.step(`h1 is: ${link.text}`, async () => {
    const h1 = await main.getH1(link.text)
    // Custom error messages provide immediate context for failures, 
    // making debugging faster without needing to analyze screenshots.
    await expect(h1, `should it be "${await page.locator('h1').first().textContent()}"?`).toHaveText(link.text);
})
```
https://playwright.dev/docs/accessibility-testing --- Added accessibility test w/AxeBuilder. Just using the basic implementation to check it out.

"What's new in Playwright 1.39" 
https://www.youtube.com/watch?v=KqVuRAlOkm0 --- Use { box: true } to isolate failures slightly better. Extend expect in fixture for custom assertions.

### **Performance**
- **Choose Lighthouse** if you need to:
  - Audit front-end performance and accessibility.
  - Ensure fast page loads for individual users.
- **Choose Artillery** if you need to:
  - Test backend resilience under load.
  - Measure API/DB performance at scale.

Both Lighthouse and Artillery can and should be integrated w/Playwright. Implementation seems straight forward. Lighthouse is only for single page loads. Artillery can be wrapped around tests. 

https://playwright.dev/docs/test-timeouts --- Can also use aggressive Playwright timeouts. Assertion default of 5_000ms seems long. Test timeout depends on what the test is doing.





## Bugs

### Network Errors
- **Login Page**: [https://app.stokefusion.com/login](https://app.stokefusion.com/login)  
  404 [Network error]: Error: Failed to refresh tokens: user has no known organization

### Typographical Errors
- **SolidWorks PDM Data Conenctor**: [https://app.stokefusion.com/help/fusion/parts/connectors/solidworks](https://app.stokefusion.com/help/fusion/parts/connectors/solidworks)  
  Typo: "Conenctor" should be "Connector".
- **Sending and Recieving Inventory**: [https://app.stokefusion.com/help/fusion/inventory/creation/send-and-receive](https://app.stokefusion.com/help/fusion/inventory/creation/send-and-receive)  
  Typo: "Recieving" should be "Receiving".
- **Mark this Part as a Planned**: [https://app.stokefusion.com/help/fusion/inventory/actions/mark-as-planned](https://app.stokefusion.com/help/fusion/inventory/actions/mark-as-planned)  
  Typo: "Mark this Part as a Planned" should be "Mark this Part as Planned", or something else?
- **Permantently Delete an Item**: [https://app.stokefusion.com/help/fusion/inventory/actions/delete](https://app.stokefusion.com/help/fusion/inventory/actions/delete)  
  Typo: "Permantently" should be "Permanently".

### URL Issues
- **Workfow**: [https://app.stokefusion.com/help/fusion/Workflows/workfow/index.html](https://app.stokefusion.com/help/fusion/Workflows/workfow/index.html)  
  Typo: "workfow" should be "workflow" (in URL).
- **Inconsistent URL Formatting**:  
  Example:  
  `/fusion/Workflows/cards/actions/record-time`  
  `/fusion/Work%20Plans/archiving-a-work-plan-run`  
  Suggestion: Use consistent formatting lower-case and dashes for spaces, e.g., `/fusion/work-plans/archiving-a-work-plan-run`.

### Miscellaneous
- **Punctuation in Headings**:  
  Relate a Workflow Card to other Fusion Items!  
  Only h1 with punctuation "!"
