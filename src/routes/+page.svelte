<script>
	import { onMount } from 'svelte';
	import '../app.css';

  onMount(() => {
    import('$lib/carousel')
  })
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
