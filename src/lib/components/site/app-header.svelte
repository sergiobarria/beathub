<script lang="ts">
	import { page } from '$app/stores';
	import { cn } from '$lib/utils';
	import { PlusIcon } from 'lucide-svelte';

	import Button from '../ui/button/button.svelte';

	const LINKS = [
		{ label: 'Events', href: '/events', exact: false },
		{ label: 'About', href: '/about', exact: false }
	];
</script>

<header class="flex h-20 items-center justify-between">
	<div class="font-quantico text-3xl font-bold">
		<a href="/">
			<span class="text-primary">DJ</span> Block
		</a>
	</div>

	<nav class="space-x-5">
		{#each LINKS as { label, href, exact } (label)}
			<a
				{href}
				class={cn('text-sm', {
					'bg-primary px-2 py-1.5 font-semibold': $page.url.pathname === href,
					'text-opacity-70 hover:text-primary': $page.url.pathname !== href
				})}
			>
				{label}
			</a>
		{/each}

		<!-- TODO: Show this button only to authenticated users -->
		<Button href="/events/add" size="sm">
			<PlusIcon class="mr-2 size-4" />
			Add New Event
		</Button>
	</nav>
</header>
