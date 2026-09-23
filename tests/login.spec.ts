import { test } from '@hooks/testHooks';
import loginData from '../testData/loginData.json';

const loginErrorMessage = 'The username and password could not be verified.';

test.describe('Login Functionality', () => {

    test('@smoke @positive @login Verify API-created user can login and see account details', async ({ loginPage, apiUser }) => {
        await loginPage.login(
            apiUser.username,
            apiUser.password
        );

        await loginPage.expectSuccessfulLogin();
        await loginPage.expectAccountDetails();
    });

    test(' @negative @login Verify login is unsuccessful with invalid username', async ({ loginPage }) => {
        await loginPage.login(
            loginData.invalidUsername.username,
            loginData.invalidUsername.password
        );

        await loginPage.expectLoginError(loginErrorMessage);
        await loginPage.expectLoginPage();
    });

    test(' @negative @login Verify login is unsuccessful with invalid password', async ({ loginPage }) => {
        await loginPage.login(
            loginData.invalidPassword.username,
            loginData.invalidPassword.password
        );

        await loginPage.expectLoginError(loginErrorMessage);
        await loginPage.expectLoginPage();
    });

    test(' @negative @login Verify login is unsuccessful with invalid username and password', async ({ loginPage }) => {
        await loginPage.login(
            loginData.invalidUser.username,
            loginData.invalidUser.password
        );

        await loginPage.expectLoginError(loginErrorMessage);
        await loginPage.expectLoginPage();
    });

    test(' @negative @login Verify error message is displayed when username is blank', async ({ loginPage }) => {
        await loginPage.login(
            loginData.blankUsername.username,
            loginData.blankUsername.password
        );
		
        await loginPage.expectLoginError(
            'Please enter a username and password.'
        );
        await loginPage.expectLoginPage();
    });

    test(' @negative @login Verify error message is displayed when password is blank', async ({ loginPage }) => {
        await loginPage.login(
            loginData.blankPassword.username,
            loginData.blankPassword.password
        );
        await loginPage.expectLoginError(
            'Please enter a username and password.'
        );
        await loginPage.expectLoginPage();
    });

});