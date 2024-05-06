<script lang="ts">
	import { page } from '$app/stores';
	import type { PageData } from './$types';
	import { getFlash } from 'sveltekit-flash-message';
	import { Loader2Icon, PencilIcon, TrashIcon } from 'lucide-svelte';
	import { superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';

	import { Button } from '$lib/components/ui/button';
	import { DeleteEventSchema } from '$lib/schemas';
	import { formatDate } from '$lib/utils';

	export let data: PageData;

	const flash = getFlash(page);

	const form = superForm(data.form, {
		validators: zodClient(DeleteEventSchema)
	});
	const { enhance, delayed, submitting } = form;

	function formattedAddress() {
		const { street, city, zip, state } = data.event;

		return `${street}, ${city}, ${state} ${zip}`;
	}

	function formattedTime() {
		const [hours, minutes] = data.event.time.split(':');
		const suffix = Number(hours) < 12 ? 'AM' : 'PM';

		return `${hours}:${minutes} ${suffix}`;
	}
</script>

<svelte:head>
	<title>{data.event.name} - Event</title>
</svelte:head>

<main class="flex-1 py-12">
	<div class="flex items-center justify-between">
		<div class="flex items-baseline gap-3">
			<h1 class="text-3xl font-bold tracking-wide">{data.event.name}</h1>
			{#if $flash?.type === 'success'}
				<span> -</span>
				<p class="animate-bounce font-semibold text-green-400">{$flash.message}</p>
			{/if}
		</div>

		{#if data.user}
			<div class="flex items-center gap-6">
				<Button href={`/events/${data.event.slug}/edit`} variant="outline" class="min-w-28">
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
		{/if}
	</div>

	<div class="flex items-center gap-2">
		<h2>At {data.event.venue}</h2>
		<p>- {formatDate(data.event.date)}</p>
		<p>- {formattedTime()}</p>
	</div>

	<div>
		<img
			src={data.event.cover ?? 'https://via.placeholder.com/1280x720'}
			alt={data.event.name}
			class="mt-6 h-[500px] w-full object-cover object-bottom"
		/>
	</div>

	<div class="mt-6">
		<p class="text-lg font-semibold">Location</p>
		<p class="mt-2 text-muted-foreground">{formattedAddress()}</p>
	</div>

	<div class="mt-6">
		<p class="text-lg font-semibold">Performers</p>
		<p class="mt-2 text-muted-foreground">{data.event.performers}</p>
	</div>

	<div class="mt-6">
		<p class="text-lg font-semibold">Description</p>
		<article class="mt-2 text-muted-foreground">{data.event.description}</article>
	</div>
</main>
