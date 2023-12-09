import { Locator, Page } from "playwright";
import { HomePage } from "./home-page";


export class WishListPage extends HomePage {
    private itemNameWishlist: Locator

    constructor(page: Page) {
        super(page)
        this.itemNameWishlist = this.page.locator("//a[@class='tx-link-a title_3ZxJ roboto-font_h7Lu tx-link_29YD underline-hover_3GkV']")
    }

    getitemNameFromWishListByIndex = async (num: number) => {
        return await this.itemNameWishlist.nth(num).textContent();
    }

}