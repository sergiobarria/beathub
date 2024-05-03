<script lang="ts">
	import { browser } from '$app/environment';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import SuperDebug, { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
	import { Loader2Icon, XIcon, UploadIcon } from 'lucide-svelte';
	import { toast } from 'svelte-sonner';
	import { UploadDropzone } from '@uploadthing/svelte';

	import * as Form from '$lib/components/ui/form';
	import * as Select from '$lib/components/ui/select';
	import { Input } from '$lib/components/ui/input';
	import { Textarea } from '$lib/components/ui/textarea';
	import { InsertEventSchema, type InsertEvent } from '$lib/schemas';
	import type { State } from '$lib/schemas';
	import DatePicker from '$lib/components/ui/date-picker.svelte';
	import { Button } from '$lib/components/ui/button';
	import { createUploader } from '$lib/upload';

	export let states: Omit<State, 'abbreviation'>[];
	export let data: SuperValidated<Infer<InsertEvent>>;
	let deletingImage = false;

	const form = superForm(data, {
		validators: zodClient(InsertEventSchema),
		onUpdate: (data) => {
			console.log('🚀 ~ data:', data);
		}
	});

	const { form: formData, enhance, delayed, submitting } = form;

	$: selectedState = $formData.state && {
		label: $formData.state,
		value: $formData.state
	};

	async function handleDeleteFile() {
		deletingImage = true;

		try {
			const response = await fetch('/api/uploadthing', {
				method: 'DELETE',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ url: $formData.cover })
			});

			if (!response.ok) throw new Error('Failed to delete image');

			$formData.cover = undefined;
			toast.success('Image deleted successfully');

			// TODO: prevent user from reloading the page without saving
		} catch (err: unknown) {
			console.error('=> Error deleting image:', err);
			toast.error('Failed to delete image');
		} finally {
			deletingImage = false;
		}
	}

	const uploader = createUploader('imageUploader', {
		onClientUploadComplete: (res) => {
			$formData.cover = res?.at(0)?.url;
		},
		onUploadError: (err) => {
			console.error('=> Error uploading image:', err);
			toast.error('Failed to upload image');
		}
	});
</script>

<form
	method="POST"
	class="mx-auto flex max-w-screen-xl flex-col gap-8 lg:flex-row"
	enctype="multipart/form-data"
	use:enhance
>
	<div class="space-y-3 lg:w-3/5">
		{#if $formData.id}
			<input type="hidden" name="id" value={$formData.id} />
		{/if}
		<Form.Field {form} name="name">
			<Form.Control let:attrs>
				<Form.Label>*Even Name</Form.Label>
				<Input {...attrs} bind:value={$formData.name} placeholder="e.g. DJ Block Party" />
			</Form.Control>
			<Form.Description>
				Enter the name of the event. This is the name that will be displayed on the event page.
			</Form.Description>
			<Form.FieldErrors />
		</Form.Field>

		<Form.Field {form} name="venue">
			<Form.Control let:attrs>
				<Form.Label>*Venue Name</Form.Label>
				<Input {...attrs} bind:value={$formData.venue} placeholder="Club XYZ" />
			</Form.Control>
			<Form.Description>Enter the name of the venue where the event will be held.</Form.Description>
			<Form.FieldErrors />
		</Form.Field>

		<Form.Field {form} name="performers">
			<Form.Control let:attrs>
				<Form.Label>*Performers</Form.Label>
				<Input {...attrs} bind:value={$formData.performers} placeholder="DJ Hype, DJ Frenzy" />
			</Form.Control>
			<Form.Description>
				Enter the names of the performers who will be performing at the event. Separate each
				performer with a comma.
			</Form.Description>
			<Form.FieldErrors />
		</Form.Field>

		<div class="flex flex-col gap-3 lg:flex-row">
			<Form.Field {form} name="date" class="w-full">
				<Form.Control let:attrs>
					<Form.Label>*Date</Form.Label>
					<div>
						<DatePicker bind:date={$formData.date} />
					</div>
					<input hidden bind:value={$formData.date} name={attrs.name} />
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>

			<Form.Field {form} name="time" class="w-full">
				<Form.Control let:attrs>
					<Form.Label>*Time</Form.Label>
					<Input {...attrs} bind:value={$formData.time} type="time" />
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>
		</div>

		<hr class="border-t border-gray-400" />
		<p class="text-lg font-bold">Event Detailed Location</p>

		<Form.Field {form} name="street">
			<Form.Control let:attrs>
				<Form.Label>*Street Address</Form.Label>
				<Input {...attrs} bind:value={$formData.street} placeholder="123 Main St." />
			</Form.Control>
			<Form.Description>
				Enter the street address of the venue where the event will be held.
			</Form.Description>
			<Form.FieldErrors />
		</Form.Field>

		<div class="flex flex-col gap-3 lg:flex-row">
			<Form.Field {form} name="state" class="w-full">
				<Form.Control let:attrs>
					<Form.Label>*State</Form.Label>
					<Select.Root
						selected={selectedState || undefined}
						onSelectedChange={(v) => v && ($formData.state = v.value)}
					>
						<Select.Trigger {...attrs}>
							<Select.Value placeholder="State" />
						</Select.Trigger>
						<Select.Content>
							{#each states as state (state.id)}
								<Select.Item value={state.name} label={state.name} />
							{/each}
						</Select.Content>
					</Select.Root>
					<input hidden bind:value={$formData.state} name={attrs.name} />
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>

			<Form.Field {form} name="city" class="w-full">
				<Form.Control let:attrs>
					<Form.Label>*City</Form.Label>
					<Input {...attrs} bind:value={$formData.city} placeholder="Miami" />
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>

			<Form.Field {form} name="zip" class="w-full">
				<Form.Control let:attrs>
					<Form.Label>*Zip Code</Form.Label>
					<Input {...attrs} bind:value={$formData.zip} placeholder="12345" />
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>
		</div>

		<Form.Field {form} name="description">
			<Form.Control let:attrs>
				<Form.Label>*Event Description</Form.Label>
				<Textarea
					{...attrs}
					bind:value={$formData.description}
					placeholder="This is a cool event that you should attend..."
					rows={5}
				/>
			</Form.Control>
			<Form.Description>Enter a short description of the event.</Form.Description>
			<Form.FieldErrors />
		</Form.Field>

		<Form.Button
			aria-disabled={$delayed || $submitting}
			disabled={$delayed || $submitting}
			class="px-10"
		>
			{#if $delayed || $submitting}
				<Loader2Icon class="size-4 animate-spin" />
			{:else}
				{$formData.id ? 'Update Event' : 'Create Event'}
			{/if}
		</Form.Button>
	</div>

	<div class="lg:w-2/5">
		{#if $formData.cover}
			<div class="relative flex h-[300px] w-full bg-gray-500">
				<img src={$formData.cover} alt="Event cover" class="h-full w-full object-cover" />
				<Button
					variant="outline"
					size="icon"
					class="absolute right-2 top-2 bg-destructive"
					disabled={deletingImage}
					aria-disabled={deletingImage}
					on:click={handleDeleteFile}
					title="Delete image"
				>
					{#if deletingImage}
						<Loader2Icon class="size-4 animate-spin" />
					{:else}
						<XIcon class="size-4" />
					{/if}
				</Button>
			</div>
		{:else}
			<UploadDropzone
				{uploader}
				class="h-[300px] border-dashed bg-gray-700/50 p-6 hover:cursor-pointer"
			>
				<UploadIcon slot="upload-icon" class="size-16" let:state />
				<Button size="sm" slot="button-content" let:state class="bg-primary">
					{state.isUploading ? `${state.uploadProgress}%` : 'Pick a file'}
				</Button>

				<span slot="label" let:state class="text-white">
					{state.ready ? 'Ready to upload' : 'Loading...'}
				</span>

				<div slot="allowed-content" let:state class="text-gray-300">
					You can choose between {state.fileTypes.join(', ')} files
					<p>(Max. File Size 4MB)</p>
				</div>
			</UploadDropzone>
		{/if}
		<input hidden bind:value={$formData.cover} name="cover" />
	</div>
</form>

<div class="mt-6">
	{#if browser}
		<SuperDebug data={$formData} />
	{/if}
</div>
