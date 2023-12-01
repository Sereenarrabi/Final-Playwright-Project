export interface RemoveItemCartRes {
    data: Data
}

export interface Data {
    removeItemFromAnyCart: RemoveItemFromAnyCart
}

export interface RemoveItemFromAnyCart {
    total_quantity: number
}
