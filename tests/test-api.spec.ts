import { expect, test } from "@playwright/test"
import { HomePage } from "../logic/pages/home-page"
import { HttpHelper } from "../logic/requests/http-helper"


test.describe('Testing Terminal-X', async () => {

    let home: HomePage

    test.describe('smoke tests api', async () => {
        test.beforeEach('setUp the HomePage', async ({ page }) => {
            home = new HomePage(page)
            await home.goto()
        })
        test.afterEach('clear the framework', async ({ page }) => {
            const hp = new HttpHelper(page)
            await hp.clearWishList()
            await hp.clearCart()

        })
        test('add and remove - api WishList', async ({ page }) => {
            const hp = new HttpHelper(page)
            const itemID = await hp.addItemToWishList('W150580001', '4')
            await hp.removeItemFromWishList(itemID)
            expect(await hp.getWishListCount()).toBe(0)
        })
        test('add and remove - api Cart', async ({ page }) => {
            const hp = new HttpHelper(page)
            const itemID = await hp.addItemToCart('W13547201504')
            const ls = await hp.getItemDetails()
            await hp.removeItemFromCart(parseInt(ls[0].id))
            expect(await hp.getCartCount()).toBe(0)
        })
        test('get Items', async ({ page }) => {
            const hp = new HttpHelper(page)
            expect(await hp.getAllItemsSKU("189")).not.toBeNull()
        })
    })

})





