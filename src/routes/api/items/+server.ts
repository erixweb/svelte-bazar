import { filter } from "$lib/filter"
import json from "../../../products.json"

export const GET = ({ url }: { url: URL }) => {
	const products: any = json["products"]

	const query = url.searchParams.get("cerca")!
	const category = url.searchParams.get("categoria")

	return new Response(JSON.stringify(filter(products, { query, category })))
}
