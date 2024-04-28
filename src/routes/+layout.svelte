<script>
	import { page } from '$app/stores';
	import { PlusIcon } from 'lucide-svelte';

	import '@fontsource/quantico/400.css';
	import '@fontsource/quantico/700.css';

	import Button from '$lib/components/ui/button/button.svelte';
	import { cn } from '$lib/utils';

	import '../app.css';

	const links = [
		{ id: 0, label: 'Events', href: '/events' },
		{ id: 1, label: 'About', href: '/about' },
		{ id: 2, label: 'Contact Us', href: '/contact' }
	];
</script>

<svelte:head>
	<title>Home | BeatHub</title>
	<meta
		name="description"
		content="BeatHub is a platform for sharing and discovering music events."
	/>
</svelte:head>

<div class="container mx-auto flex h-full min-h-screen max-w-screen-2xl flex-col">
	<header class="flex h-20 items-center justify-between">
		<div class="text-2xl font-bold">
			<a href="/">
				Beat<span class="text-primary">Hub</span>
			</a>
		</div>

		<nav class="flex items-center">
			<div class="lg:mr-12">
				{#each links as { id, label, href } (id)}
					<a
						{href}
						class={cn('px-2 text-sm', {
							'border-primary border-b-2 py-1.5 font-semibold':
								$page.url.pathname === href || $page.url.pathname.startsWith(href),
							'text-muted-foreground hover:text-primary font-thin':
								$page.url.pathname !== href && !$page.url.pathname.startsWith(href)
						})}
					>
						{label}
					</a>
				{/each}
			</div>

			<!-- TODO: Show this button only to authenticated users -->
			<Button href="/events/add" size="sm">
				<PlusIcon class="mr-2 size-4" />
				New Event
			</Button>
		</nav>
	</header>

	<!-- Main app entry point 👇 -->
	<slot />

	<footer
		class="mt-6 flex flex-col items-center gap-2 border-t border-gray-600 py-8 text-xs text-gray-400"
	>
		<div class="flex items-center space-x-2">
			{#each links as { id, label, href } (id)}
				<a
					{href}
					class={cn('px-2 text-sm', {
						'border-primary border-b-2 py-1.5 font-semibold':
							$page.url.pathname === href || $page.url.pathname.startsWith(href),
						'text-muted-foreground hover:text-primary font-thin':
							$page.url.pathname !== href && !$page.url.pathname.startsWith(href)
					})}
				>
					{label}
				</a>
			{/each}
		</div>

		<p>Copyright &copy; DJ Block {new Date().getFullYear()}</p>
		<p>Powered by SvelteKit, Turso and Tailwind CSS</p>
	</footer>
</div>
