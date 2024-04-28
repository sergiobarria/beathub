<script lang="ts">
	import EventForm from '../_components/event-form.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<main class="my-6 flex-1">
	<h1 class="text-3xl font-bold tracking-wide">New Event Form</h1>
	<p>This is the new event form. It is a simple form that allows you to create a new event.</p>

	<hr class="my-4 border-gray-600" />

	<EventForm states={data.states} data={data.form} />
</main>
