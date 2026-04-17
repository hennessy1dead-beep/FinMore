import { test, expect, Locator } from '@playwright/test'

test.describe('check Sign Up function', () => {

    let fullNameInput: Locator
    let emailInput: Locator
    let passwordInput: Locator
    let passwordConfirmationInput: Locator
    let signUpButton: Locator


    test.beforeEach(async ({ page }) => {
        await page.goto('/')
        await expect(page).toHaveURL('/')

        const signUplink = page.getByTestId('switch-to-register-button')
        await expect(signUplink).toBeVisible()

        await signUplink.click()

        const signUpTitle = page.getByTestId('register-title')
        await expect(signUpTitle).toBeVisible()
        await expect(signUpTitle).toHaveText('Реєстрація')

        fullNameInput = page.getByTestId('register-name-input')
        emailInput = page.getByTestId('register-email-input')
        passwordInput = page.getByTestId('register-password-input')
        passwordConfirmationInput = page.getByTestId('register-confirm-password-input')
        signUpButton = page.getByTestId('register-submit-button')
    })

    test('check inputs availability', async ({ page }) => {

        //full name input
        await expect(fullNameInput).toBeVisible()
        await expect(fullNameInput).toBeEnabled()
        await expect(fullNameInput).toHaveAttribute('placeholder', 'Іван Петренко')

        //email input
        await expect(emailInput).toBeVisible()
        await expect(emailInput).toBeEnabled()
        await expect(emailInput).toHaveAttribute('placeholder', 'your@email.com')

        //password input
        await expect(passwordInput).toBeVisible()
        await expect(passwordInput).toBeEnabled()
        await expect(passwordInput).toHaveAttribute('placeholder', 'Мінімум 6 символів')

        //confirmation password input
        await expect(passwordConfirmationInput).toBeVisible()
        await expect(passwordConfirmationInput).toBeEnabled()
        await expect(passwordConfirmationInput).toHaveAttribute('placeholder', 'Повторіть пароль')
    
        //sign up button
        await expect(signUpButton).toBeVisible()
        await expect(signUpButton).toBeEnabled()
        await expect(signUpButton).toHaveText('Зареєструватися')
    })


    test('sign up with valid data', async ({ page }) => {

        //enter name
        await fullNameInput.fill('Ванесса Паради')
        await expect(fullNameInput).toHaveValue('Ванесса Паради')

        //enter email
        await emailInput.fill('vanessa@gmail.com')
        await expect(emailInput).toHaveValue('vanessa@gmail.com')

        //enter password
        await passwordInput.fill('password123')
        await expect(passwordInput).toHaveValue('password123')

        //enter same confiramtion password
        await passwordConfirmationInput.fill('password123')
        await expect(passwordConfirmationInput).toHaveValue('password123')

        //click sign up
        await signUpButton.click()

        //user account element appears
        const userAvatar = page.getByTestId('user-menu-trigger')
        await expect(userAvatar).toBeVisible({ timeout: 2000 })
        await expect(userAvatar).toHaveText('Ванесса Паради')
    })


    test('sign up with invalid password', async ({ page }) => {
        
        //enter name
        await fullNameInput.fill('Ванесса Паради')
        await expect(fullNameInput).toHaveValue('Ванесса Паради')

        //enter email
        await emailInput.fill('vanessa@gmail.com')
        await expect(emailInput).toHaveValue('vanessa@gmail.com')

        //enter invalid password - less than 6 characters
        await passwordInput.fill('123')
        await expect(passwordInput).toHaveValue('123')

        //enter same cofirmation password
        await passwordConfirmationInput.fill('123')
        await expect(passwordConfirmationInput).toHaveValue('123')

        //click sign up
        await signUpButton.click()

        //error message is displayed
        const errorMessage = page.getByTestId('password-error')
        await expect(errorMessage).toBeVisible()
        await expect(errorMessage).toHaveText('Пароль повинен містити мінімум 6 символів')
    })


    test('sign up with invalid confirmation password', async ({ page }) => {

        //enter name
        await fullNameInput.fill('Ванесса Паради')
        await expect(fullNameInput).toHaveValue('Ванесса Паради')

        //enter email
        await emailInput.fill('vanessa@gmail.com')
        await expect(emailInput).toHaveValue('vanessa@gmail.com')

        //enter password
        await passwordInput.fill('222222')
        await expect(passwordInput).toHaveValue('222222')

        //enter other confirmation password
        await passwordConfirmationInput.fill('333333')
        await expect(passwordConfirmationInput).toHaveValue('333333')

        //click sign up
        await signUpButton.click()

        //error message is displayed
        const errorMessage = page.getByTestId('confirm-password-error')
        await expect(errorMessage).toBeVisible()
        await expect(errorMessage).toHaveText('Паролі не співпадають')
    })

    test('show/hide password', async ({page}) => {
        const eyeButton = page.getByTestId('toggle-password-visibility')

        //enter password
        await passwordInput.fill('222222')
        await expect(passwordInput).toHaveValue('222222')
        
        //click 1st time
        await eyeButton.click()
        await expect(passwordInput).toHaveAttribute('type', 'text')

        //click 2nd time
        await eyeButton.click()
        await expect(passwordInput).toHaveAttribute('type', 'password')
    })
})