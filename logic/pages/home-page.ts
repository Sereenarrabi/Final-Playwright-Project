import { Locator, Page } from "playwright/test";
import { BasePage } from "./base-page";
const BASE_URL = 'https://www.terminalx.com/';


export class HomePage extends BasePage {
    private categorySelectionFromNav = (category: string) => this.page.locator(`//nav/ul/li/a[text() = '${category}']`)
    private subchose = (KidGender: string, clothingOption: string) => this.page.locator(`//ul/li/a[text() = '${KidGender}']/parent::li/ul/li/a[text() ='${clothingOption}']`)
    private subCat = (SubCategory: string, item: string) => this.page.locator(`//a[@href="${SubCategory}"]/parent::li/ul/li/a[text() = "${item}"]`)
    private wishListButton: Locator
    private itemName: Locator
    constructor(page: Page) {
        super(page)
        this.wishListButton = this.page.locator("//a[@class='tx-link-a link_2L32 link-wishlist_1lmB tx-link_29YD']")
        this.itemName = this.page.locator("//a[@class='tx-link-a title_3ZxJ roboto-font_h7Lu tx-link_29YD underline-hover_3GkV']")
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
    async navigateToWishListPage() {
        await this.wishListButton.click();
    }
    getItemNameFromWishListByIndex = async (num: number) => {
        return await this.itemName.nth(num).textContent();
    }

}