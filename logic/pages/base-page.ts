import { Page } from "playwright";
import * as js from '../../infra/res/user-login.json'

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
        while (num != 0) {
            await this.waitLocator(locator)
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