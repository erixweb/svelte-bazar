<script lang="ts">
	import { goto } from "$app/navigation"
	import { page } from "$app/stores"
	import IconSearch from "$lib/IconSearch.svelte"
	import { onMount } from "svelte"
	import "../app.css"
	import json from "../products.json"

	let products = json["products"]

	let search = $page.url.searchParams.get("cerca") || ""
	let category = $page.url.searchParams.get("categoria") || ""

	handleSubmit()
	function handleSubmit(e?: any) {
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
				on:click={() => (category = "")}
			>
				tots
			</button>
			<button
				class="border-slate-400 border-[1px] text-[16px] p-[6px] rounded-full min-w-[100px]"
				on:click={() => (category = "smartphones")}
			>
				smartphones
			</button>
			<button
				class="border-slate-400 border-[1px] text-[16px] p-[6px] rounded-full min-w-[100px]"
				on:click={() => (category = "laptops")}
			>
				portàtils
			</button>
		</div>
	</form>
	<section class="w-full">
		{#each products as product}
			<a href={`/api/items/${product.id}`} class="flex gap-[20px] p-[16px] items-center w-full max-[700px]:flex-col">
				<div>
					<img
						src={product.thumbnail}
						alt={`Foto de ${product.title}`}
						class="rounded-full object-cover w-[100px] h-[100px] max-[700px]:w-full max-[700px]:h-[250px]"
					/>
				</div>
				<div class="w-full max-w-[400px]">
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
			</a>
		{/each}
	</section>
</main>
