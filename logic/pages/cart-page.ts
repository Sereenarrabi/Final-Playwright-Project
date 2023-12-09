import { Locator, Page } from "playwright";
import { HomePage } from "./home-page";

export class CartPage extends HomePage {

    private itemNameCart: Locator

    constructor(page: Page) {
        super(page)
        this.itemNameCart = this.page.locator("//a[@data-test-id='qa-cart-product-name']")
    }

    getItemNameFromCartByIndex = async (num: number) => {
        return await this.itemNameCart.nth(num).textContent()
    }
}