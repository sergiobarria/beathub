<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
</script>

<header class="mx-auto flex h-20 max-w-xl items-center">
	<nav>
		<Button href="/login">Login</Button>

		<Button href="/register">Register</Button>
	</nav>
</header>
<main class="my-12">
	<slot />
</main>
