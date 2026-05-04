import { Page, Locator } from '@playwright/test'
import { Header } from './components/Header'
import { Actions } from '../helpers/Actions'

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
    readonly invalidConfirmationPasswordError: Locator

    readonly currencyDropdown: Locator

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
        this.invalidConfirmationPasswordError = page.getByTestId('confirm-password-error')

        this.currencyDropdown = page.getByTestId('register-currency-select')

        this.header = new Header(page)
    }

    async fillFormAndRegister(name: string, email: string, password: string, confirmationPassword: string, currency: string) {
        await Actions.fillField(this.nameInput, name, 'Повне імя')
        await Actions.fillField(this.emailInput, email, 'Email адреса')
        await Actions.fillField(this.passwordInput, password, 'Пароль')
        await Actions.fillField(this.confirmationPasswordInput, confirmationPassword, 'Підтвердження паролю')
        await Actions.selectDropdown(this.currencyDropdown, currency, 'Основна валюта')
        await Actions.click(this.registerButton, 'Зареєструватися')
    }

    async fillPassword(password: string) {
        await Actions.fillField(this.passwordInput, password, 'Пароль')
    }

    async fillConfirmationPassword(confirmationPassword: string) {
        await Actions.fillField(this.confirmationPasswordInput, confirmationPassword, 'Підтвердження паролю')
    }

    async eyePasswordButtonClick() {
        await Actions.click(this.eyePasswordButton, 'Вічко на пароль')
    }

    async eyeConfirmationPasswordButtonClick() {
        await Actions.click(this.eyeConfirmationPasswordButton, 'Вічко на підтвердження паролю')
    }
}