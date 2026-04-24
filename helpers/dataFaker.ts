import { faker } from '@faker-js/faker'
 
export const generateStrongPassword = (): string => {
    return faker.internet.password({
        length: 8,
        memorable: false,
        pattern: /[A-Za-z0-9!@#$%^&*]/,
        prefix: 'A1@'
    }).slice(0, 8)
}