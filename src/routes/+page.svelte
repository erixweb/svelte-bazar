<script lang="ts">
	import { goto } from "$app/navigation"
	import { page } from "$app/stores"
	import IconSearch from "$lib/IconSearch.svelte"
	import Product from "$lib/product.svelte"
	import "../app.css"
	import json from "../products.json"

	let products: any = json["products"]
	let searchItems: any = []

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
	function handleSearch(searchValue: string) {
		searchItems = []
		products
			.filter((product: any) =>
				product.title.toLowerCase().includes(searchValue.toLowerCase()),
			)
			.slice(0, 5)
			.forEach((product: any) => {
				searchItems.push({ name: product.title, href: `/api/items/${product.id}` })
			})
	}
</script>

<svelte:head>
	<title>Bazar amb Svelte</title>
</svelte:head>
<main class="w-full max-w-[50em] p-[25px] m-auto font-sans">
	<h2 class="text-center font-bold text-[40px]">Bazar</h2>
	<form
		class="w-full flex justify-center items-center flex-col"
		on:submit={(e) => handleSubmit(e)}
	>
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
		<div class="w-full max-w-[500px] rounded-[7px] relative">
			<div
				class="inline-flex items-center bg-slate-100 gap-[10px] p-[16px] w-full rounded-[5px]"
			>
				<IconSearch />
				<input
					type="text"
					class="bg-transparent w-full justify-center flex outline-none"
					placeholder="Cerca"
					bind:value={search}
					on:keyup={() => handleSearch(search)}
				/>
			</div>
			<div class="w-full max-w-[500px] absolute">
				<ol class="bg-slate-100 rounded-b-[5px]">
					{#each searchItems as item}
						<li class="py-[10px] px-[16px]">
							<a href={item.href}>
								{item.name}
							</a>
						</li>
					{/each}
				</ol>
			</div>
		</div>
	</form>
	<section class="w-full grid grid-cols-3">
		{#each products as product}
			<Product {product} />
		{/each}
	</section>
</main>
