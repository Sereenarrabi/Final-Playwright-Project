import { Color } from './../logic/response/interface/wishlist-data-res';
import { FilterBy } from './../logic/pages/Enums/filterByEnum/ColorsEnum/filterBy';
import { WomenSubCategory, PANTS } from './../logic/pages/Enums/WomenEnum/subCategoryForWomen';
import { Page, expect, test } from "@playwright/test"
import { HomePage } from "../logic/pages/home-page"
import { HttpHelper } from "../logic/requests/http-helper"
import { before } from "node:test"
import { Category } from "../logic/pages/Enums/CategoryEnum"
import { ProductPage } from '../logic/pages/ProductsPage';
import { Colors } from '../logic/pages/Enums/filterByEnum/ColorsEnum/Colors';

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
            console.log(await hp.getAllItemsSKU("189"))
        })
    })
    test.describe("full flow tests - e2e ", () => {

        test.beforeEach('setUp the HomePage', async ({ page }) => {
            home = new HomePage(page)
            await home.goto()
        })
        test.afterEach('clear the framework', async ({ page }) => {
            const hp = new HttpHelper(page)
            await hp.clearWishList()
            await hp.clearCart()

        })
        test("add item throgh api validate throgh ui-wishList ", async ({ page }) => {
            const api = new HttpHelper(page)
            await api.addItemToWishList("W142310027", "2148")
            await home.navigateToWishListPage()
            let text = await home.getitemNameFromWishListByIndex(0)
            expect(await api.verifyItemExistsInWishList(text)).toBeTruthy()
        })
        test("add item throgh api validate via ui -Cart", async ({page}) => {
            const api = new HttpHelper(page)
            await api.addItemToCart("Z90074626005")
            await home.reload()
            await home.navigateToCartPage()
            await api.getCartItemName()
            let name= await home.getItemNameFromCartByIndex(0)
            expect(await api.getCartItemName()).toBe(name)
        })
        test("add",async({page})=>{
            await home.hoverOverCategory(Category.WOMEN)
            await home.subCategorySelector(WomenSubCategory.WOMEN_PANTS,PANTS.JEANS)
            const product = new ProductPage(page)
            await product.filterBy(FilterBy.COLOR)
            await product.selectColor(Colors.BLACK)
            await page.pause()
        })
        

    })

})





