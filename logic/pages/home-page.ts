import { Locator, Page } from "playwright/test";
import { BasePage } from "./base-page";
import * as uc from "../../infra/resources/user-cred.json"
const BASE_URL = uc.BASE_URL;


export class HomePage extends BasePage {
    private categorySelectionFromNav = (category: string) => this.page.locator(`//nav/ul/li/a[text() = '${category}']`)
    private subchose = (KidGender: string, clothingOption: string) => this.page.locator(`//ul/li/a[text() = '${KidGender}']/parent::li/ul/li/a[text() ='${clothingOption}']`)
    private subCat = (SubCategory: string, item: string) => this.page.locator(`//a[@href="${SubCategory}"]/parent::li/ul/li/a[text() = "${item}"]`)
    private wishListButton: Locator
    private itemNameWishlist: Locator
    private cartOptions: Locator
    private cartButton: Locator
    private itemNameCart: Locator

    constructor(page: Page) {
        super(page)
        this.wishListButton = this.page.locator("//a[@data-test-id='qa-link-wishlist']")
        this.itemNameWishlist = this.page.locator("//a[@class='tx-link-a title_3ZxJ roboto-font_h7Lu tx-link_29YD underline-hover_3GkV']")
        this.cartOptions = this.page.locator("//a[@data-test-id='qa-link-minicart']")
        this.cartButton = this.page.locator("//a[@data-test-id='qa-minicart-cart-button']")
        this.itemNameCart = this.page.locator("//a[@data-test-id='qa-cart-product-name']")
    }

    goto = async (): Promise<void> => {
        await this.page.goto(BASE_URL)
    }
    navigateToPage = async (url: string) => {

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
    navigateToWishListPage = async () => {
        await this.wishListButton.click();
    }
    getitemNameFromWishListByIndex = async (num: number) => {
        return await this.itemNameWishlist.nth(num).textContent();
    }
    clickOnCartIcon = async () => {
        await this.initPage()
        await this.waitLocator("//a[@data-test-id='qa-link-minicart']")
        await this.cartOptions.click()
    }
    navigateToCartPage = async () => {
        await this.initPage()
        await this.waitLocator("//a[@data-test-id='qa-link-minicart']")
        await this.cartOptions.click()
        await this.waitLocator("//a[@data-test-id='qa-minicart-cart-button']")
        await this.cartButton.click()
    }
    getItemNameFromCartByIndex = async (num: number) => {
        return await this.itemNameCart.nth(num).textContent()
    }


}