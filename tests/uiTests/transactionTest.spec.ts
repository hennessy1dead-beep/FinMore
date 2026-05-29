//import { test, expect, Page } from '@playwright/test'
import { test, expect } from '../../fixtures/navigation.fixture'
import { DefaultTransactionData, EditedTransactionData } from '../../testData/transactionData'

test.describe('Test transaction function', () => {

    test('Create new transaction', async ({ page, transactionsPage }) => {

        const transactionId = await transactionsPage.createTransaction(
            DefaultTransactionData.inputAmount,
            DefaultTransactionData.category,
            DefaultTransactionData.description,
            DefaultTransactionData.inputDate,
            DefaultTransactionData.account
        )

        await transactionsPage.expectTransactionData({
            id: transactionId,
            amount: DefaultTransactionData.expectedAmount,
            description: DefaultTransactionData.description,
            category: DefaultTransactionData.category,
            date: DefaultTransactionData.expectedDate,
            account: DefaultTransactionData.account
        })
    })

    test('Edit transaction', async ({ page, transactionsPage }) => {
        const lastTransactionId = await transactionsPage.getLastTransactionId()
        await transactionsPage.getTransactionById(lastTransactionId).locator(`[data-testid="edit-transaction-${lastTransactionId}"]`).click()

        await transactionsPage.amountInput.fill(EditedTransactionData.inputAmount)
        await transactionsPage.categorySelect.selectOption(EditedTransactionData.category)
        await transactionsPage.descriptionInput.fill(EditedTransactionData.description)
        await transactionsPage.dateInput.fill(EditedTransactionData.inputDate)
        await transactionsPage.accountSelect.selectOption(EditedTransactionData.account)
    })
})