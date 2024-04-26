<script lang="ts">
	import { page } from '$app/stores';
	import { cn } from '$lib/utils';

	const LINKS = [
		{ label: 'Events', href: '/events', exact: false },
		{ label: 'About', href: '/about', exact: false }
	];
</script>

<header class="flex h-20 items-center justify-between">
	<div class="text-3xl font-bold">
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
	</nav>
</header>
