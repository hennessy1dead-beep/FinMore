import { Page, Locator, expect } from '@playwright/test'
import { Actions } from '../helpers/Actions'

export class TransactionsPage {
    readonly page: Page

    readonly addTransactionButton: Locator
    readonly expenseTypeButton: Locator
    readonly amountInput: Locator
    readonly categorySelect: Locator
    readonly descriptionInput: Locator
    readonly dateInput: Locator
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
        this.dateInput = page.getByTestId('transaction-date-input')
        this.accountSelect = page.getByTestId('transaction-account-select')
        this.submitButton = page.getByTestId('transaction-form-submit')
        this.transactionsTable = page.getByTestId('transaction-list-container')
    }

    async createTransaction(amount: string, category: string, description: string, date: string, account: string) {
        
        await Actions.click(this.addTransactionButton, 'Додати транзакцію')
        await Actions.click(this.expenseTypeButton, 'Тип транзакції')
        await Actions.fillField(this.amountInput, amount, 'Сума транзакції')
        await Actions.selectOption(this.categorySelect, category, 'Категорія транзакції')
        await Actions.fillField(this.descriptionInput, description, 'Опис транзакції')
        await Actions.fillField(this.dateInput, date, 'Дата транзакції')
        await Actions.selectOption(this.accountSelect, account, 'Рахунок транзакції')
        await Actions.click(this.submitButton, 'Створити транзакцію')
       
        //get id of first table item
        const item = this.page
            .locator('[data-testid^="transaction-item-"]')
            .first()
        await expect(item).toBeVisible()

        const testId = await item.getAttribute('data-testid')
        if (!testId) {
            throw new Error('transaction-item has no data-testid')
        }

        const id = testId.replace('transaction-item-', '')
        return id
    }

    getTransactionById(id: string): Locator {
        return this.page.locator(`[data-testid="transaction-item-${id}"]`)
    }
    
    getLastTransactionId() {
        return this.transactionsTable
            .locator('[data-testid^="transaction-item-"]')
            .first()
            .getAttribute('data-testid')
            .then(testId => {
                if (!testId) {
                    throw new Error('transaction-item has no data-testid')
                }
                return testId.replace('transaction-item-', '')
            })
    }

    async expectTransactionData(params: {
        id: string
        description: string
        category: string
        amount: string
        date: string
        account: string
    }) {
        const item = this.getTransactionById(params.id)

        await expect(item).toBeVisible()

        await expect(item.locator(`[data-testid="transaction-description-${params.id}"]`))
            .toHaveText(params.description)

        await expect(item.locator(`[data-testid="transaction-category-${params.id}"]`))
            .toHaveText(params.category)

        await expect(item.locator(`[data-testid="transaction-amount-${params.id}"]`))
            .toHaveText(params.amount)

        await expect(item.locator(`[data-testid="transaction-date-${params.id}"]`))
            .toHaveText(params.date)

        await expect(item.locator(`[data-testid="transaction-account-${params.id}"]`))
            .toHaveText(params.account)
    }
}

