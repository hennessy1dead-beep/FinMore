
export interface TransactionData {
    inputAmount: string
    expectedAmount: string
    category: string
    description: string
    inputDate: string
    expectedDate: string
    account: string
}

export const DefaultTransactionData: TransactionData = {
    inputAmount: '100',
    expectedAmount: '-100.00 UAH',
    category: 'Транспорт',
    description: 'test',
    inputDate: '2026-05-07',
    expectedDate: '07.05.2026',
    account: 'Готівка'
}


export const EditedTransactionData: TransactionData = {
    inputAmount: '150',
    expectedAmount: '-150.00 UAH',
    category: 'Розваги',
    description: 'edited',
    inputDate: '2026-06-10',
    expectedDate: '10.06.2026',
    account: 'Картка Монобанку'
}