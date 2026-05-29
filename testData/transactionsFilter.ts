export interface TransactionsFilter {
    type: string
    category: string
    dateFrom: string
    dateTo: string
    search: string
}


export const DefaultTransactionsFilter: TransactionsFilter = {
    type: 'Всі',
    category: 'Всі категорії',
    dateFrom: '',
    dateTo: '',
    search: ''
}

export const AllTransportExpensesFilter: TransactionsFilter = {
    type: 'Витрати',
    category: 'Транспорт',
    dateFrom: '',
    dateTo: '',
    search: ''
}