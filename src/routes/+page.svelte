<script>
	import { onMount } from 'svelte';
	import '../app.css';
	import { initializeCarousel } from '$lib/components/carousel';

	onMount(() => {
		initializeCarousel();
	});
</script>

<header>
	<img src="assets/logo.png" alt="" />
	<nav>
		<a href="#">Solutions</a>
		<a href="#">Social</a>
		<a href="#">About us</a>
	</nav>
</header>
<main />
