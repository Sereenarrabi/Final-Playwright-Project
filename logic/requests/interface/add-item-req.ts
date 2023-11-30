interface AddItem {

    "sku": string[],
    "attributes": string[],
    "values": string[]
}

const createShoe = (sku: string, values: string): AddItem => {
    return {
        "sku": [sku],
        "attributes": ["93"],
        "values": [values]
    }
}
export { AddItem, createShoe }

//93 men shoes
// {
//     "sku": [
//         "W150580001"
//     ],
//     "attributes": [
//         "93"
//     ],
//     "values": [
//         "4"
//     ]
// }