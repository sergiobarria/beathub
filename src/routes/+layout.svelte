<script>
	import { page } from '$app/stores';
	import { Toaster, toast } from 'svelte-sonner';
	import { getFlash } from 'sveltekit-flash-message';
	import { ModeWatcher } from 'mode-watcher';

	import '@fontsource/quantico/400.css';
	import '@fontsource/quantico/700.css';

	import '../app.css';

	const flash = getFlash(page);

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

<svelte:head>
	<title>Home | BeatHub</title>
	<meta
		name="description"
		content="BeatHub is a platform for sharing and discovering music events."
	/>
</svelte:head>

<slot />

<ModeWatcher defaultMode="light" />
<Toaster />
