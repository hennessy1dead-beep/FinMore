import { test, expect } from '@playwright/test'
import path from 'path'
import { StudentRegistrationForm } from '../../pages/StudentRegistrationForm'

test.describe('Student registration form', () => {
    test('Register a new student', async ({ page }) => {
        const registrationForm = new StudentRegistrationForm(page)
        const formUrl = 'https://demoqa.com/automation-practice-form'

        await test.step('Navigate to registration form', async () => {
            await page.goto(formUrl)
            await expect(registrationForm.practiceFormWrapper).toBeVisible()
        })

        await test.step('Fill personal information', async () => {
            await registrationForm.fillFirstName('Kit')
            await registrationForm.fillLastName('Ivanov')
            await registrationForm.fillEmail('kit.ivanov@example.com')
            await registrationForm.selectGender('Male')
            await registrationForm.fillMobile('3805555555')
            await registrationForm.selectDateOfBirth('15 Apr 1995')
        })

        await test.step('Fill education and hobbies', async () => {
            await registrationForm.fillSubject('Maths')
            await registrationForm.setHobby('Sports')
        })

        await test.step('Upload picture', async () => {
            const filePath = path.join(__dirname, '../../fixtures/2035579_1.jpg')
            await registrationForm.uploadPicture(filePath)
        })

        await test.step('Fill address and location', async () => {
            await registrationForm.fillCurrentAddress('123 Main Street, Test City')
            await registrationForm.selectState('NCR')
            await registrationForm.selectCity('Delhi')
        })

        await test.step('Submit form', async () => {
            await registrationForm.submitForm()
        })

        //extend expects 
        await test.step('Verify form submission', async () => {
            const modalTitle = page.locator('#example-modal-sizes-title-lg')
            await expect(modalTitle).toBeVisible()
            await expect(modalTitle).toHaveText('Thanks for submitting the form')
        })

    })
})