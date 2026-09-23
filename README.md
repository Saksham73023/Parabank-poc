# ParaBank Playwright Framework

## Setup

```bash
npm install
npx playwright install chromium
```

## Commands

```bash
npm test
npm run test:headed
npm run test:ui
npm run typecheck
npm run report
```

Tests are organized by business area under `tests/`. Page objects are under `pages/`, shared fixtures under `fixtures/`, utilities under `utils/`, and test data under `testData/`.

## API-seeded UI tests

The login happy path creates its user through the ParaBank registration backend before the browser test starts. `api/userService.ts` performs:

```text
GET  /parabank/register.htm   (establish registration session)
POST /parabank/register.htm   (create customer with form fields)
```

`fixtures/baseFixture.ts` exposes two fixtures:

- `userService`: API service for creating users with Faker data.
- `apiUser`: the created user's `username`, `password`, and customer data.

Use the generated credentials in a UI test with:

```ts
test('login with API-created user', async ({ loginPage, apiUser }) => {
	await loginPage.login(apiUser.username, apiUser.password);
	await loginPage.expectSuccessfulLogin();
	await loginPage.expectAccountDetails();
});
```

`hooks/testHooks.ts` opens the ParaBank home page in `beforeEach`, so the test only owns the API seed, login action, and business assertions. The API request uses the Playwright `request` fixture and the configured `BASE_URL`.
