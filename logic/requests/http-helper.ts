import { ApiService } from "../../infra/requests/api-service"
import { createLogin, createUserInfo, createUserInfoWithCart } from "./interface/login-interface-req"
import * as uc from "../../infra/res/user-cred.json"
import { LoginRes } from "../response/interface/login-interface-res"
import { APIResponse, Page } from "playwright/test"
import { BasePage } from "../pages/base-page"
import { createShoe } from "./interface/add-item-req"
import { AddItemRes } from "../response/interface/add-item-res"
import { RemoveItemRes } from "../response/interface/remove-item-res"

const api = new ApiService()

export class HttpHelper extends BasePage {

    constructor(page: Page) {
        super(page)
    }

    login = async () => {
        const cred = createLogin(uc.email, uc.password)
        const res: APIResponse = await api.post('https://www.terminalx.com/pg/MutationUserLogin', cred)
        const phpSessionIdMatch = await res.headers()['set-cookie'].match(/PHPSESSID=([^;]+)/);
        const phpSessionIdValue = phpSessionIdMatch && phpSessionIdMatch[1];
        if (phpSessionIdValue) {
            const cookies = [{
                name: 'PHPSESSID',
                value: phpSessionIdValue,
                domain: '.www.terminalx.com',
                path: '/'

            }];

            await this.page.context().addCookies(cookies);
        }
        const userInfo = await createUserInfo()
        await api.post('https://www.terminalx.com/pg/QueryCurrentUserInfo', userInfo)
    }

    addItem = async (sku: string, values: string): Promise<number> => {
        const data = createShoe(sku, values)
        const res: APIResponse = await api.post('https://www.terminalx.com/pg/MutationAddProductsToWishlist', data)
        const ds: AddItemRes = await res.json()
        return ds.data.addProductsToWishlist.anyWishlist.items[0].id
    }
    removeItem = async (id: number): Promise<number> => {
        const data = this.removeItem(id)
        const res: APIResponse = await api.post('https://www.terminalx.com/pg/MutationRemoveProductsFromAnyWishlistById', data)
        const ds: RemoveItemRes = await res.json()
        return ds.data.removeProductsFromAnyWishlistById.anyWishlist.items_count
    }

}
