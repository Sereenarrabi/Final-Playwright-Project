import { expect, test } from "playwright/test"
import { Category } from "../logic/pages/Enums/CategoryEnum"
import { WomenSubCategory, PANTS, SHIRTS } from "../logic/pages/Enums/WomenEnum/subCategoryForWomen"
import { Colors } from "../logic/pages/Enums/filterByEnum/ColorsEnum/Colors"
import { FilterBy } from "../logic/pages/Enums/filterByEnum/ColorsEnum/filterBy"
import { ProductPage } from "../logic/pages/products-page"
import { HomePage } from "../logic/pages/home-page"

test.describe("Ui Tests", async () => {
    let home: HomePage

    let product :ProductPage;


    test.beforeEach('setUp the HomePage', async ({ page }) => {
        home = new HomePage(page)
        product=new ProductPage(page);
        await home.goto();
    })
    test("add", async ({ page }) => {
        await home.hoverOverCategory(Category.WOMEN)
        await home.subCategorySelector(WomenSubCategory.WOMEN_PANTS, PANTS.JEANS)
        await product.filterBy(FilterBy.COLOR)
        await product.selectColor(Colors.BLACK)
        await page.pause()
    })
    test("Select Size" ,async ({page}) => {
        await home.hoverOverCategory(Category.WOMEN);
        await home.subCategorySelector(WomenSubCategory.WOMEN_SHIRTS, SHIRTS.DRESS_SHIRT);
        await page.pause();
        await product.filterBy(FilterBy.SIZE);
        await product.selectSize("40");
        await page.pause();
        await product.hoveroverproduct(1);
        await product.AddItemToWishLess();
        await page.pause();


    
    
    
    
    
        
    })
    
})

