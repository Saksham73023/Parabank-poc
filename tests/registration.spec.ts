import { test, expect } from '@hooks/testHooks';
import registrationData from '../testData/registrationData.json';

const createCustomer = (overrides: Partial<typeof registrationData.validCustomer> = {}) => ({
  ...registrationData.validCustomer,
  username: `js${Date.now()}`,
  ...overrides
});

const validationMessages = {
  firstName: 'First name is required.',
  lastName: 'Last name is required.',
  address: 'Address is required.'
} as const;

test.describe('Registration Functionality', () => {

  test('@smoke @positive @registration Verify user can register with valid details', async ({ registrationPage, page }) => {
    const customer = createCustomer();

    await registrationPage.open();
    await registrationPage.register(customer);

    await expect(page).toHaveURL(/\/parabank\/overview\.htm$/);
    await expect(page.locator('#rightPanel h1'))
      .toContainText('Welcome ' + customer.firstName.toUpperCase());
  });

  test(' @negative @registration Verify registration fails when First Name is omitted', async ({ registrationPage, page }) => {
    const customer = createCustomer({ firstName: '' });

    await registrationPage.open();
    await registrationPage.register(customer);

    await expect(page.locator('span[id="customer.firstName.errors"]'))
      .toContainText(validationMessages.firstName);
  });

  test(' @negative @registration Verify registration fails when Last Name is omitted', async ({ registrationPage, page }) => {
    const customer = createCustomer({ lastName: '' });

    await registrationPage.open();
    await registrationPage.register(customer);

    await expect(page.locator('span[id="customer.lastName.errors"]'))
      .toContainText(validationMessages.lastName);
  });

  test(' @negative @registration Verify registration fails when Address is omitted', async ({ registrationPage, page }) => {
    const customer = createCustomer({ address: '' });

    await registrationPage.open();
    await registrationPage.register(customer);

    await expect(page.locator('span[id="customer.address.street.errors"]'))
      .toContainText(validationMessages.address);
  });

});