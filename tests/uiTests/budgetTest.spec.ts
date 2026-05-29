import { test, expect } from '../../fixtures/navigation.fixture'

test.describe('Test budget function', () => {

    test('Create new budget', async ({ page, budgetsPage }) => {
        const amount = '1000.00 UAH'
        const category = 'Продукти'
        const period = 'Щомісячно'

        const budgetId = await budgetsPage.createBudget(
            '1000',
            category,
            period
        )

        await budgetsPage.expectBudgetData({
            id: budgetId,
            category,
            amount,
            period
        })


    })
})