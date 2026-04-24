import { test, expect, Page } from '@playwright/test'
import { LoginPage } from '../pages/LoginPage'

test.describe('Test login function', () => {

    let loginPage: LoginPage

    const userEmail = 'user@demo.com'
    const userPassword = 'user123'
    const userName = 'User Demo'

    const adminEmail = 'admin@demo.com'
    const adminPassword = 'admin123'
    const adminName = 'Admin Demo'

    //pre-conditions
    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page)
        await loginPage.openMainPage()
    })

    test('Verify logo', async ({ page }) => {
        await expect(loginPage.logo).toBeVisible({ timeout: 1000 })
        await expect(loginPage.logo).toHaveAttribute('width', '24')
        await expect(loginPage.logo).toHaveAttribute('height', '24')
    })

    test('Verify title', async ({ page }) => {
        await expect(loginPage.title).toBeVisible()
        await expect(loginPage.title).toHaveText('Вхід до системи')
    })

    test('Verify subtitle', async ({ page }) => {
        await expect(loginPage.subtitle).toBeVisible()
        await expect(loginPage.subtitle).toHaveText('Увійдіть до свого облікового запису')
    })

    test('Verify login button', async ({ page }) => {
        await expect(loginPage.loginButton).toBeVisible()
        await expect(loginPage.loginButton).toBeEnabled()
        await expect(loginPage.loginButton).toHaveText('Увійти')
        await expect(loginPage.loginButton).toHaveCSS('background-color', 'rgb(22, 163, 74)')
    })

    test('Verify sign up link', async ({ page }) => {
        await expect(loginPage.signUplink).toBeVisible()
        await expect(loginPage.signUplink).toHaveText('Зареєструватися')
    })

    test('Login with valid User credentials', async ({ page }) => {
        await loginPage.fillAndLogin(userEmail, userPassword)
        await expect(loginPage.header.userMenu).toBeVisible()
        await expect(loginPage.header.userMenu).toHaveText(userName)
    })

    test('Login with valid Admin credentials', async ({ page }) => {
        await loginPage.fillAndLogin(adminEmail, adminPassword)
        await expect(loginPage.header.userMenu).toBeVisible()
        await expect(loginPage.header.userMenu).toHaveText(adminName)
    })
})