import { test as base } from './base';
import navigationData from '../data/navigation.json';

interface NavigationFixture {
    navigation: typeof navigationData.navigation
    flattenedLinks: Array<{ url: string, text: string }>
}

export const test = base.extend<NavigationFixture>({
    navigation: [async ({ }, use) => {
        await use(navigationData.navigation);
    }, { scope: 'test' }],

    flattenedLinks: [async ({ navigation }, use) => {
        const flatten = (items: Array<{ text: string; url: string; children?: Array<{ text: string; url: string; children?: any }> }>): Array<{ url: string, text: string }> => {
            return items.flatMap(item => [
                { url: item.url, text: item.text },
                ...(item.children ? flatten(item.children) : [])
            ]);
        }

        await use(flatten(navigation))
    }, { scope: 'test' }]
});

export { expect } from './base';
