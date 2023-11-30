import { Locator, Page } from "@playwright/test";

export class ProductPage {
    readonly page: Page
    private filters: Locator
    private ColorSelect: Locator
    private sizeSelect: Locator
    private brandOption: Locator



    constructor(page: Page) {
        this.page = page
    }

    filterBy =async (by: string) => {
       this.filters = this.page.locator(`//h4[contains(text(), '${by}')]`) 
       await this.filters.click()
    }

    selectColor =async (Color:string) => {
         
        this.ColorSelect = this.page.locator(` //div[contains(@style, '${Color}')]`)
        await this.ColorSelect.click()
    }

    selectSize =async (size:string) => {
        this.sizeSelect = this.page.locator(`//h4[contains(text(), 'מידה')]/parent::div/following-sibling::ol/li/a[text() = '${size}']`)
        await this.sizeSelect.scrollIntoViewIfNeeded();
        await this.sizeSelect.click()
    }


    selecBrand =async (brandName: string) => {
        const brand = brandName.toLocaleUpperCase()
        this.brandOption = this.page.locator(`//h4[contains(text(), 'מותג')]/parent::div/following-sibling::ol/li/a[text() = '${brand}']`)
        await this.brandOption.click()

    }

    // 




}
