import { Locator, expect } from '@playwright/test';

export class Actions {

    static async fillField(locator: Locator, value: string, fieldName?: string) {
        const name = fieldName || 'unknown field';

        try {
            console.log(` [FILL] ${name}: "${value}"`)

            await locator.waitFor({ state: 'visible' })
            await locator.fill(value)
            await expect(locator).toHaveValue(value)

            console.log(`[FILL SUCCESS] ${name}`)
        } catch (error) {
            console.error(`[FILL ERROR] ${name}`)
            throw new Error(`Failed to fill ${name}: ${error}`)
        }
    }

    static async click(locator: Locator, elementName?: string) {
        const name = elementName || 'unknown element'

        try {
            console.log(`[CLICK] ${name}`);

            await locator.waitFor({ state: 'visible' })
            await locator.click()

            console.log(`[CLICK SUCCESS] ${name}`)
        } catch (error) {
            console.error(` [CLICK ERROR] ${name}`)
            throw new Error(`Failed to click ${name}: ${error}`)
        }
    }


    static async selectCheckbox(locator: Locator, checked: boolean = true, name?: string) {
        const field = name || 'checkbox'

        try {
            console.log(` [SET CHECKED] ${field}: ${checked}`)

            await locator.waitFor({ state: 'visible' })
            await locator.setChecked(checked)
            await expect(locator).toBeChecked({ checked })

            console.log(`[SET CHECKED SUCCESS] ${field}`)
        } catch (error) {
            console.error(` [SET CHECKED ERROR] ${field}`)
            throw new Error(`Failed to set checkbox ${field} to ${checked}: ${error}`)
        }
    }

    static async selectOption(locator: Locator, value: string, name?: string) {
        const field = name || 'dropdown'

        try {
            console.log(` [SELECT] ${field}: ${value}`)

            await locator.waitFor({ state: 'visible' })
            const tagName = await locator.evaluate((el) => el.tagName.toLowerCase())

            if (tagName === 'select') {
                await locator.selectOption({ label: value })
            } else {
                await locator.click()
                const option = locator.locator(`text="${value}"`).first()
                await option.waitFor({ state: 'visible' })
                await option.click()
            }

            console.log(`[SELECT SUCCESS] ${field}`)
        } catch (error) {
            console.error(` [SELECT ERROR] ${field}`)
            throw new Error(`Failed to select ${value} in ${field}: ${error}`);
        }
    }

    static async enableToggle(locator: Locator, enabled: boolean = true, name?: string) {
        const field = name || 'toggle'

        try {
            console.log(` [TOGGLE] ${field}: ${enabled ? 'enable' : 'disable'}`)

            await locator.waitFor({ state: 'visible' })
            const currentState = await locator.isEnabled()

            if (currentState !== enabled) {
                await locator.click()
            }

            if (enabled) {
                await expect(locator).toBeEnabled()
            } else {
                await expect(locator).toBeDisabled()
            }

            console.log(`[TOGGLE SUCCESS] ${field}: ${enabled ? 'enabled' : 'disabled'}`)
        } catch (error) {
            console.error(` [TOGGLE ERROR] ${field}`)
            throw new Error(`Failed to ${enabled ? 'enable' : 'disable'} ${field}: ${error}`)
        }
    }

    static async getValidity(locator: Locator, fieldName?: string) {
        const name = fieldName || 'field';

        try {
            console.log(`[VALIDATION CHECK] ${name}`)

            const validity = await locator.evaluate(
                (el: HTMLInputElement) => el.validity
            );

            console.log(`[VALIDITY RESULT] ${name}:`, validity)

            return validity;
        } catch (error) {
            console.error(`[VALIDATION ERROR] ${name}`);
            throw new Error(`Failed to get validity for ${name}: ${error}`)
        }
    }

    static async expectVisible(locator: Locator, name?: string) {
        const element = name || 'element'

        try {
            console.log(`[EXPECT VISIBLE] ${element}`)
            await expect(locator).toBeVisible()
            console.log(` [VISIBLE] ${element}`)
        } catch (error) {
            console.error(` [NOT VISIBLE] ${element}`)
            throw new Error(`Element not visible: ${element}`)
        }
    }

    static async expectText(locator: Locator, text: string, name?: string) {
        const element = name || 'element';

        try {
            console.log(`[EXPECT TEXT] ${element}: "${text}"`);
            await expect(locator).toHaveText(text);
            console.log(`[TEXT MATCH] ${element}`);
        } catch (error) {
            console.error(` [TEXT MISMATCH] ${element}`);
            throw new Error(`Text mismatch in ${element}. Expected: "${text}"`);
        }
    }
}