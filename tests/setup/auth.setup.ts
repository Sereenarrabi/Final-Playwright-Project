import { expect, test as setup } from '@playwright/test';
import { HttpHelper } from "../../logic/requests/http-helper"
import { HomePage } from '../../logic/pages/home-page';
import * as fs from 'fs';


const authFile = 'playwright/.auth/user.json';

setup('authenticate', async ({ page }) => {
    if (fs.existsSync(authFile)) {
        console.log(`Authentication file ${authFile} already exists. Skipping authentication script.`);
        return;
    }
    const home = new HomePage(page)
    await home.goto()
    const httphelper = new HttpHelper(page)
    await httphelper.login()
    await page.context().storageState({ path: authFile });
});