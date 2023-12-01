export interface AddItemWishListRes {
    data: Data
}

export interface Data {
    addProductsToWishlist: AddProductsToWishlist
}

export interface AddProductsToWishlist {
    changed: number
    anyWishlist: AnyWishlist
}

export interface AnyWishlist {
    items_count: number
    items: Item[]
}

export interface Item {
    id: number
    product: Product
}

export interface Product {
    sku: string
    stock_status2: string
    lastcall: string
    __typename: string
    id: number
    visibility: string
    status: string
    early_cutoff: number
    icon_stampa: any
    justlanded: string
    stampa: any
    stampa_sale: number
    stampa_strip: any
    stampa_vip_strip: any
    category_ids: string[]
    brand: string
    has_school: boolean
    use_qty: number
    brand_url: BrandUrl
    div_top: string
    div_top_code: string
    div: string
    div_code: string
    type: any
    fabric: string
    meta_title: any
    meta_keyword: any
    meta_description: any
    swatch_image: any
    image: Image
    media_gallery: MediaGallery[]
    small_image: SmallImage
    thumbnail: Thumbnail
    fragile_product: number
    description: Description
    categories: Category[]
    configurable_options: ConfigurableOption[]
    price_range: PriceRange
    variants: Variant[]
    tx_labels: TxLabels2
    resizeMap: ResizeMap2
    __decorate_was_here: boolean
    blocks: Blocks
    defaultColorValueIndex: number
    inStockSkuVariantsBy: InStockSkuVariantsBy
    __from: string
}

export interface BrandUrl {
    brand: number
    name: string
    url: string
}

export interface Image {
    disabled: any
    label: string
    position: any
    url: string
}

export interface MediaGallery {
    disabled: boolean
    label: string
    position: number
    url: string
    __typename: string
}

export interface SmallImage {
    disabled: any
    label: string
    position: any
    url: string
}

export interface Thumbnail {
    disabled: any
    label: string
    position: any
    url: string
}

export interface Description {
    html: string
}

export interface Category {
    name: string
    path_in_store: any
    path: string
    url_key: string
    url_path: string
    level: number
    id: number
    breadcrumbs?: Breadcrumb[]
}

export interface Breadcrumb {
    category_id: number
    category_level: number
    category_name: string
    category_url_path: string
    category_url_key: string
}

export interface ConfigurableOption {
    attribute_code: string
    attribute_id: string
    id: number
    label: string
    values: Value[]
}

export interface Value {
    default_label: string
    label: string
    store_label: string
    use_default_value: boolean
    value_index: number
    swatch_data: SwatchData
}

export interface SwatchData {
    value: string
}

export interface PriceRange {
    minimum_price: MinimumPrice
    maximum_price: MaximumPrice
}

export interface MinimumPrice {
    regular_price: RegularPrice
    final_price: FinalPrice
    discount: Discount
}

export interface RegularPrice {
    value: number
    currency: string
}

export interface FinalPrice {
    value: number
    currency: string
}

export interface Discount {
    amount_off: number
    percent_off: number
}

export interface MaximumPrice {
    regular_price: RegularPrice2
    final_price: FinalPrice2
    discount: Discount2
}

export interface RegularPrice2 {
    value: number
    currency: string
}

export interface FinalPrice2 {
    value: number
    currency: string
}

export interface Discount2 {
    amount_off: number
    percent_off: number
}

export interface Variant {
    attributes: Attribute[]
    product: Product2
}

export interface Attribute {
    label: string
    code: string
    value_index: number
}

export interface Product2 {
    id: number
    sku: string
    justlanded: string
    status: string
    stock_status2: string
    stampa: any
    stampa_sale: any
    stampa_strip: number
    stampa_vip_strip: any
    lastcall: any
    swatch_image: any
    state_stampa: StateStampa
    person_height: any
    person_size: any
    parent_product: ParentProduct
    image: Image2
    media_gallery: MediaGallery2[]
    small_image: SmallImage2
    thumbnail: Thumbnail2
    name: string
    laundry: number
    fragile_product: any
    manufacturer: string
    brand: string
    div_top: string
    div_top_code: string
    div: string
    div_code: string
    type: any
    description: Description3
    price_per_100: PricePer100
    price_range: PriceRange2
    tx_labels: TxLabels
    resizeMap: ResizeMap
    __decorate_was_here: boolean
    fabric: string
}

export interface StateStampa {
    class: string
    html: string
    text: string
}

export interface ParentProduct {
    product: Product3
}

export interface Product3 {
    id: number
    sku: string
    name: string
    status: string
    visibility: string
    icon_stampa: any
    state_stampa: StateStampa2
    person_height: any
    person_size: any
    fabric: string
    manufacturer: string
    laundry: number
    description: Description2
}

export interface StateStampa2 {
    class: string
    html: string
    text: string
}

export interface Description2 {
    html: string
}

export interface Image2 {
    disabled: any
    label: string
    position: any
    url: string
}

export interface MediaGallery2 {
    disabled: boolean
    label: string
    position: number
    url: string
}

export interface SmallImage2 {
    disabled: any
    label: string
    position: any
    url: string
}

export interface Thumbnail2 {
    disabled: any
    label: string
    position: any
    url: string
}

export interface Description3 {
    html: string
}

export interface PricePer100 {
    label: string
    show_price_per_100: boolean
}

export interface PriceRange2 {
    minimum_price: MinimumPrice2
    maximum_price: MaximumPrice2
}

export interface MinimumPrice2 {
    regular_price: RegularPrice3
    final_price: FinalPrice3
    discount: Discount3
}

export interface RegularPrice3 {
    value: number
    currency: string
}

export interface FinalPrice3 {
    value: number
    currency: string
}

export interface Discount3 {
    amount_off: number
    percent_off: number
}

export interface MaximumPrice2 {
    regular_price: RegularPrice4
    final_price: FinalPrice4
    discount: Discount4
}

export interface RegularPrice4 {
    value: number
    currency: string
}

export interface FinalPrice4 {
    value: number
    currency: string
}

export interface Discount4 {
    amount_off: number
    percent_off: number
}

export interface TxLabels {
    brand: string
    laundry: string
    manufacturer: string
    div_top: string
    div: string
}

export interface ResizeMap { }

export interface TxLabels2 {
    stampa_sale: string
    brand: string
    laundry: string
    manufacturer: string
    div_top: string
    div: string
}

export interface ResizeMap2 { }

export interface Blocks {
    brand: string
    laundry: string
    delivery: string
    description: Description4
}

export interface Description4 {
    content: string
    cssSelector: string
    contentReact: string
    schedule_contentReact: string
    contentWidgets: any[]
    schedule_contentWidgets: any[]
    contentText: string
    schedule_contentText: string
}

export interface InStockSkuVariantsBy {
    color: Color
    size: Size
}

export interface Color {
    "111": string[]
}

export interface Size {
    "33": string[]
    "35": string[]
    "40": string[]
    "41": string[]
    "10154": string[]
}

