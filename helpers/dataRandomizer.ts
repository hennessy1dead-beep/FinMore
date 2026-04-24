// utils/userFactory.ts
const firstNames = ['Ivan', 'Anna', 'Oleg', 'Maria', 'Dmytro']
const lastNames = ['Petrenko', 'Shevchenko', 'Koval', 'Melnyk', 'Tkachenko']

const domains = ['gmail.com', 'company.com', 'hotmail.io']

const getRandomItem = <T>(arr: T[]): T => {
    return arr[Math.floor(Math.random() * arr.length)]
}

const getRandomNumber = () => Math.floor(10000 + Math.random() * 90000)


export const generatePrettyEmail = (firstName: string, lastName: string) => {
    const domain = domains[Math.floor(Math.random() * domains.length)]
    const number = getRandomNumber()

    return `${firstName.toLowerCase()}.${lastName.toLowerCase()}_${number}@${domain}`
}


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
    ]


    return passwordArray.sort(() => Math.random() - 0.5).join('')
}


export interface User {
    name: string
    email: string
    password: string
}


export const generateRandomUser = (): User => {
    const firstName = getRandomItem(firstNames)
    const lastName = getRandomItem(lastNames)
    const email = generatePrettyEmail(firstName, lastName)
    const password = generateStrongPassword()

    return {
        name: `${firstName} ${lastName}`,
        email: email,
        password: password
    }
}

