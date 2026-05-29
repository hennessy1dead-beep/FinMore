import { Page, Locator, expect } from '@playwright/test'
import { Actions } from '../helpers/Actions'

export class BudgetsPage {
    readonly page: Page

    readonly addBudgetButton: Locator
    readonly amountInput: Locator
    readonly categorySelect: Locator
    readonly periodSelect: Locator
    readonly submitButton: Locator
    readonly cancelButton: Locator

    readonly budgetsGrid: Locator

    constructor(page: Page) {
        this.page = page
        this.addBudgetButton = page.getByTestId('add-budget-button')
        this.categorySelect = page.getByTestId('budget-category-select')
        this.amountInput = page.getByTestId('budget-amount-input')
        this.periodSelect = page.getByTestId('budget-period-selector')
        this.submitButton = page.getByTestId('budget-form-submit')
        this.cancelButton = page.getByTestId('budget-form-cancel')

        this.budgetsGrid = page.getByTestId('budgets-grid')
    }

    async createBudget(amount: string, category: string, period: string) {
        await Actions.click(this.addBudgetButton, 'Додати бюджет')
        await Actions.fillField(this.amountInput, amount, 'Сума бюджету')
        await Actions.selectOption(this.categorySelect, category, 'Категорія бюджету')
        await Actions.selectOption(this.periodSelect, period, 'Період бюджету')
        await Actions.click(this.submitButton, 'Створити бюджет')

        //get id of first table item
        const item = this.page
            .locator('[data-testid^="budget-card-"]')
            .first()
        await expect(item).toBeVisible()

        const testId = await item.getAttribute('data-testid')
        if (!testId) {
            throw new Error('budget-card has no data-testid')
        }

        const id = testId.replace('budget-card-', '')
        return id
    }

    getBudget(id: string): Locator {
        return this.page.locator(`[data-testid="budget-card-${id}"]`)
    }

    async expectBudgetData(params: {
        id: string
        category: string
        amount: string
        period: string
    }) {
        const item = this.getBudget(params.id)

        await expect(item).toBeVisible()

        await expect(item.locator(`[data-testid="budget-category-${params.id}"]`))
            .toHaveText(params.category)

        await expect(item.locator(`[data-testid="budget-amount-${params.id}"]`))
            .toHaveText(params.amount)

        await expect(item.locator(`[data-testid="budget-period-${params.id}"]`))
            .toHaveText(params.period)

    }

}