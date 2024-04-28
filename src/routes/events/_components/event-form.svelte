<script lang="ts">
	import { browser } from '$app/environment';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import SuperDebug, {
		type SuperValidated,
		type Infer,
		superForm,
		fileProxy
	} from 'sveltekit-superforms';

	import * as Form from '$lib/components/ui/form';
	import * as Select from '$lib/components/ui/select';
	import { Input } from '$lib/components/ui/input';
	import { Textarea } from '$lib/components/ui/textarea';
	import { InsertEventSchema, type InsertEvent } from '$lib/schemas';
	import type { State } from '$lib/schemas';
	import DatePicker from '$lib/components/ui/date-picker.svelte';
	import { Loader2Icon } from 'lucide-svelte';

	export let states: Omit<State, 'abbreviation'>[];
	export let data: SuperValidated<Infer<InsertEvent>>;
	let imagePreview: string | null = null;

	const form = superForm(data, {
		validators: zodClient(InsertEventSchema),
		onUpdate: (data) => {
			console.log('🚀 ~ data:', data);
		}
	});

	const { form: formData, enhance, delayed, errors, submitting } = form;

	$: selectedState = $formData.state && {
		label: $formData.state,
		value: $formData.state
	};

	function handleFileUpload(e: Event) {
		const target = e.target as HTMLInputElement;
		const file = target.files?.[0];

		if (!file) return;

		const reader = new FileReader();
		reader.onloadend = (e) => {
			imagePreview = e.target?.result as string;
		};

		reader.readAsDataURL(file);
	}

	const file = fileProxy(formData, 'image');
</script>

<form
	method="POST"
	action="?/create"
	class="flex flex-col gap-8 lg:flex-row"
	enctype="multipart/form-data"
	use:enhance
>
	<div class="space-y-3 lg:w-3/5">
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
					<DatePicker bind:date={$formData.date} />
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
				Save Event
			{/if}
		</Form.Button>
	</div>

	<div class="lg:w-2/5">
		<div class="flex h-[300px] w-full bg-gray-500">
			{#if imagePreview}
				<img src={imagePreview} alt="Event cover" class="h-full w-full object-cover" />
			{:else}
				<div class="flex h-full w-full items-center justify-center">
					<p class="text-white">No Image Selected</p>
				</div>
			{/if}
		</div>

		<input
			type="file"
			accept="image/*"
			name="image"
			class="hover:file:bg-primary-700 file:bg-primary mt-6 block w-full border p-2 text-sm file:mr-4 file:cursor-pointer file:border-0 file:px-4 file:text-sm file:font-semibold file:text-white focus:outline-none"
			bind:files={$file}
			on:change={handleFileUpload}
		/>
		{#if $errors.image}
			<small class="italic text-red-500">{$errors.image}</small>
		{/if}
	</div>
</form>

<div class="mt-6">
	{#if browser}
		<SuperDebug data={$formData} />
	{/if}
</div>
