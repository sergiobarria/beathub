<script lang="ts">
	import type { PageData } from './$types';
	import { goto } from '$app/navigation';
	import { debounce } from 'ts-debounce';

	import EventsList from '../_components/events-list.svelte';
	import Input from '$lib/components/ui/input/input.svelte';
	import { SearchIcon, XIcon } from 'lucide-svelte';
	import { page } from '$app/stores';

	export let data: PageData;
	let query = $page.url.searchParams.get('q') || '';

	const updateQuery = debounce((value: string) => {
		query = value;
		goto(`?q=${encodeURIComponent(value)}`, { replaceState: true });
	}, 500);

	function handleSearchInput(event: Event) {
		updateQuery((event.target as HTMLInputElement).value);
	}
</script>

<svelte:head>
	<title>Events | BeatHub</title>
	<meta name="description" content="Published events" />
</svelte:head>

<main class="my-6 flex-1">
	<h1 class="text-3xl font-bold tracking-wide">Published Events</h1>
	<div class="flex justify-between gap-6">
		<p class="text-pretty lg:max-w-2xl">
			These are the published events. You can view the details of each event by clicking on the
			"View Details" button when you hover over the event cover.
		</p>
		<div class="relative w-full lg:max-w-[400px]">
			<Input
				type="search"
				placeholder="Search events by name, venue, or performers"
				class="mt-4 lg:mt-0"
				value={query}
				autofocus
				on:input={handleSearchInput}
			/>
			<div class="absolute right-0 top-0 flex transform items-center justify-center px-3 py-2.5">
				{#if query}
					<button
						type="button"
						class="text-gray-600 hover:text-gray-800"
						on:click={() => {
							query = '';
							goto('/events', { replaceState: true });
						}}
					>
						<XIcon class="size-5" />
					</button>
				{/if}
				{#if !query}
					<SearchIcon class="text-gray-600" />
				{/if}
			</div>
		</div>
	</div>

	<hr class="my-4 border-gray-600" />

	<EventsList events={data.events} />
</main>
