import { test as base, expect } from '@playwright/test'
import { LoginPage } from '../pages/LoginPage'
 
type AuthFixtures = {
    authenticatedPage: void
}
 
export const test = base.extend<AuthFixtures>({
    authenticatedPage: async ({ page }, use) => {
        const loginPage = new LoginPage(page)
 
        const userEmail = 'user@demo.com'
        const userPassword = 'user123'
        const userName = 'User Demo'
 
        await loginPage.openMainPage()
        await loginPage.fillAndLogin(userEmail, userPassword)
 
        await expect(loginPage.header.userMenu).toBeVisible()
        await expect(loginPage.header.userMenu).toHaveText(userName)
 
        await use()
    }
})
 
export { expect } from '@playwright/test'