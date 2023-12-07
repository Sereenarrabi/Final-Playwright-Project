import { Locator, Page } from "playwright";
import * as js from '../../infra/resources/user-login.json'
import { ExecException } from "child_process";

const BASE_URL = js.BASE_URL;

export class BasePage {
    protected page: Page

    constructor(page: Page) {
        this.page = page
    }
    initPage = async () => {
        await this.page.waitForLoadState('networkidle')
    }

    goto = async (): Promise<void> => {
        await this.page.goto(BASE_URL)
    }
    reload = async (): Promise<void> => {
        await this.page.reload()
    }
    reloadWithRetries = async (num: number, locator: string): Promise<void> => {
        if (num != 0) {
            await this.waitLocator(locator)
            try {
                await this.page.locator(locator).click()
                return
            }
            catch {
                console.log("failed to locate");
            }
            num--
        }
    }
    waitTimeout = async (time: number): Promise<void> => {
        await this.page.waitForTimeout(time)
    }
    waitLocator = async (locator: string): Promise<void> => {
        await this.page.waitForSelector(locator)
    }
}