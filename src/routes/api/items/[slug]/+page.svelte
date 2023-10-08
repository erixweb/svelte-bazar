<script lang="ts">
	import { preloadData } from "$app/navigation"
	import { page } from "$app/stores"
	import json from "../../../../products.json"
	import "../../../../app.css"
	import IconStar from "$lib/IconStar.svelte"

	const products = json["products"]
	const id = Number($page.url.pathname.substring(11))

	const product = products.find((product) => product.id === id)
	const productImages: any = product?.images
	let stars: Array<string> = []

	for (let i = 0; i < 5; i++) {
		if (i < Math.round(Number(product?.rating))) {
			stars.push("x")
		} else {
			stars.push("o")
		}
	}
</script>

<svelte:head>
	<title>
		{product?.title} | Bazar amb Svelte
	</title>
</svelte:head>
<main class="w-full max-w-[60em] p-[25px] m-auto font-sans">
	{#if typeof window !== "undefined"}
		<a href={window.location.origin} class="text-[30px] font-bold p-[16px]"> &larr; </a>
	{/if}
	<div class="flex max-[850px]:flex-col gap-[20px]">
		{#if product}
			<div class="order-2 w-full flex gap-[40px] max-[850px]:order-1 max-[850px]:justify-center max-[850px]:flex-col items-center">
				<div class="text-right">
					<img
						src={product?.thumbnail}
						alt=""
						class="h-[350px] max-md:h-[250px] max-md:max-w-[250px] w-full max-w-[350px] object-cover rounded-full"
					/>
				</div>
				<div class="flex flex-col flex-wrap max-[850px]:flex-row gap-[20px] w-full justify-center">
					{#each productImages as image}
						<img src={image} alt="" class="w-[60px] h-[60px] object-cover" />
					{/each}
				</div>
			</div>
			<div class="order-1 max-[850px]:order-2 w-full">
				<h2 class="text-[25px] font-bold mb-[10px]">
					{product?.title}
				</h2>
				<h3 class="text-[22px] font-bold mb-[10px]">
					€{product?.price}
				</h3>
				<div class="flex gap-[5px] mb-[30px]">
					{#each stars as star}
						{#if star === "x"}
							<IconStar fill={true} />
						{:else}
							<IconStar fill={false} />
						{/if}
					{/each}
				</div>
				<p class="font-bold">
					{product?.stock} disponibles
				</p>
				<p class="max-w-[300px]">
					{product?.description}
				</p>
			</div>
		{/if}
	</div>
</main>
