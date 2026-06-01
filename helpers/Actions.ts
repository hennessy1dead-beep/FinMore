import fs from 'fs';
import path from 'path';
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

    static async selectRadio(locator: Locator, name?: string) {
        const field = name || 'radio button'

        try {
            console.log(` [SELECT RADIO] ${field}`)

            await locator.waitFor({ state: 'visible' })
            await locator.check()
            await expect(locator).toBeChecked()

            console.log(`[SELECT RADIO SUCCESS] ${field}`)
        } catch (error) {
            console.error(` [SELECT RADIO ERROR] ${field}`)
            throw new Error(`Failed to select radio ${field}: ${error}`)
        }
    }

    static async uploadFile(locator: Locator, filePath: string, name?: string) {
        const field = name || 'file upload'
        const fileName = path.basename(filePath)

        try {
            console.log(` [UPLOAD FILE] ${field}: ${filePath}`)

            if (!fs.existsSync(filePath)) {
                throw new Error(`Upload file not found: ${filePath}`)
            }

            await locator.waitFor({ state: 'visible' })
            
            // Set the files
            await locator.setInputFiles(filePath)

            // Dispatch input and change events to trigger React/custom handlers
            await locator.evaluate((el: HTMLInputElement) => {
                const inputEvent = new Event('input', { bubbles: true })
                el.dispatchEvent(inputEvent)
                
                const changeEvent = new Event('change', { bubbles: true })
                el.dispatchEvent(changeEvent)
            })

            // Wait for UI to process
            await locator.page()?.waitForTimeout(200)

            // Verify file was actually uploaded by checking the files array
            const uploadedFileName = await locator.evaluate((input: HTMLInputElement) => input.files?.[0]?.name)
            if (!uploadedFileName) {
                throw new Error(`File was not attached to the input element`)
            }
            if (uploadedFileName !== fileName) {
                throw new Error(`Uploaded file name mismatch: expected "${fileName}" but got "${uploadedFileName}"`)
            }

            console.log(`[UPLOAD FILE SUCCESS] ${field}: ${fileName}`)
        } catch (error) {
            console.error(` [UPLOAD FILE ERROR] ${field}`)
            throw new Error(`Failed to upload file ${field}: ${error}`)
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
                const page = locator.page()
                const option = page.locator(`text="${value}"`).first()
                await option.waitFor({ state: 'visible' })
                await option.click()
            }

            console.log(`[SELECT SUCCESS] ${field}`)
        } catch (error) {
            console.error(` [SELECT ERROR] ${field}`)
            throw new Error(`Failed to select ${value} in ${field}: ${error}`);
        }
    }

    static async selectDate(pickerLocator: Locator, dateText: string, name?: string) {
        const field = name || 'date picker'

        try {
            console.log(` [SELECT DATE] ${field}: "${dateText}"`)

            // Parse date string like "01 Jun 1990"
            const dateParts = dateText.trim().split(/\s+/)
            if (dateParts.length !== 3) {
                throw new Error(`Invalid date format. Expected "DD Mon YYYY", got "${dateText}"`)
            }

            const day = dateParts[0]
            const monthName = dateParts[1]
            const year = dateParts[2]

            // Month name to number mapping (supports both short and long formats)
            const monthMap: { [key: string]: string } = {
                'January': '0', 'Jan': '0',
                'February': '1', 'Feb': '1',
                'March': '2', 'Mar': '2',
                'April': '3', 'Apr': '3',
                'May': '4',
                'June': '5', 'Jun': '5',
                'July': '6', 'Jul': '6',
                'August': '7', 'Aug': '7',
                'September': '8', 'Sep': '8',
                'October': '9', 'Oct': '9',
                'November': '10', 'Nov': '10',
                'December': '11', 'Dec': '11'
            }

            // Map short month names to full names for aria-label
            const monthFullName: { [key: string]: string } = {
                'Jan': 'January', 'January': 'January',
                'Feb': 'February', 'February': 'February',
                'Mar': 'March', 'March': 'March',
                'Apr': 'April', 'April': 'April',
                'May': 'May',
                'Jun': 'June', 'June': 'June',
                'Jul': 'July', 'July': 'July',
                'Aug': 'August', 'August': 'August',
                'Sep': 'September', 'September': 'September',
                'Oct': 'October', 'October': 'October',
                'Nov': 'November', 'November': 'November',
                'Dec': 'December', 'December': 'December'
            }

            const monthValue = monthMap[monthName]
            if (monthValue === undefined) {
                throw new Error(`Invalid month name: ${monthName}`)
            }

            const fullMonthName = monthFullName[monthName] || monthName

            await pickerLocator.waitFor({ state: 'visible' })
            // Click the input to open the date picker
            await pickerLocator.click()
            
            const page = pickerLocator.page()

            // Select year
            const yearSelect = page.locator('.react-datepicker__year-select')
            await yearSelect.waitFor({ state: 'visible' })
            await yearSelect.selectOption(year)

            // Select month
            const monthSelect = page.locator('.react-datepicker__month-select')
            await monthSelect.waitFor({ state: 'visible' })
            await monthSelect.selectOption(monthValue)

            // Click day button
            const dayButton = page.locator(
                `[aria-label="Choose ${this.getDayName(day, monthValue, year)}, ${fullMonthName} ${this.getDayOrdinal(day)}, ${year}"]`
            ).first()
            
            await dayButton.waitFor({ state: 'visible' })
            await dayButton.click()
            await expect(pickerLocator).toHaveValue(dateText)

            console.log(`[SELECT DATE SUCCESS] ${field}: "${dateText}"`)
        } catch (error) {
            console.error(` [SELECT DATE ERROR] ${field}`)
            throw new Error(`Failed to select date ${dateText} in ${field}: ${error}`)
        }
    }

    private static getDayName(day: string, monthValue: string, year: string): string {
        const date = new Date(parseInt(year), parseInt(monthValue), parseInt(day))
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
        return days[date.getDay()]
    }

    private static getDayOrdinal(day: string): string {
        const dayNum = parseInt(day)
        if (dayNum > 3 && dayNum < 21) return dayNum + 'th'
        switch (dayNum % 10) {
            case 1: return dayNum + 'st'
            case 2: return dayNum + 'nd'
            case 3: return dayNum + 'rd'
            default: return dayNum + 'th'
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