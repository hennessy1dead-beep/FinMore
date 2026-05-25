import { Page, Locator } from '@playwright/test'
import { Actions } from '../helpers/Actions'

export class TransactionsPage {
    readonly page: Page

    readonly addTransactionButton: Locator
    readonly expenseTypeButton: Locator
    readonly amountInput: Locator
    readonly categorySelect: Locator
    readonly descriptionInput: Locator
    readonly accountSelect: Locator
    readonly submitButton: Locator

    readonly transactionsTable: Locator

    constructor(page: Page) {
        this.page = page
        this.addTransactionButton = page.getByTestId('add-transaction-page-button')
        this.expenseTypeButton = page.getByTestId('expense-type-button')
        this.amountInput = page.getByTestId('transaction-amount-input')
        this.categorySelect = page.getByTestId('transaction-category-select')
        this.descriptionInput = page.getByTestId('transaction-description-input')
        this.accountSelect = page.getByTestId('transaction-account-select')
        this.submitButton = page.getByTestId('transaction-form-submit')
        this.transactionsTable = page.getByTestId('transaction-list-container')
    }

    async createTransaction(amount: string, category: string, description: string, account: string) {
        await Actions.click(this.addTransactionButton, 'Додати транзакцію')
        await Actions.click(this.expenseTypeButton, 'Тип транзакції')
        await Actions.fillField(this.amountInput, amount, 'Сума транзакції')
        await Actions.selectOption(this.categorySelect, category, 'Категорія транзакції')
        await Actions.fillField(this.descriptionInput, description, 'Опис транзакції')
        await Actions.selectOption(this.accountSelect, account, 'Рахунок транзакції')
        await Actions.click(this.submitButton, 'Створити транзакцію')
    }
}