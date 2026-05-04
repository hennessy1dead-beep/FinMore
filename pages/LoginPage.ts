import { Page, Locator } from '@playwright/test'
import { Header } from './components/Header'
import { Actions } from '../helpers/Actions'

export class LoginPage {
    readonly page: Page

    readonly logo: Locator
    readonly title: Locator
    readonly subtitle: Locator
    readonly loginButton: Locator
    readonly signUplink: Locator
    readonly emailInput: Locator
    readonly passwordInput: Locator

    readonly header: Header

    constructor(page: Page) {
        this.page = page
        this.logo = page.locator('.lucide-log-in')
        this.title = page.getByTestId('login-title')
        this.subtitle = page.locator('.mt-2')
        this.loginButton = page.getByTestId('login-submit-button')
        this.signUplink = page.getByTestId('switch-to-register-button')
        this.emailInput = page.getByTestId('login-email-input')
        this.passwordInput = page.getByTestId('login-password-input')
        this.header = new Header(page)
    }

    async openMainPage() {
        await this.page.goto('baseURL')
    }


    async fillAndLogin(email: string, password: string) {
        await Actions.fillField(this.emailInput, email, 'Email адреса')
        await Actions.fillField(this.passwordInput, password, 'Пароль')
        await Actions.click(this.loginButton, 'Увійти')
    }


    async clickSignUpLink() {
        await Actions.click(this.signUplink, 'Зареєструватися')
    }
}