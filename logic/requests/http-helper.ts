import { ApiService } from "../../infra/requests/api-service"
import { createLogin, createUserinfoWithAllDetails } from "./interface/login-interface-req"
import * as uc from "../../infra/resources/user-cred.json"
import { APIResponse, Page } from "playwright/test"
import { BasePage } from "../pages/base-page"
import { createShoe, addItemToCart } from "./interface/add-item-req"
import { AddItemWishListRes, Item } from "../response/interface/add-item-wishlist-res"
import { RemoveItemWishListRes } from "../response/interface/remove-item-wishlist-res"
import { removeItemWishList, removeItemFromCart } from "./interface/remove-item-req"
import { AddItemCartRes } from "../response/interface/add-item-cart-res"
import { UserInfoRes, ItemC } from "../response/interface/user-info-res"
import { RemoveItemCartRes } from "../response/interface/remove-item-cart-res"
import { getItemDetails } from "./interface/item-details-req"
import { ItemDetailsRes, ItemP, Color } from "../response/interface/item-details-res"
import { WishListRes, ItemW } from "../response/interface/wishlist-data-res"
import { UserDetails } from "../response/interface/user-details-res"

const api = new ApiService()
const LOGIN_URL = uc.LOGIN_URL
const ADD_PRODUCT_WISH_LIST_URL = uc.ADD_PRODUCT_WISH_LIST_URL
const REMOVE_PRODUCT_WISH_LIST_URL = uc.REMOVE_PRODUCT_WISH_LIST_URL
const WISHLIST_DATA = uc.WISHLIST_DATA
const ADD_PRODUCT_CART_URL = uc.ADD_PRODUCT_CART_URL
const REMOVE_PRODUCT_CART = uc.REMOVE_PRODUCT_CART
const USER_INFO = uc.USER_INFO
const LIST_OF_ITEMS = uc.LIST_OF_ITEMS
const USER_DETAILS = uc.USER_DETAILS

export class HttpHelper extends BasePage {
    private wishList: string[] = [];

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
        this.wishList.push(ds.data.addProductsToWishlist.anyWishlist.items[0].product.variants[0].product.name)
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
    getWishListCount = async (): Promise<number> => {
        const res = await api.post(WISHLIST_DATA)
        const ds: WishListRes = await res.json()
        return ds.data.anyWishlist.items_count
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
        const ls: Array<ItemC> = ds.data.currentUserInfo.cart_object.items
        ls.forEach(async (item) => await this.removeItemFromCart(parseInt(item.id)))
    }
    clearWishList = async (): Promise<void> => {
        const res = await api.post(WISHLIST_DATA)
        const ds: WishListRes = await res.json()
        const ls: Array<ItemW> = ds.data.anyWishlist.items
        ls.forEach(async (item) => { await this.removeItemFromWishList(item.id) })
    }
    getItemDetails = async (): Promise<Array<ItemC>> => {
        const data = createUserinfoWithAllDetails()
        const res: APIResponse = await api.post(USER_INFO, data)
        const ds: UserInfoRes = await res.json()
        const ls: Array<ItemC> = ds.data.currentUserInfo.cart_object.items
        return ls
    }
    getAllItemsSKU = async (category_id: string): Promise<Record<string, Color>> => {
        const data = getItemDetails(category_id)
        const res: APIResponse = await api.post(LIST_OF_ITEMS, data)
        const ds: ItemDetailsRes = await res.json()
        const ls: Array<ItemP> = ds.data.products.items
        const skus: Record<string, Color> = {};
        ls.forEach((item) => {
            const colorObject = item.inStockSkuVariantsBy.color;
            skus[item.sku] = colorObject
        });
        console.log(skus)
        return skus;
    }
    getAllItemsNames = async (): Promise<Array<string>> => {
        return this.wishList
    }
    verifyItemExistsInWishList = async (name: string | null): Promise<boolean> => {
        let lis = this.wishList.filter(item => item == name)
        return lis.length == 1;
    };
    verifyItemExistsInCart = async (name: string | null): Promise<boolean> => {
        const data = createUserinfoWithAllDetails()
        const res: APIResponse = await api.post(USER_INFO, data)
        const ds: UserInfoRes = await res.json()
        const ls: Array<ItemC> = ds.data.currentUserInfo.cart_object.items
        const temp = ls.filter((item) => item.product.thumbnail.label == name)
        return temp.length == 1
    }
    getUserProfileName = async (): Promise<string | null> => {
        const res: APIResponse = await api.post(USER_DETAILS)
        const ds: UserDetails = await res.json()
        return ds.data.customer.firstname
    }
}
