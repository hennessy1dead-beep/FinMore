import { Page, Locator } from '@playwright/test'
import { Actions } from '../helpers/Actions'

export class StudentRegistrationForm {
    readonly page: Page

    readonly practiceFormWrapper: Locator
    readonly formTitle: Locator
    readonly formSubtitle: Locator

    readonly firstNameInput: Locator
    readonly lastNameInput: Locator
    readonly emailInput: Locator

    readonly genderMaleRadio: Locator
    readonly genderFemaleRadio: Locator
    readonly genderOtherRadio: Locator

    readonly mobileInput: Locator
    readonly dateOfBirthInput: Locator
    readonly subjectsInput: Locator

    readonly hobbiesSportsCheckbox: Locator
    readonly hobbiesReadingCheckbox: Locator
    readonly hobbiesMusicCheckbox: Locator

    readonly uploadPictureInput: Locator
    readonly currentAddressTextarea: Locator

    readonly stateSelectInput: Locator
    readonly citySelectInput: Locator

    readonly submitButton: Locator

    constructor(page: Page) {
        this.page = page

        this.practiceFormWrapper = page.locator('.practice-form-wrapper')
        this.formTitle = page.locator('h1.text-center')
        this.formSubtitle = page.locator('h5')

        this.firstNameInput = page.locator('#firstName')
        this.lastNameInput = page.locator('#lastName')
        this.emailInput = page.locator('#userEmail')

        this.genderMaleRadio = page.locator('#gender-radio-1')
        this.genderFemaleRadio = page.locator('#gender-radio-2')
        this.genderOtherRadio = page.locator('#gender-radio-3')

        this.mobileInput = page.locator('#userNumber')
        this.dateOfBirthInput = page.locator('#dateOfBirthInput')
        this.subjectsInput = page.locator('#subjectsInput')

        this.hobbiesSportsCheckbox = page.locator('#hobbies-checkbox-1')
        this.hobbiesReadingCheckbox = page.locator('#hobbies-checkbox-2')
        this.hobbiesMusicCheckbox = page.locator('#hobbies-checkbox-3')

        this.uploadPictureInput = page.locator('#uploadPicture')
        this.currentAddressTextarea = page.locator('#currentAddress')

        this.stateSelectInput = page.locator('#react-select-3-input')
        this.citySelectInput = page.locator('#react-select-4-input')

        this.submitButton = page.locator('#submit')
    }

    async fillFirstName(firstName: string) {
        await Actions.fillField(this.firstNameInput, firstName, 'First name')
    }

    async fillLastName(lastName: string) {
        await Actions.fillField(this.lastNameInput, lastName, 'Last name')
    }

    async fillEmail(email: string) {
        await Actions.fillField(this.emailInput, email, 'Email')
    }

    async selectGender(gender: 'Male' | 'Female' | 'Other') {
        const locator = gender === 'Male'
            ? this.genderMaleRadio
            : gender === 'Female'
                ? this.genderFemaleRadio
                : this.genderOtherRadio

        await Actions.selectRadio(locator, `Gender ${gender}`)
    }

    async fillMobile(mobile: string) {
        await Actions.fillField(this.mobileInput, mobile, 'Mobile number')
    }

    async selectDateOfBirth(dateString: string) {
        await Actions.selectDate(this.dateOfBirthInput, dateString, 'Date of birth')
    }

    async fillSubject(subject: string) {
        await Actions.click(this.subjectsInput, 'Subjects input')
        await this.subjectsInput.fill(subject)
        await this.subjectsInput.press('Enter')
    }

    async setHobby(hobby: 'Sports' | 'Reading' | 'Music', checked: boolean = true) {
        const locator = hobby === 'Sports'
            ? this.hobbiesSportsCheckbox
            : hobby === 'Reading'
                ? this.hobbiesReadingCheckbox
                : this.hobbiesMusicCheckbox

        await Actions.selectCheckbox(locator, checked, `Hobby ${hobby}`)
    }

    async uploadPicture(filePath: string) {
        await Actions.uploadFile(this.uploadPictureInput, filePath, 'Upload picture')
    }

    async fillCurrentAddress(address: string) {
        await Actions.fillField(this.currentAddressTextarea, address, 'Current address')
    }

    async selectState(state: string) {
        await Actions.selectOption(this.stateSelectInput, state, 'State selector')
    }

    async selectCity(city: string) {
        await Actions.selectOption(this.citySelectInput, city, 'City selector')
    }

    async submitForm() {
        await Actions.click(this.submitButton, 'Submit button')
    }
}


