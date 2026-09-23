import { expect, Page } from '@playwright/test';

export async function expectPageTitle(page: Page, title: string) {
  await expect(page).toHaveTitle(title);
}

export async function waitForUrl(page: Page, path: string) {
  await expect(page).toHaveURL(new RegExp(`${path.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}$`));
}
