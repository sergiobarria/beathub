<script lang="ts">
	import type { PageData } from './$types';

	import EventForm from '$lib/components/events/event-form.svelte';

	export let data: PageData;
</script>

<section id="new-event" class="py-12">
	<h1 class="text-3xl font-bold tracking-wide">New Event Form</h1>
	<p>This is the new event form. It is a simple form that allows you to create a new event.</p>

	<hr class="my-4 border-gray-600" />

	<EventForm data={data.form} states={data.states} />
</section>
