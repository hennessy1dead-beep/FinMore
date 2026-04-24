import { Page, Locator } from 'playwright/test'
import { Header } from './components/Header'

export class RegisterPage {
    readonly page: Page

    readonly registerTitle: Locator

    readonly nameInput: Locator
    readonly emailInput: Locator
    readonly passwordInput: Locator
    readonly confirmationPasswordInput: Locator

    readonly eyePasswordButton: Locator
    readonly eyeConfirmationPasswordButton: Locator
    readonly registerButton: Locator

    readonly invalidPasswordError: Locator
    readonly InvalidConfirmationPasswordError: Locator

    readonly header: Header

    constructor(page: Page) {
        this.page = page

        this.registerTitle = page.getByTestId('register-title')

        this.nameInput = page.getByTestId('register-name-input')
        this.emailInput = page.getByTestId('register-email-input')
        this.passwordInput = page.getByTestId('register-password-input')
        this.confirmationPasswordInput = page.getByTestId('register-confirm-password-input')

        this.eyePasswordButton = page.getByTestId('toggle-password-visibility')
        this.eyeConfirmationPasswordButton = page.getByTestId('toggle-confirm-password-visibility')
        this.registerButton = page.getByTestId('register-submit-button')

        this.invalidPasswordError = page.getByTestId('password-error')
        this.InvalidConfirmationPasswordError = page.getByTestId('confirm-password-error')

        this.header = new Header(page)
    }

    async fillFormAndRegister(name: string, email: string, password: string, confirmationPassword: string) {
        await this.nameInput.fill(name)
        await this.emailInput.fill(email)
        await this.passwordInput.fill(password)
        await this.confirmationPasswordInput.fill(confirmationPassword)
        await this.registerButton.click()
    }

    async fillPassword(password: string) {
        await this.passwordInput.fill(password)
    }

    async fillConfirmationPassword(confirmationPassword: string) {
        await this.confirmationPasswordInput.fill(confirmationPassword)
    }

    async eyePasswordButtonClick() {
        await this.eyePasswordButton.click()
    }

    async eyeConfirmationPasswordButtonClick() {
        await this.eyeConfirmationPasswordButton.click()
    }
}