import { test as base, expect } from '@playwright/test';
import { LoginPage } from '@pages/LoginPage';
import { RegistrationPage } from '@pages/RegistrationPage';
import { ApiUser, UserService } from '@api/userService';

export const test = base.extend<{
  loginPage: LoginPage;
  registrationPage: RegistrationPage;
  userService: UserService;
  apiUser: ApiUser;
}>({
  loginPage: async ({ page }, use) => use(new LoginPage(page)),
  registrationPage: async ({ page }, use) => use(new RegistrationPage(page)),
  userService: async ({ request }, use) => use(new UserService(request)),
  apiUser: async ({ userService }, use) => use(await userService.createUser())
});

export { expect };
