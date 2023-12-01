import { userInfo } from "os"


interface Login {
    username: string,
    password: string

}

interface UserInfo {
    "withBasicDetails": boolean,
    "withMultipass": boolean
}
interface UserInfoWithCart {
    "withCartObject": boolean,
    "withCartCheckoutDetails": boolean,
    "withMultipass": boolean

}

interface UserInfoWithAllDetails {
    "withBasicDetails": boolean,
    "withCartObject": boolean,
    "withWishlistCount": boolean,
    "withCartCheckoutDetails": boolean,
    "withCartItems": boolean,
    "withMultipass": boolean
}

const createUserinfoWithAllDetails = (): UserInfoWithAllDetails => {
    return {
        "withBasicDetails": true,
        "withCartObject": true,
        "withWishlistCount": true,
        "withCartCheckoutDetails": true,
        "withCartItems": true,
        "withMultipass": false
    }
}

const createUserInfoWithCart = (): UserInfoWithCart => {
    return {

        "withCartObject": true,
        "withCartCheckoutDetails": true,
        "withMultipass": false
    }

}
const createUserInfo = (): UserInfo => {
    return {
        "withBasicDetails": true,
        "withMultipass": false
    }
}
const createLogin = (username: string, password: string): Login => {
    return {
        username: username,
        password: password
    }
}
export { Login, UserInfo, UserInfoWithCart, createLogin, createUserInfo, createUserInfoWithCart, createUserinfoWithAllDetails }