import { APIRequestContext, expect } from '@playwright/test';
import { newCustomer } from '@utils/fakerUtils';

export type ApiUser = ReturnType<typeof newCustomer>;

export class UserService {
  constructor(private readonly request: APIRequestContext) {}

  async createUser(overrides: Partial<ApiUser> = {}): Promise<ApiUser> {
    const user = { ...newCustomer(), ...overrides };
    await this.request.get('/parabank/register.htm');
    const response = await this.request.post('/parabank/register.htm', {
      form: {
        'customer.firstName': user.firstName,
        'customer.lastName': user.lastName,
        'customer.address.street': user.address,
        'customer.address.city': user.city,
        'customer.address.state': user.state,
        'customer.address.zipCode': user.zipCode,
        'customer.phoneNumber': user.phone,
        'customer.ssn': user.ssn,
        'customer.username': user.username,
        'customer.password': user.password,
        repeatedPassword: user.password
      }
    });

    expect(response.ok(), `User creation failed: ${response.status()} ${await response.text()}`).toBeTruthy();
    return user;
  }
}