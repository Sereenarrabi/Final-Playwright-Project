interface ItemID {
    "id": number
}
interface CartRemove {
    "cart_item_id": number,
    "withMultipass": boolean,
    "skip_collect": number
}



const removeItemWishList = (id: number): ItemID => {
    return {
        "id": id
    }

}
const removeItemFromCart = (id: number): CartRemove => {
    return {
        "cart_item_id": id,
        "withMultipass": false,
        "skip_collect": 1
    }
}

export { ItemID, removeItemWishList, removeItemFromCart }