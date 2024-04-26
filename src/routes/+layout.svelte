<script>
	import '@fontsource/quantico/400.css';
	import '@fontsource/quantico/700.css';

	import AppHeader from '$lib/components/site/app-header.svelte';
	import AppFooter from '$lib/components/site/app-footer.svelte';

	import '../app.css';
</script>

<div class="container mx-auto flex h-full min-h-screen max-w-screen-2xl flex-col">
	<AppHeader />
	<main class="flex-1">
		<slot />
	</main>
	<AppFooter />
</div>
