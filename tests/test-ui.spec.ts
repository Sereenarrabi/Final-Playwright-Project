import { expect, test } from "playwright/test"
import { Category } from "../logic/pages/Enums/CategoryEnum"
import { WomenSubCategory, PANTS } from "../logic/pages/Enums/WomenEnum/subCategoryForWomen"
import { Colors } from "../logic/pages/Enums/filterByEnum/ColorsEnum/Colors"
import { FilterBy } from "../logic/pages/Enums/filterByEnum/ColorsEnum/filterBy"
import { ProductPage } from "../logic/pages/products-page"
import { HomePage } from "../logic/pages/home-page"

test.describe("Ui Tests", async () => {
    let home: HomePage

    test.beforeEach('setUp the HomePage', async ({ page }) => {
        home = new HomePage(page)
        await home.goto()
    })
    test("addd", async ({ page }) => {
        await home.hoverOverCategory(Category.WOMEN)
        await home.subCategorySelector(WomenSubCategory.WOMEN_PANTS, PANTS.JEANS)
        const product = new ProductPage(page)
        await product.filterBy(FilterBy.COLOR)
        await product.selectColor(Colors.BLACK)
        await page.pause()
    })
})