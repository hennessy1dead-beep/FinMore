import { Page, Locator } from 'playwright/test'

export class SignUpPage {
    readonly page: Page
    readonly fullNameInput: Locator
    readonly emailInput: Locator
    readonly passwordInput: Locator
    readonly passwordConfirmationInput: Locator
    readonly signUpButton: Locator
    readonly userAvatar: Locator //same again as in LoginPage? should it be somewhere else?

    constructor(page: Page) {
        this.page = page
        this.fullNameInput = page.getByTestId('register-name-input')
        this.emailInput = page.getByTestId('register-email-input')
        this.passwordInput = page.getByTestId('register-password-input')
        this.passwordConfirmationInput = page.getByTestId('register-confirm-password-input')
        this.signUpButton = page.getByTestId('register-submit-button')
        this.userAvatar = page.getByTestId('user-menu-trigger')
    }
}