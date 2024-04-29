<script lang="ts">
	import EventForm from '../../_components/event-form.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<main class="py-12">
	<h1 class="text-3xl font-bold tracking-wide">Edit Event: {data.form.data.name}</h1>
	<p>Edit the details of the event below. Fields marked with an asterisk (*) are required.</p>

	<hr class="my-4 border-gray-600" />

	<EventForm states={data.states} data={data.form} />
</main>
