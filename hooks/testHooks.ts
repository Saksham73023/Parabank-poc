import { test as base, expect } from '@fixtures/baseFixture';

export const test = base;

test.beforeEach(async ({ loginPage }) => {
	await loginPage.open();
});

test.afterEach(async ({ page }) => {
	await page.close();
});

export { expect };
