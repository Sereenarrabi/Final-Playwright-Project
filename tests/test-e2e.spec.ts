import { expect, test } from "playwright/test"
import { HomePage } from "../logic/pages/home-page"
import { CartPage } from "../logic/pages/cart-page"
import { HttpHelper } from "../logic/requests/http-helper"
import { WishListPage } from "../logic/pages/wishlist-page"

test.describe("full flow tests - e2e ", () => {
    let home: HomePage

    test.beforeEach('setUp the HomePage', async ({ page }) => {
        home = new HomePage(page)
        await home.goto()
    })
    test.afterEach('clear the framework', async ({ page }) => {
        const hp = new HttpHelper(page)
        await hp.clearWishList()
        await hp.clearCart()

    })
    test('validate user logged in', async ({ page }) => {
        const profileName = await home.getProfileName()
        const hp = new HttpHelper(page)
        expect(await hp.getUserProfileName()).toContain(profileName)
    })
    test("add item throgh api validate via ui - wishlist ", async ({ page }) => {
        const api = new HttpHelper(page)
        await api.addItemToWishList("W142310027", "2148")
        await home.navigateToWishListPage()
        const wishlistPage = new WishListPage(page)
        let text = await wishlistPage.getitemNameFromWishListByIndex(0)
        expect(await api.verifyItemExistsInWishList(text))
    })

    test("add item throgh api validate via ui -Cart", async ({ page }) => {
        const api = new HttpHelper(page)
        await api.addItemToCart("Z81883003001")
        await home.reload()
        await home.navigateToCartPage()
        const cartPage = new CartPage(page)
        let name = await cartPage.getItemNameFromCartByIndex(0)
        expect(await api.verifyItemExistsInCart(name)).toBeTruthy()
    })
})