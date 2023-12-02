import { test } from "@playwright/test"
import { HomePage } from "../logic/pages/home-page"
import { HttpHelper } from "../logic/requests/http-helper"

test.describe('Testing Terminal-X', async () => {
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
    test('dummy WishList', async ({ page }) => {
        const hp = new HttpHelper(page)
        const itemID = await hp.addItemToWishList('W150580001', '4')
        await page.waitForTimeout(5000)
        await hp.removeItemFromWishList(itemID)
        await page.reload()
    })
    test('dummy Cart', async ({ page }) => {
        const hp = new HttpHelper(page)
        console.log(await hp.getCartCount())
        const itemID = await hp.addItemToCart('W13547201504')
        await page.waitForTimeout(5000)
        const ls = await hp.getItemDetails()
        await hp.removeItemFromCart(parseInt(ls[0].id))
        await page.reload()
    })
    test('get Items', async ({ page }) => {
        const hp = new HttpHelper(page)
        console.log(await hp.getAllItemsSKU("189"))
    })

})

