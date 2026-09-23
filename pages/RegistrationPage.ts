import { expect } from '@playwright/test';
import { BasePage } from './basePage';
import { routes } from '@utils/constants';

export type Customer = {
  firstName: string; lastName: string; address: string; city: string; state: string;
  zipCode: string; phone: string; ssn: string; username: string; password: string;
};

export class RegistrationPage extends BasePage {
  async open() {
    await this.goto(routes.home);
    await this.page.getByRole('link', { name: 'Register' }).click();
    await this.page.waitForURL(/\/parabank\/register\.htm$/);
  }

  async register(customer: Customer) {
    const fields = {
      'customer.firstName': customer.firstName,
      'customer.lastName': customer.lastName,
      'customer.address.street': customer.address,
      'customer.address.city': customer.city,
      'customer.address.state': customer.state,
      'customer.address.zipCode': customer.zipCode,
      'customer.phoneNumber': customer.phone,
      'customer.ssn': customer.ssn,
      'customer.username': customer.username,
      'customer.password': customer.password,
      repeatedPassword: customer.password
    };

    for (const [name, value] of Object.entries(fields)) {
      await this.page.locator(`input[name="${name}"]`).fill(value);
    }

    await this.page.locator('input[value="Register"]').click();
  }

  async expectSuccessfulRegistration(firstName: string) {
    await expect(this.page).toHaveURL(/\/parabank\/register\.htm$/);
    await expect(this.page.locator('#rightPanel')).toContainText('Your account was created successfully. You are now logged in.');
    await expect(this.page.locator('#rightPanel h1')).toContainText(`Welcome ${firstName.toUpperCase()}`);
  }
}
