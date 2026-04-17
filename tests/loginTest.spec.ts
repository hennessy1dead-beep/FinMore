import { test, expect, Page } from '@playwright/test'

test.describe('check Login function', () => {
    
    let loginButton : any
    const userEmail = 'user@demo.com'
    const userPassword = 'user123'

    //pre-conditions
    test.beforeEach(async ({ page }) => {
        await page.goto('/')
        await expect(page).toHaveURL('/')
        await expect(page).toHaveTitle('Повнофункціональний фінансовий менеджер')
        loginButton = page.getByTestId('login-submit-button')
    })
 
    test('check logo', async ({ page }) => {
        const logo = page.locator('.lucide-log-in')
        await expect(logo).toBeVisible({timeout:1000})
        await expect(logo).toHaveAttribute('width','24')
        await expect(logo).toHaveAttribute('height','24')
    })

    test('check title', async ({ page }) => {
        const title = page.getByTestId('login-title')
        await expect(title).toBeVisible()
        await expect(title).toHaveText('Вхід до системи')
    })

    test('check subtitle', async ({ page }) => {
        const subtitle = page.locator('.mt-2')
        await expect(subtitle).toBeVisible()
        await expect(subtitle).toHaveText('Увійдіть до свого облікового запису')
    })

    test('check login button', async ({ page }) => {
        await expect(loginButton).toBeVisible()
        await expect(loginButton).toBeEnabled()
        await expect(loginButton).toHaveText('Увійти')
        await expect(loginButton).toHaveCSS('background-color','rgb(22, 163, 74)')
    })

    test('check Sign Up link', async ({ page }) => {
        const signUplink = page.getByTestId('switch-to-register-button')
        await expect(signUplink).toBeVisible()
        await expect(signUplink).toHaveText('Зареєструватися')
    })


    test('enter valid user email and password', async ({ page }) =>{

        //await test.step
        const emailInput = page.getByTestId('login-email-input')
        await expect(emailInput).toBeVisible()
        await expect(emailInput).toBeEnabled()
        await expect(emailInput).toHaveAttribute('placeholder','your@email.com')
        await emailInput.fill(userEmail)
        await expect(emailInput).toHaveValue(userEmail)

        const passwordInput = page.getByTestId('login-password-input')
        await expect(passwordInput).toBeVisible()
        await expect(passwordInput).toBeEnabled()
        await expect(passwordInput).toHaveAttribute('placeholder', 'Введіть пароль')
        await passwordInput.fill(userPassword)
        await expect(passwordInput).toHaveValue(userPassword)

        await loginButton.click()

        const userAvatar = page.getByTestId('user-menu-trigger')
        await expect(userAvatar).toBeVisible({timeout:2000})
        await expect(userAvatar).toHaveText('User Demo')
    })

})