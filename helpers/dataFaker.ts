import { faker } from '@faker-js/faker'

export interface User {
    name: string
    email: string
    password: string
    confirmPassword: string
}


//build user with faker + allow to overwrite
export const generateFakeUser = (overrides: Partial<User> = {}): User => {
    const password = faker.internet.password({
        length: 12,
        pattern: /[A-Za-z0-9!@#$%^&*()]/,
    })

    return {
        name: faker.person.fullName(),
        email: faker.internet.email().toLowerCase(),
        password: password,
        confirmPassword: password,
        ...overrides,
    }

}
