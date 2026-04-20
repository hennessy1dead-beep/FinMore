import { Page, Locator } from '@playwright/test'

export class LoginPage {
    readonly page: Page
    readonly logo: Locator
    readonly title: Locator
    readonly subtitle: Locator
    readonly loginButton: Locator
    readonly signUplink: Locator
    readonly emailInput: Locator
    readonly passwordInput: Locator
    readonly userAvatar: Locator

    constructor(page: Page) {
        this.page = page
        this.logo = page.locator('.lucide-log-in')
        this.title = page.getByTestId('login-title')
        this.subtitle = page.locator('.mt-2')
        this.loginButton = page.getByTestId('login-submit-button')
        this.signUplink = page.getByTestId('switch-to-register-button')
        this.emailInput = page.getByTestId('login-email-input')
        this.passwordInput = page.getByTestId('login-password-input')
        this.userAvatar = page.getByTestId('user-menu-trigger')
    }
}