<script lang="ts">
	// import type { PageData } from './$types';

	import { Button } from '$lib/components/ui/button';
	import { heroImage } from '$lib/assets';

	// export let data: PageData;
</script>

<svelte:head>
	<title>Home | DJ Block</title>
</svelte:head>

<section id="hero" class="relative">
	<img src={heroImage} alt="DJ Block" class="h-[80vh] w-full object-cover" />
	<div class="absolute inset-0 bg-black/50" />

	<!-- Hero Content -->
	<div class="absolute inset-0 flex items-center justify-center">
		<div class="mx-6 bg-black/60 p-8 text-center">
			<h1
				class="text-balance text-4xl font-bold leading-10 tracking-widest text-white md:text-6xl"
			>
				Turn Up the Beat: Discover & Share DJ Events
			</h1>
			<p class="my-8 px-10 text-lg text-white md:text-xl">
				Join the beat! Discover upcoming DJ events or promote your own. Connect, dance, and
				create unforgettable nights with our music community.
			</p>
			<Button href="/events" class="font-semibold">View Events</Button>
		</div>
	</div>
</section>

<!-- SECTION: Featured Events -->
<section>
	<h2 class="my-12 text-center text-3xl font-bold">Featured Events</h2>
</section>
