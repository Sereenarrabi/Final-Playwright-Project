interface ItemDetailsReq {
    "listingSearchQuery": {
        "categoryId": string,
        "filter": {
            "category_id": {
                "eq": string
            }
        },
        "pageSize": number,
        "currentPage": number,
        "sort": {
            "default": boolean
        },
        "includeAggregations": boolean,
        "includeCategory": boolean
    }
}
const getItemDetails = (category_id: string): ItemDetailsReq => {
    return {
        "listingSearchQuery": {
            "categoryId": category_id,
            "filter": {
                "category_id": {
                    "eq": category_id
                }
            },
            "pageSize": 24,
            "currentPage": 1,
            "sort": {
                "default": true
            },
            "includeAggregations": true,
            "includeCategory": true
        }
    }
}
export { getItemDetails }