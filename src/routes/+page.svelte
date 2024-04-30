<script lang="ts">
	import { fade, fly } from 'svelte/transition';
	import type { PageData } from './$types';

	import { Button } from '$lib/components/ui/button';
	import EventsList from './_components/events-list.svelte';
	import heroImg from '$lib/assets/images/hero.webp';

	export let data: PageData;
</script>

<svelte:head>
	<title>Home | DJ Block</title>
</svelte:head>

<main class="mb-12">
	<section id="hero" class="relative">
		<img
			src={heroImg}
			alt="DJ Block"
			width={1920}
			height={1080}
			class="h-[80vh] w-full object-cover"
			in:fade={{ duration: 800 }}
		/>
		<div class="absolute inset-0 bg-black/50" in:fade={{ duration: 800 }} />

		<!-- Hero Content -->
		<div class="absolute inset-0 flex items-center justify-center" in:fade={{ duration: 1000 }}>
			<div class="mx-6 bg-black/40 p-4 text-center lg:p-8">
				<h1
					class="text-balance text-2xl font-bold leading-10 tracking-widest text-white md:text-6xl"
				>
					Turn Up the Beat: Discover & Share DJ Events
				</h1>
				<p class="my-8 text-white md:text-xl lg:px-10">
					Join the beat! Discover upcoming DJ events or promote your own. Connect, dance, and create
					unforgettable nights with our music community.
				</p>
				<Button href="/events" class="font-semibold">View Events</Button>
			</div>
		</div>
	</section>

	<!-- SECTION: Upcoming events -->
	<section id="upcoming-events">
		<div class="relative flex items-center py-4">
			<div class="flex-grow border-t border-gray-400"></div>
			<h2
				class="mx-4 my-12 flex-shrink rounded-xl border-x border-gray-400 px-6 text-center text-3xl font-bold"
			>
				Upcoming Events
			</h2>
			<div class="flex-grow border-t border-gray-400"></div>
		</div>

		<!-- Upcoming events -->
		<EventsList events={data.events} />
	</section>
</main>
