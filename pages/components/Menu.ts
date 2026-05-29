import { Page, Locator } from '@playwright/test'
import { TransactionsPage } from '../TransactionsPage'
import { BudgetsPage } from '../BudgetsPage.ts'

export class Menu {
    readonly page: Page
    readonly dashboardLink: Locator
    readonly transactionsLink: Locator
    readonly categoriesLink: Locator
    readonly budgetsLink: Locator
    readonly accountsLink: Locator
    readonly reportsLink: Locator
    readonly analyticsLink: Locator
    readonly settingsLink: Locator

    constructor(page: Page) {
        this.page = page
        this.dashboardLink = page.getByTestId('nav-dashboard')
        this.transactionsLink = page.getByTestId('nav-transactions')
        this.categoriesLink = page.getByTestId('nav-categories')
        this.budgetsLink = page.getByTestId('nav-budgets')
        this.accountsLink = page.getByTestId('nav-accounts')
        this.reportsLink = page.getByTestId('nav-reports')
        this.analyticsLink = page.getByTestId('nav-analytics')
        this.settingsLink = page.getByTestId('nav-settings')
    }

    async navigateToTransactions() {
        await this.transactionsLink.click()
        return new TransactionsPage(this.page)
    }

    async navigateToBudgets() {
        await this.budgetsLink.click()
        return new BudgetsPage(this.page)
    }
}