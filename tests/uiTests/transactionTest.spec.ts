import { test, expect, Page } from '@playwright/test'
import { LoginPage } from '../../pages/LoginPage'
import { Menu } from '../../pages/components/Menu'
import { TransactionsPage } from '../../pages/TransactionsPage'

test.describe('Test transaction function', () => {

    let loginPage: LoginPage

    const userEmail = 'user@demo.com'
    const userPassword = 'user123'
    const userName = 'User Demo'

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page)
        await loginPage.openMainPage()
        await loginPage.fillAndLogin(userEmail, userPassword)
        await expect(loginPage.header.userMenu).toBeVisible()
        await expect(loginPage.header.userMenu).toHaveText(userName)
    })

    test('Create new transaction', async ({ page }) => {
        const menu = new Menu(page)
        const transactionsPage = await menu.navigateToTransactions()

        await transactionsPage.createTransaction('100', 'Продукти', 'Test transaction', 'Картка Монобанку')

        await expect(transactionsPage.transactionsTable).toBeVisible()
        await expect(transactionsPage.transactionsTable).toContainText('Test transaction')
    })
})