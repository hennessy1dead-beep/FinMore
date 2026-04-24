import { Page, Locator } from '@playwright/test'

export class Header {
    readonly sidebarButton: Locator
    readonly appTitle: Locator
    readonly userMenu: Locator

    constructor(page: Page) {
        this.sidebarButton = page.getByTestId('sidebar-toggle')
        this.appTitle = page.getByTestId('app-title')
        this.userMenu = page.getByTestId('user-menu-trigger')
    }
}