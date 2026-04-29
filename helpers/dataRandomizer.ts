// utils/userFactory.ts

export interface User {
    name: string
    email: string
    password: string
    confirmPassword: string
}


//generate email
const firstNames = ['James', 'Emily', 'Michael', 'Sarah', 'David', 'Ashley', 'John', 'Jessica', 'Daniel', 'Lauren']
const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Miller', 'Davis', 'Anderson', 'Wilson', 'Taylor']
const domains = ['hubspot.com', 'klaviyo.com', 'clay.com', 'gmail.com', 'outlook.com']

const getRandomItem = <T>(arr: T[]): T => {
    return arr[Math.floor(Math.random() * arr.length)]
}

const getRandomNumber = () => Math.floor(10000 + Math.random() * 90000)


export const generatePrettyEmail = (firstName: string, lastName: string) => {
    const domain = domains[Math.floor(Math.random() * domains.length)]
    const number = getRandomNumber()

    return `${firstName.toLowerCase()}.${lastName.toLowerCase()}_${number}@${domain}`
}


//generate password
export const generateStrongPassword = () => {
    const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    const lower = 'abcdefghijklmnopqrstuvwxyz'
    const numbers = '0123456789'
    const special = '!@#$%^&*'

    const getRandom = (str: string) => str[Math.floor(Math.random() * str.length)]


    const passwordArray = [
        getRandom(upper),
        getRandom(lower),
        getRandom(numbers),
        getRandom(special),
        getRandom(lower),
        getRandom(upper),
        getRandom(numbers),
        getRandom(lower),
        getRandom(lower),
        getRandom(upper),
        getRandom(numbers),
        getRandom(lower),
    ]


    return passwordArray.sort(() => Math.random() - 0.5).join('')
}


//build user + allow to overwrite

export const generateRandomUser = (overrides: Partial<User> = {}): User => {
    const firstName = getRandomItem(firstNames)
    const lastName = getRandomItem(lastNames)
    const email = generatePrettyEmail(firstName, lastName)
    const password = generateStrongPassword()

    return {
        name: `${firstName} ${lastName}`,
        email: email,
        password: password,
        confirmPassword: password,
        ...overrides,
    }
}

