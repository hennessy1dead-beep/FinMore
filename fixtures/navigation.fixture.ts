import { test as base, expect } from '@playwright/test'
import { test as authTest } from './auth.fixture'
import { Menu } from '../pages/components/Menu'
import { TransactionsPage } from '../pages/TransactionsPage'
import { BudgetsPage } from '../pages/BudgetsPage'

export const test = authTest.extend<{
	transactionsPage: TransactionsPage
	budgetsPage: BudgetsPage
}>({
	transactionsPage: async ({ page, authenticatedPage }, use) => {
		const menu = new Menu(page)
		const transactionsPage = await menu.navigateToTransactions()
		await use(transactionsPage)
	}
	,
	budgetsPage: async ({ page, authenticatedPage }, use) => {
		const menu = new Menu(page)
		const budgetsPage = await menu.navigateToBudgets()
		await use(budgetsPage)
	}
})

export { expect } from '@playwright/test'

