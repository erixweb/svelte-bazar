<script lang="ts">
	import type { Product } from "../app"
	import IconStar from "./IconStar.svelte"

	export let product: Product

	const starsRound = Math.round(product.rating)

	const stars = new Array(starsRound).fill("x")
	if (starsRound > product.rating) {
		stars.pop()
		stars.push("m")
	}
	for (let i = starsRound; i < 5; i++) {
		stars.push("o")
	}
</script>

<a href={`/api/items/${product.id}`} class="flex flex-col gap-[20px] p-[16px] items-center w-full">
	<div>
		<img
			src={product.thumbnail}
			alt={`Foto de ${product.title}`}
			class="object-cover w-full h-full max-h-[250px] rounded-[7px]"
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
		<div class="flex">
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
	</div>
</a>
