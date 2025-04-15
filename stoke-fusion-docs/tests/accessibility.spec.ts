import { test, expect } from '../src/fixtures/navigation'
import AxeBuilder from '@axe-core/playwright'

test.beforeEach(async ({ page }) => {
    await page.goto('/help/category/fusion/index.html');
});

test.fixme(`accessibility`, async ({ page }) => {
    const accessibilityScanResults = await new AxeBuilder({ page })
        // Accessibility Insights for Web's Automated Checks only include axe rules that test for violations of WCAG A and AA success criteria; to match that behavior, you would use the tags wcag2a, wcag2aa, wcag21a, and wcag21aa.
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
        .analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
});