<script>
	import AppFooter from '$lib/components/app-footer.svelte';
	import AppHeader from '$lib/components/site/app-header.svelte';
	import '../app.css';
</script>

<div class="container mx-auto flex h-full min-h-screen max-w-screen-2xl flex-col">
	<AppHeader />
	<main class="flex-1">
		<slot />
	</main>
	<AppFooter />
</div>
