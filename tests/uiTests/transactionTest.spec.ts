//import { test, expect, Page } from '@playwright/test'
import { test, expect } from '../../fixtures/navigation.fixture'
import { DefaultTransactionData, EditedTransactionData } from '../../testData/transactionData'

test.describe('Test transaction function', () => {


    test('Create 1 new transactions', async ({ page, transactionsPage }) => {

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


    test('Create multiple transactions', async ({ page, transactionsPage }) => {

        const transactionId1 = await transactionsPage.createTransaction(
            DefaultTransactionData.inputAmount,
            DefaultTransactionData.category,
            DefaultTransactionData.description,
            DefaultTransactionData.inputDate,
            DefaultTransactionData.account
        )

        await transactionsPage.expectTransactionData({
            id: transactionId1,
            amount: DefaultTransactionData.expectedAmount,
            description: DefaultTransactionData.description,
            category: DefaultTransactionData.category,
            date: DefaultTransactionData.expectedDate,
            account: DefaultTransactionData.account
        })

        const transactionId2 = await transactionsPage.createTransaction(
            EditedTransactionData.inputAmount,
            EditedTransactionData.category,
            EditedTransactionData.description,
            EditedTransactionData.inputDate,
            EditedTransactionData.account
        )

        await transactionsPage.expectTransactionData({
            id: transactionId2,
            amount: EditedTransactionData.expectedAmount,
            description: EditedTransactionData.description,
            category: EditedTransactionData.category,
            date: EditedTransactionData.expectedDate,
            account: EditedTransactionData.account
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
        await transactionsPage.submitButton.click()

        await expect(transactionsPage.getTransactionById(lastTransactionId)).toBeVisible()

        await transactionsPage.expectTransactionData({
            id: lastTransactionId,
            amount: EditedTransactionData.expectedAmount,
            description: EditedTransactionData.description,
            category: EditedTransactionData.category,
            date: EditedTransactionData.expectedDate,
            account: EditedTransactionData.account
        })

    })

    test('Filter by type - expense', async ({ page, transactionsPage }) => {

        await transactionsPage.openFilters()

        await transactionsPage.setType('expense');

        await expect(transactionsPage.items.first()).toBeVisible();
    })

    test('Filter by category', async ({ page, transactionsPage }) => {
        await transactionsPage.openFilters()

        await transactionsPage.setCategory('Транспорт');

        const categories = page.locator('[data-testid^="transaction-category-"]');

        const count = await categories.count();

        for (let i = 0; i < count; i++) {
            await expect(categories.nth(i)).toHaveText('Транспорт');
        }
    })

    test('Search filter', async ({ page, transactionsPage }) => {

        await transactionsPage.openFilters()

        await transactionsPage.setSearch('test');

        const descriptions = page.locator('[data-testid^="transaction-description-"]');

        const count = await descriptions.count();

        for (let i = 0; i < count; i++) {
            await expect(descriptions.nth(i)).toContainText('test');
        }
    })


})