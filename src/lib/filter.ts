import type { Product } from "../app"

export function filter (products: Product[], parameters: any) {
    if (parameters.query) {
        products = products.filter((product) => {
            return product.title.toLowerCase().includes( parameters.query.toLowerCase())
        })
    }
    if (parameters.category) {
        products = products.filter((product) => {
            return product.category === parameters.category
        })
    }

    return products
}