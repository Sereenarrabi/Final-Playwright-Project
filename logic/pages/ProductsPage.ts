import { Page } from '@playwright/test';
import { BasePage } from "./base-page";

export class ProductPage extends BasePage {
    private filters = (by: string) => this.page.locator(`//h4[contains(text(), '${by}')]`)
    private ColorSelect = (color: string) => this.page.locator(` //div[contains(@style, '${color}')]`)
    private sizeSelect = (size: string) => this.page.locator(`//h4[contains(text(), 'מידה')]/parent::div/following-sibling::ol/li/a[text() = '${size}']`)
    private brandOption = (brand: string) => this.page.locator(`//h4[contains(text(), 'מותג')]/parent::div/following-sibling::ol/li/a[text() = '${brand}']`)



    constructor(page: Page) {
        super(page)
    }

    filterBy = async (by: string) => {
        await this.filters(by).click()
    }

    selectColor = async (color: string) => {

        await this.ColorSelect(color).click()
    }

    selectSize = async (size: string) => {
        await this.sizeSelect(size).scrollIntoViewIfNeeded();
        await this.sizeSelect(size).click()
    }


    selecBrand = async (brandName: string) => {
        const brand = brandName.toLocaleUpperCase()
        await this.brandOption(brand).click()

    }


}
