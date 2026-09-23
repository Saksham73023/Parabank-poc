import { faker } from '@faker-js/faker';

export function newCustomer() {
  return {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    address: faker.location.streetAddress(),
    city: faker.location.city(),
    state: faker.location.state({ abbreviated: true }),
    zipCode: faker.location.zipCode(),
    phone: faker.phone.number(),
    ssn: faker.string.numeric(9),
    username: faker.internet.username().toLowerCase() + faker.string.numeric(3),
    password: faker.internet.password({ length: 12, memorable: true })
  };
}
