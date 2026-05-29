//import { test, expect, Page } from '@playwright/test'
import { LoginPage } from '../../pages/LoginPage'
import { Menu } from '../../pages/components/Menu'
import { TransactionsPage } from '../../pages/TransactionsPage'
import { test, expect } from '../../fixtures/auth.fixture'

test.describe('Test transaction function', () => {

    test('Create new transaction', async ({ page, authenticatedPage }) => {
        const menu = new Menu(page)
        const transactionsPage = await menu.navigateToTransactions()

        const amount = '-100.00 UAH'
        const category = 'Продукти'
        const description = 'test'
        const inputDate = '2026-05-07'
        const expectedDate = '07.05.2026'
        const account = 'Готівка'

        const transactionId = await transactionsPage.createTransaction(
            '100',
            category,
            description,
            inputDate,
            account
        )

        await transactionsPage.expectTransactionData({
            id: transactionId,
            description,
            category,
            amount,
            date: expectedDate,
            account
        })
    })
})