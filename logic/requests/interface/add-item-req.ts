interface AddItem {

    "sku": string[],
    "attributes": string[],
    "values": string[]
}
interface AddItemCart {
    "cart_items": [
        {
            "data": {
                "quantity": number,
                "any_sku": string
            }
        }
    ],
    "skip_collect": number

}

const createShoe = (sku: string, values: string): AddItem => {
    return {
        "sku": [sku],
        "attributes": ["93"],
        "values": [values]
    }
}
const addItemToCart = (sku: string): AddItemCart => {
    return {
        "cart_items": [
            {
                "data": {
                    "quantity": 1,
                    "any_sku": sku
                }
            }
        ],
        "skip_collect": 1
    }
}
export { AddItem, createShoe, AddItemCart, addItemToCart }
