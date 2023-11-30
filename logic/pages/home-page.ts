import { Page } from "playwright/test";
import { BasePage } from "./base-page";
const BASE_URL = 'https://www.terminalx.com/';


export class HomePage {

    private page: Page
    constructor(page: Page) {
        this.page = page
    }

    goto = async (): Promise<void> => {
        await this.page.goto(BASE_URL)
    }
    clickOnCategoryFromNav = async (category: string) => {
        this.categorySelectionFromNav = this.page.locator(`//nav/ul/li/a[text() = '${category}']`)
        await this.categorySelectionFromNav.click()
    }

    hoverOverCategory = async (category: string) => {
        this.categorySelectionFromNav = this.page.locator(`//nav/ul/li/a[text() = '${category}']`)
        await this.categorySelectionFromNav.hover()


    }



    selectFromSubCategory = async (KidGender: string, clothingOption: string) => {
        await this.page.locator(`//ul/li/a[text() = '${KidGender}']/parent::li/ul/li/a[text() ='${clothingOption}']`).click()
    }

    subCategorySelector = async (SubCategory: string, item: string) => {
        await this.page.locator(`//a[@href="${SubCategory}"]/parent::li/ul/li/a[text() = "${item}"]`).click()
    }
}