//import { test, expect, Page } from '@playwright/test'
import { test, expect } from '../../fixtures/navigation.fixture'

test.describe('Test transaction function', () => {

    test('Create new transaction', async ({ page, transactionsPage }) => {

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