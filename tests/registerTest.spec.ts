import { test, expect, Locator } from '@playwright/test'
import { RegisterPage } from '../pages/RegisterPage'
import { LoginPage } from '../pages/LoginPage'
import { generateRandomUser } from '../helpers/dataRandomizer'
import { generateFakeUser } from '../helpers/dataFaker'

test.describe('Test sign up function', () => {

    let loginPage: LoginPage
    let registerPage: RegisterPage

    const invalidPassword = '123'
    const invalidConfirmationPassword = 'password'

    const user = generateFakeUser() 
    //or const user = generateRandomUser()


    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page)
        registerPage = new RegisterPage(page)

        await loginPage.openMainPage()
        await loginPage.clickSignUpLink()
        await expect(registerPage.registerTitle).toBeVisible()
        await expect(registerPage.registerTitle).toHaveText('Реєстрація')
    })

    test('Verify sign up page elements', async () => {

        //name input
        await expect(registerPage.nameInput).toBeVisible()
        await expect(registerPage.nameInput).toBeEnabled()
        await expect(registerPage.nameInput).toHaveAttribute('placeholder', 'Іван Петренко')

        //email input
        await expect(registerPage.emailInput).toBeVisible()
        await expect(registerPage.emailInput).toBeEnabled()
        await expect(registerPage.emailInput).toHaveAttribute('placeholder', 'your@email.com')

        //password input
        await expect(registerPage.passwordInput).toBeVisible()
        await expect(registerPage.passwordInput).toBeEnabled()
        await expect(registerPage.passwordInput).toHaveAttribute('placeholder', 'Мінімум 6 символів')

        //confirmation password input
        await expect(registerPage.confirmationPasswordInput).toBeVisible()
        await expect(registerPage.confirmationPasswordInput).toBeEnabled()
        await expect(registerPage.confirmationPasswordInput).toHaveAttribute('placeholder', 'Повторіть пароль')

        //sign up button
        await expect(registerPage.registerButton).toBeVisible()
        await expect(registerPage.registerButton).toBeEnabled()
        await expect(registerPage.registerButton).toHaveText('Зареєструватися')
    })


    test('Register with valid credentials', async () => {

        await registerPage.fillFormAndRegister(user.name, user.email, user.password, user.confirmPassword)
        await expect(registerPage.header.userMenu).toBeVisible()
        await expect(registerPage.header.userMenu).toHaveText(user.name)
    })


    test('Register with invalid password', async () => {

        await registerPage.fillFormAndRegister(user.name, user.email, invalidPassword, invalidPassword)
        await expect(registerPage.invalidPasswordError).toBeVisible()
        await expect(registerPage.invalidPasswordError).toHaveText('Пароль повинен містити мінімум 6 символів')
    })


    test('Register with invalid confirmation password', async () => {

        await registerPage.fillFormAndRegister(user.name, user.email, user.password, invalidConfirmationPassword)
        await expect(registerPage.invalidConfirmationPasswordError).toBeVisible()
        await expect(registerPage.invalidConfirmationPasswordError).toHaveText('Паролі не співпадають')
    })


    test('Verify show/hide password option', async () => {

        //enter password
        await registerPage.fillPassword(user.password)
        await expect(registerPage.passwordInput).toHaveValue(user.password)

        //click 1st time
        await registerPage.eyePasswordButtonClick()
        await expect(registerPage.passwordInput).toHaveAttribute('type', 'text')

        //click 2nd time
        await registerPage.eyePasswordButtonClick()
        await expect(registerPage.passwordInput).toHaveAttribute('type', 'password')

        //enter confirmation password
        await registerPage.fillConfirmationPassword(user.confirmPassword)
        await expect(registerPage.confirmationPasswordInput).toHaveValue(user.confirmPassword)

        //click 1st time
        await registerPage.eyeConfirmationPasswordButtonClick()
        await expect(registerPage.confirmationPasswordInput).toHaveAttribute('type', 'text')

        //click 2nd time
        await registerPage.eyeConfirmationPasswordButtonClick()
        await expect(registerPage.confirmationPasswordInput).toHaveAttribute('type', 'password')

    })
})