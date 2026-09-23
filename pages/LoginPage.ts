import { expect } from '@playwright/test';
import { BasePage } from './basePage';
import { routes } from '@utils/constants';

export class LoginPage extends BasePage {
  private readonly usernameInput = this.page.locator('input[name="username"]');
  private readonly passwordInput = this.page.locator('input[name="password"]');
  private readonly loginButton = this.page.locator('input[value="Log In"]');

  async open() {
    await this.goto(routes.home);
  }

  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async expectSuccessfulLogin() {
    await expect(this.page).toHaveURL(/\/parabank\/overview\.htm$/);
    await expect(this.page.locator('#rightPanel')).toContainText('Accounts Overview');
  }

  async expectAccountDetails() {
    const accountTable = this.page.locator('#accountTable');
    await expect(accountTable).toBeVisible();
    await expect(accountTable.locator('tbody tr')).not.toHaveCount(0);
    await expect(accountTable.locator('tbody tr').first()).toContainText(/\$[\d,]+\.\d{2}/);
  }

  async expectLoginPage() {
    await expect(this.usernameInput).toBeVisible();
    await expect(this.loginButton).toBeVisible();
  }

  async expectLoginError(message: string) {
    await expect(this.page.locator('p.error')).toHaveText(message);
  }
}
