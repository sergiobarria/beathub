<script>
	import { page } from '$app/stores';
	import { getFlash } from 'sveltekit-flash-message';
	import { ModeWatcher } from 'mode-watcher';
	import { toast } from 'svelte-sonner';

	import '@fontsource/quantico/400.css';
	import '@fontsource/quantico/700.css';

	import AppHeader from '$lib/components/site/app-header.svelte';
	import AppFooter from '$lib/components/site/app-footer.svelte';
	import { Toaster } from '$lib/components/ui/sonner';

	import '../app.css';

	const flash = getFlash(page);

	// NOTE: This if statement controls the display of the toast message in all pages
	// that use this layout.
	$: if ($flash) {
		switch ($flash.type) {
			case 'success': {
				toast.success($flash.message);
				break;
			}
			case 'error': {
				toast.error($flash.message);
				break;
			}
		}
	}
</script>

<div class="container mx-auto flex h-full min-h-screen max-w-screen-2xl flex-col">
	<AppHeader />
	<main class="flex-1">
		<slot />
	</main>
	<AppFooter />
	<Toaster />
	<ModeWatcher defaultMode="light" />
</div>
