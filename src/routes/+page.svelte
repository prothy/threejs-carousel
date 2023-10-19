<script>
	import { onMount } from 'svelte';
	import '../app.css';
	import { initializeCarousel } from '$lib/components/Carousel';
	import { page } from '$app/stores';

	onMount(() => {
		initializeCarousel();
	});

	console.log($page.route.id)
</script>

<main />
