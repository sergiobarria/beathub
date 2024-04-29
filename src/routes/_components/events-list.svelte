<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { formatDate } from '$lib/utils';

	export let events: {
		date: string;
		id: string;
		name: string;
		venue: string;
		cover: string;
		performers: string;
	}[];
</script>

<ul class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
	{#each events as event}
		<li class="flex flex-col">
			<div class="group relative aspect-square overflow-hidden">
				<img
					src={event.cover}
					alt="cover"
					sizes="(min-width: 640px) 50vw, 100vw"
					class="transform object-cover transition-transform duration-300 ease-in-out hover:scale-110"
				/>

				<!-- Hidden overlay -->
				<div
					class="absolute bottom-0 z-10 w-full transform bg-gradient-to-t from-black/70 via-black/50 to-transparent p-4 opacity-0 transition-all duration-500 ease-in-out group-hover:opacity-100"
				>
					<h3 class="text-lg font-semibold text-white">{event.name}</h3>
					<div class="flex items-baseline justify-between">
						<Button href={`/events/${event.id}`} size="sm">View Details</Button>
						<span class="text-sm">{formatDate(event.date)}</span>
					</div>
				</div>
			</div>
			<h3>{event.name}</h3>
			<p>Performers: {event.performers}</p>
		</li>
	{/each}
</ul>
