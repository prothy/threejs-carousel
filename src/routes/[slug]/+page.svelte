<script lang="ts">
	// import './page.css';
</script>

<main class="page-container">
	<section>
		<h1>Page title</h1>
		<p>
			Minim mollit magna nulla deserunt incididunt sunt aliquip commodo veniam. Dolore ex laboris
			reprehenderit eiusmod sunt non duis veniam laborum sunt laboris. Eu eu nostrud eu aliqua.
			Labore commodo magna aliquip ipsum incididunt eiusmod. Cupidatat non ut labore pariatur ex
			sint culpa sint aliquip minim deserunt aliqua laboris. Id laborum nulla labore voluptate.
			Reprehenderit dolore mollit adipisicing sunt exercitation qui aliqua ea laborum velit magna
			et.
		</p>
		<p>
			Minim mollit magna nulla deserunt incididunt sunt aliquip commodo veniam. Dolore ex laboris
			reprehenderit eiusmod sunt non duis veniam laborum sunt laboris. Eu eu nostrud eu aliqua.
			Labore commodo magna aliquip ipsum incididunt eiusmod. Cupidatat non ut labore pariatur ex
			sint culpa sint aliquip minim deserunt aliqua laboris. Id laborum nulla labore voluptate.
			Reprehenderit dolore mollit adipisicing sunt exercitation qui aliqua ea laborum velit magna
			et.
		</p>
	</section>
</main>

<style>
	:global(.page-header) {
		color: black;
	}

	.page-container {
		position: absolute;
		top: 0;
		width: 100vw;
		min-height: 100vh;
		background: var(--gold);
		color: #2e2e2e;
		font-size: 30pt;
		z-index: -1;
		animation: component-transition 300ms ease-in;
	}

	.page-container > section {
		width: 1000px;
		margin: 10rem auto;
	}

	.page-container > section > * {
		opacity: 0;
		animation: 300ms ease-in 300ms text-transition forwards;
	}

	.page-container h1 {
		font-size: 80pt;
		line-height: 2em;
	}

	.page-container p {
		margin-bottom: 1em;
	}

	@keyframes component-transition {
		from {
			opacity: 0;
		}

		to {
			opacity: 1;
		}
	}

	@keyframes text-transition {
		from {
			opacity: 0;
			transform: translateY(20px);
		}

		to {
			opacity: 1;
			transform: translateY(0);
		}
	}
</style>
