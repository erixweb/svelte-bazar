<script lang="ts">
	import { goto } from "$app/navigation"
	import { page } from "$app/stores"
	import IconSearch from "$lib/IconSearch.svelte"
	import Product from "$lib/product.svelte"
	import "../app.css"
	import json from "../products.json"

	let products = json["products"]

	let search = $page.url.searchParams.get("cerca") || ""
	let category = $page.url.searchParams.get("categoria") || ""

	handleSubmit()
	function handleSubmit(e?: any) {
		category = $page.url.searchParams.get("categoria") || ""
		if (e) {
			e.preventDefault()
			goto(`?cerca=${search}&categoria=${category}`)
		}
		if (typeof window !== "undefined") {
			fetch(`/api/items?cerca=${search}&categoria=${category}`)
				.then((res) => res.json())
				.then((data) => {
					products = data
				})
		}
	}
</script>

<svelte:head>
	<title>Bazar amb Svelte</title>
</svelte:head>
<main class="w-full max-w-[50em] p-[25px] m-auto font-sans">
	<form
		class="w-full flex justify-center items-center flex-col"
		on:submit={(e) => handleSubmit(e)}
	>
		<h2 class="text-center font-bold text-[25px]">Cerca</h2>
		<div
			class="bg-slate-100 w-full inline-flex items-center max-w-[500px] p-[16px] gap-[10px] rounded-[7px]"
		>
			<IconSearch />
			<input
				type="text"
				class="bg-transparent w-full justify-center flex outline-none"
				bind:value={search}
			/>
		</div>
		<div class="inline-flex mt-[20px] mb-[20px] gap-[20px]">
			<button
				class="border-slate-400 border-[1px] text-[16px] p-[6px] rounded-full min-w-[100px]"
				on:click={() => {
					$page.url.searchParams.set("categoria", "")
				}}
			>
				tots
			</button>
			<button
				class="border-slate-400 border-[1px] text-[16px] p-[6px] rounded-full min-w-[100px]"
				on:click={() => {
					$page.url.searchParams.set("categoria", "smartphones")
				}}
			>
				smartphones
			</button>
			<button
				class="border-slate-400 border-[1px] text-[16px] p-[6px] rounded-full min-w-[100px]"
				on:click={() => {
					$page.url.searchParams.set("categoria", "laptops")
				}}
			>
				portàtils
			</button>
		</div>
	</form>
	<section class="w-full grid grid-cols-3">
		{#each products as product}
			<Product {product} />
		{/each}
	</section>
</main>
