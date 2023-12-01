import { Page } from "playwright/test";
import { BasePage } from "./base-page";
const BASE_URL = 'https://www.terminalx.com/';


export class HomePage extends BasePage {
    private categorySelectionFromNav = (category: string) => this.page.locator(`//nav/ul/li/a[text() = '${category}']`)
    private subchose = (KidGender: string, clothingOption: string) => this.page.locator(`//ul/li/a[text() = '${KidGender}']/parent::li/ul/li/a[text() ='${clothingOption}']`)
    private subCat = (SubCategory: string, item: string) => this.page.locator(`//a[@href="${SubCategory}"]/parent::li/ul/li/a[text() = "${item}"]`)

    constructor(page: Page) {
        super(page)
    }

    goto = async (): Promise<void> => {
        await this.page.goto(BASE_URL)
    }
    clickOnCategoryFromNav = async (category: string) => {
        await this.categorySelectionFromNav(category).click()
    }

    hoverOverCategory = async (category: string) => {
        await this.categorySelectionFromNav(category).hover()


    }



    selectFromSubCategory = async (KidGender: string, clothingOption: string) => {
        await this.subchose(KidGender, clothingOption).click()
    }

    subCategorySelector = async (SubCategory: string, item: string) => {
        await this.subCat(SubCategory, item).click()
    }
}