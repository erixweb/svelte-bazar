<script lang="ts">
	import { page } from "$app/stores"
	import json from "../../../../products.json"
	import "../../../../app.css"
	import IconStar from "$lib/IconStar.svelte"

	const products = json["products"]
	const id = Number($page.url.pathname.substring(11))

	const product = products.find((product) => product.id === id)
	const reviews = product?.reviews
	const productImages: any = product?.images
	let stars: Array<string> = []

	function getStars(rating: number | undefined) {
		const stars = []
		for (let i = 0; i < 5; i++) {
			if (i < Math.round(Number(rating))) {
				stars.push("x")
			} else {
				stars.push("o")
			}
		}

		return stars
	}

	stars = getStars(product?.rating)
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
			<div
				class="order-2 w-full flex gap-[40px] max-[850px]:order-1 max-[850px]:justify-center max-[850px]:flex-col items-center"
			>
				<div class="w-full flex items-center text-center justify-center">
					<img
						src={product?.thumbnail}
						alt=""
						class="h-[300px] w-[250px] max-md:h-[300px] max-md:max-w-[250px] object-cover hover:scale-110 duration-250 transition-all rounded-[12px] shadow-xl"
					/>
				</div>
				<div
					class="flex flex-col flex-wrap max-[850px]:flex-row gap-[20px] w-full justify-center"
				>
					{#each productImages as image}
						<img src={image} alt="" class="w-[60px] h-[60px] object-cover" />
					{/each}
				</div>
			</div>
			<div class="order-1 max-[850px]:order-2 w-full p-[16px]">
				<h2 class="text-[25px] font-bold mb-[10px]">
					{product?.title}
				</h2>
				<h3 class="text-[22px] font-bold mb-[10px]">
					€{product?.price}
				</h3>
				<div class="flex gap-[5px] mb-[30px]">
					{#each stars as star}
						{#if star === "x"}
							<IconStar fill="x" />
						{:else if star === "o"}
							<IconStar fill="o" />
						{:else}
							<IconStar fill="m" />
						{/if}
					{/each}
				</div>
				<p class="font-bold">
					{product?.stock} disponibles
				</p>
				<p class="max-w-[300px]">
					{product?.description}
				</p>
				<button
					class="border-[1px] border-slate-300 rounded-[7px] p-[7px] px-[20px] w-full shadow-[0px_5px_10px] shadow-gray-200 hover:scale-110 duration-[250ms] mt-[40px]"
				>
					Comprar
				</button>
			</div>
		{/if}
	</div>
	<section class="mt-[20px]">
		<h2 class="font-bold text-[30px]">Reseñas</h2>
		{#each reviews as review}
			<article class="py-[10px] border-y-black border-b-2">
				<h3 class="text-[17px] font-bold text-gray-600">
					{review.reviewerName} · {new Date(review.date)}
				</h3>
				<div class="flex py-[10px]">
					{#each getStars(review?.rating) as star}
						{#if star === "x"}
							<IconStar fill="x" />
						{:else if star === "o"}
							<IconStar fill="o" />
						{:else}
							<IconStar fill="m" />
						{/if}
					{/each}
				</div>
				<p>
					{review?.comment}
				</p>
			</article>
		{/each}
	</section>
</main>
