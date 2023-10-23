<script lang="ts">
	// import './styles.css';
	import { navigating, page } from '$app/stores';
	import { fade } from 'svelte/transition';

	const pageNames: Record<string, string> = {
		'/': 'Solutions',
		'/social': 'Social',
		'/story': 'Story'
	};

	$: activeUrl = $page.url.pathname;

	$: getNavProps = () =>
		Object.keys(pageNames).map((key) => ({
			isActive: key === activeUrl,
			pageName: pageNames[key],
			link: key
		}));

	$: links = getNavProps();

	$: if ($navigating?.complete) {
		links = getNavProps();
	}

	$: activeLink = links.find((link) => link.isActive)?.pageName;
</script>

<header class="page-header">
	<a href="/"><img src="assets/logo.png" alt="" /></a>
	{#key activeLink}
		<div class="active-link" in:fade={{ duration: 300 }}>
			{activeLink}
		</div>
	{/key}
	<nav>
		{#each links as { isActive, pageName, link }}
			<!-- {#if !isActive} -->
			<a href={link}>{pageName}</a>
			<!-- {/if} -->
		{/each}
	</nav>
</header>

<style>
	header {
		display: flex;
		color: var(--white);
		justify-content: space-between;
		align-items: center;
		height: 8rem;
		padding: 2rem 4rem 2rem 4rem;
	}

	header img {
		height: 80px;
	}

	header nav {
		font-size: 16pt;
	}

	header nav a {
		color: var(--white);
		margin-left: 1rem;
		text-decoration: none;
	}

	header nav a:hover {
		color: var(--gold);
	}

	.active-link {
		font-size: 30pt;
	}
</style>
