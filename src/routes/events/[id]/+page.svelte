<script lang="ts">
	import { page } from '$app/stores';
	import { getFlash } from 'sveltekit-flash-message';
	import type { PageData } from './$types';

	export let data: PageData;
	let isNewEvent = false;

	const flash = getFlash(page);

	$: if ($flash) {
		isNewEvent = true;
	}
</script>

<main class="flex-1 py-12">
	<div class="flex items-center gap-3">
		<hi>Event Details</hi>
		{#if isNewEvent}
			<p class="animate-bounce font-semibold text-green-400">New Event Created!</p>
		{/if}
	</div>
	<p>Event ID: {data.event.id}</p>

	<pre>{JSON.stringify(data.event, null, 2)}</pre>
</main>
