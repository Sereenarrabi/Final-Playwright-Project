import { test } from "@playwright/test"
import { HomePage } from "../logic/pages/home-page"
import { HttpHelper } from "../logic/requests/http-helper"

test.describe('Testing Terminal-X', async () => {
    test('dummy', async ({ page }) => {
        const home = new HomePage(page)
        await home.goto()
        const hp = new HttpHelper(page)
        await hp.addItem('W150580001', '4')
        await page.reload()
        await page.waitForTimeout(5000)
    })

})