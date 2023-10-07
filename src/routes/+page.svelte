<script lang="ts">
	import { page } from "$app/stores"
	import "../app.css"
	import json from "../products.json"

	let products = json["products"]
	let restoreProducts = json["products"]

	let search = $page.url.searchParams.get("cerca")!

	if (search) {
		filter()
	}

	function filter(e?: any) {
		products = restoreProducts.filter((product) => {
			return product.title.toLowerCase().includes(search)
		})
	}
</script>

<main class="w-full max-w-[50em] p-[25px] m-auto font-sans">
	<form class="w-full flex justify-center items-center flex-col" on:submit={(e) => filter(e)}>
		<h2 class="text-center font-bold text-[25px]">Buscar</h2>
		<input
			type="text"
			class="bg-slate-100 rounded-[7px] w-full max-w-[500px] p-[16px] justify-center flex"
			name="cerca"
			bind:value={search}
		/>
	</form>
	<section>
		{#each products as product}
			<article class="flex gap-[20px] p-[16px] items-center">
				<div>
					<img
						src={product.thumbnail}
						alt={`Foto de ${product.title}`}
						class="rounded-full object-cover w-[100px] h-[100px]"
					/>
				</div>
				<div>
					<h2 class="font-bold text-[20px]">
						{product.title}
					</h2>
					<p class="max-w-[450px]">
						{product.description}
					</p>
					<p class="font-bold">
						€{product.price}
					</p>
				</div>
			</article>
		{/each}
	</section>
</main>
