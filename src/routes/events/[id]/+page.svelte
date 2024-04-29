<script lang="ts">
	import { page } from '$app/stores';
	import { getFlash } from 'sveltekit-flash-message';
	import type { PageData } from './$types';
	import { Loader2Icon, PencilIcon, TrashIcon } from 'lucide-svelte';
	import { Button } from '$lib/components/ui/button';
	import { superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { DeleteEventSchema } from '$lib/schemas';

	export let data: PageData;
	let isNewEvent = false;

	const flash = getFlash(page);

	const form = superForm(data.form, {
		validators: zodClient(DeleteEventSchema)
	});
	const { enhance, delayed, submitting } = form;

	$: if ($flash) {
		isNewEvent = true;
	}
</script>

<main class="flex-1 py-12">
	<div class="flex items-center justify-between">
		<div class="flex items-baseline gap-3">
			<h1 class="text-3xl font-bold tracking-wide">{data.event.name} -</h1>
			{#if !isNewEvent}
				<p class="animate-bounce font-semibold text-green-400">New Event Created!</p>
			{/if}
		</div>
		<div class="flex items-center gap-6">
			<Button href={`/events/${data.event.id}/edit`} variant="outline" class="min-w-28">
				<PencilIcon class="mr-2 size-4" />
				Edit
			</Button>

			<form method="POST" action="?/delete" use:enhance>
				<input type="hidden" name="id" value={data.event.id} />

				<Button
					type="submit"
					variant="destructive"
					class="min-w-28"
					aria-disabled={$delayed || $submitting}
					disabled={$delayed || $submitting}
					name="delete"
					on:click={(e) => !confirm('Are you sure?') && e.preventDefault()}
				>
					{#if $delayed || $submitting}
						<Loader2Icon class="size-4 animate-spin" />
					{:else}
						<TrashIcon class="mr-2 size-4" />
						Delete
					{/if}
				</Button>
			</form>
		</div>
	</div>
	<p>Event ID: {data.event.id}</p>

	<pre>{JSON.stringify(data.event, null, 2)}</pre>
</main>
