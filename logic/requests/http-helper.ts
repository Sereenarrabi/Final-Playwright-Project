import { ApiService } from "../../infra/requests/api-service"
import { createLogin, createUserinfoWithAllDetails } from "./interface/login-interface-req"
import * as uc from "../../infra/res/user-cred.json"
import { APIResponse, Page } from "playwright/test"
import { BasePage } from "../pages/base-page"
import { createShoe, addItemToCart } from "./interface/add-item-req"
import { AddItemWishListRes } from "../response/interface/add-item-wishlist-res"
import { RemoveItemWishListRes } from "../response/interface/remove-item-wishlist-res"
import { removeItemWishList, removeItemFromCart } from "./interface/remove-item-req"
import { AddItemCartRes } from "../response/interface/add-item-cart-res"
import { UserInfoRes, Item } from "../response/interface/user-info-res"
import { RemoveItemCartRes } from "../response/interface/remove-item-cart-res"
import { getItemDetails } from "./interface/item-details-req"
import { ItemDetailsRes, ItemP } from "../response/interface/item-details-res"
import { WishListRes, ItemW } from "../response/interface/wishlist-data-res"

const api = new ApiService()
const LOGIN_URL = 'https://www.terminalx.com/pg/MutationUserLogin'
const ADD_PRODUCT_WISH_LIST_URL = 'https://www.terminalx.com/pg/MutationAddProductsToWishlist'
const REMOVE_PRODUCT_WISH_LIST_URL = 'https://www.terminalx.com/pg/MutationRemoveProductsFromAnyWishlistById'
const WISHLIST_DATA = 'https://www.terminalx.com/pg/QueryWishlist'
const ADD_PRODUCT_CART_URL = 'https://www.terminalx.com/pg/MutationAddAnyProductsToAnyCart'
const REMOVE_PRODUCT_CART = 'https://www.terminalx.com/pg/MutationRemoveItemFromAnyCart'
const USER_INFO = 'https://www.terminalx.com/pg/QueryCurrentUserInfo'
const LIST_OF_ITEMS = 'https://www.terminalx.com/a/listingSearch'

export class HttpHelper extends BasePage {
    private wishList: number[] = [];

    constructor(page: Page) {
        super(page)
    }

    login = async () => {
        const cred = createLogin(uc.email, uc.password)
        const res: APIResponse = await api.post(LOGIN_URL, cred)
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
    }

    addItemToWishList = async (sku: string, values: string): Promise<number> => {
        const data = createShoe(sku, values)
        const res: APIResponse = await api.post(ADD_PRODUCT_WISH_LIST_URL, data)
        const ds: AddItemWishListRes = await res.json()
        this.wishList.push(ds.data.addProductsToWishlist.anyWishlist.items[0].id)
        return ds.data.addProductsToWishlist.anyWishlist.items[0].id
    }
    addItemToCart = async (sku: string): Promise<void> => {
        const data = addItemToCart(sku)
        const res: APIResponse = await api.post(ADD_PRODUCT_CART_URL, data)
        const ds: AddItemCartRes = await res.json()
    }
    getCartCount = async (): Promise<number> => {
        const data = createUserinfoWithAllDetails()
        const res: APIResponse = await api.post(USER_INFO, data)
        const ds: UserInfoRes = await res.json()
        return ds.data.currentUserInfo.cart_items_count
    }
    removeItemFromWishList = async (id: number): Promise<number> => {
        const data = removeItemWishList(id)
        const res: APIResponse = await api.post(REMOVE_PRODUCT_WISH_LIST_URL, data)
        const ds: RemoveItemWishListRes = await res.json()
        return ds.data.removeProductsFromAnyWishlistById.anyWishlist.items_count
    }
    removeItemFromCart = async (id: number) => {
        const data = removeItemFromCart(id)
        const res: APIResponse = await api.post(REMOVE_PRODUCT_CART, data)
        const ds: RemoveItemCartRes = await res.json()
    }
    clearCart = async (): Promise<void> => {
        const data = createUserinfoWithAllDetails()
        const res: APIResponse = await api.post(USER_INFO, data)
        const ds: UserInfoRes = await res.json()
        const ls: Array<Item> = ds.data.currentUserInfo.cart_object.items
        ls.forEach(async (item) => await this.removeItemFromCart(parseInt(item.id)))
    }
    clearWishList = async (): Promise<void> => {
        const res = await api.post(WISHLIST_DATA)
        const ds: WishListRes = await res.json()
        const ls: Array<ItemW> = ds.data.anyWishlist.items
        ls.forEach(async (item) => { await this.removeItemFromWishList(item.id) })

    }
    getItemDetails = async (): Promise<Array<Item>> => {
        const data = createUserinfoWithAllDetails()
        const res: APIResponse = await api.post(USER_INFO, data)
        const ds: UserInfoRes = await res.json()
        const ls: Array<Item> = ds.data.currentUserInfo.cart_object.items
        return ls
    }
    getAllItemsSKU = async (category_id: string) => {
        const data = getItemDetails(category_id)
        const res: APIResponse = await api.post(LIST_OF_ITEMS, data)
        const ds: ItemDetailsRes = await res.json()
        const ls: Array<ItemP> = ds.data.products.items
        const skus: string[] = [];
        ls.forEach((item) => skus.push(item.sku));
        return skus
    }


}
