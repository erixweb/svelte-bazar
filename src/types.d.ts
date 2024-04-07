export type Products = {
	products: Product[]
	total: number
	skip: number
	limit: number
}
export type SearchBarProduct = {
	name: string
    href: string
}
export type Product = {
	id: number
	title: string
	description: string
	price: number
	discountPercentage: number
	rating: number
	stock: number
	brand: string
	category: string
	thumbnail: string
	images: string[]
}
