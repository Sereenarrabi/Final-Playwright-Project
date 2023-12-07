export interface UserDetails {
    data: Data
}

export interface Data {
    customer: Customer
}

export interface Customer {
    firstname: string
    lastname: string
    middlename: any
    prefix: any
    suffix: any
    date_of_birth: string
    date_of_birth_iso: string
    is_subscribed: boolean
    email: string
    default_billing: any
    default_shipping: any
    gender: number
    addresses: any[]
}
