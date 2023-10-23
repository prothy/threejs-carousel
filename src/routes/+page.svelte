<script lang="ts">
	import { onMount } from 'svelte';
	import { initializeCarousel } from '$lib/components/Carousel';
	import { page } from '$app/stores';
	import type { ObjectConfig } from '$lib/config';
	import { goto } from '$app/navigation';

	const onClick = (activeObject: ObjectConfig) => {
		goto(activeObject?.link);
	};

	onMount(() => {
		initializeCarousel(onClick);
	});

	console.log($page.route.id);
</script>

<main class="carousel-container" />
