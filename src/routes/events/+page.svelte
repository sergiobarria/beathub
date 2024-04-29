<script lang="ts">
	import type { PageData } from './$types';

	import EventsList from '../_components/events-list.svelte';

	export let data: PageData;
</script>

<main class="my-6 flex-1">
	<h1 class="text-3xl font-bold tracking-wide">Published Events</h1>
	<p>
		These are the published events. You can view the details of each event by clicking on the "View
		Details" button when you hover over the event cover.
	</p>

	<hr class="my-4 border-gray-600" />

	<EventsList events={data.events} />
</main>
