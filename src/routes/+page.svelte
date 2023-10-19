<script lang="ts">
	import { onMount } from 'svelte';
	import { initializeCarousel } from '$lib/components/Carousel';
	import { page } from '$app/stores';
	import type { ObjectConfig } from '$lib/config';

	let currentLink: string | undefined = undefined;

	const onClick = (activeObject: ObjectConfig) => {
		location.assign(activeObject?.link);
	};

	onMount(() => {
		initializeCarousel(onClick);
	});

	console.log($page.route.id);
</script>

<main class="carousel-container" />
