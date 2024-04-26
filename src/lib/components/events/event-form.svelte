<script lang="ts">
	import { browser } from '$app/environment';
	import SuperDebug, { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';

	import * as Form from '$lib/components/ui/form';
	import * as Select from '$lib/components/ui/select';
	import { Input } from '$lib/components/ui/input';
	import { Textarea } from '$lib/components/ui/textarea';
	import { InsertEventSchema, type InsertEvent } from '$lib/validations/event-schemas';
	import DatePicker from '$lib/components/site/date-picker.svelte';
	import { Loader2Icon } from 'lucide-svelte';

	export let data: SuperValidated<Infer<InsertEvent>>;
	export let states: { id: string; name: string }[];

	const form = superForm(data, {
		validators: zodClient(InsertEventSchema)
	});

	$: selectedState = {
		value: $formData.state,
		label: $formData.state
	};

	const { form: formData, enhance, delayed, submitting } = form;
</script>

<div class="flex flex-col gap-6 lg:flex-row">
	<form method="POST" action="?/create" class="flex-1 space-y-4 lg:w-3/5" use:enhance>
		<Form.Field {form} name="name">
			<Form.Control let:attrs>
				<Form.Label>*Event Name</Form.Label>
				<Input {...attrs} bind:value={$formData.name} placeholder="Club Social Night" />
			</Form.Control>
			<Form.Description>Enter the name of the event.</Form.Description>
			<Form.FieldErrors />
		</Form.Field>

		<Form.Field {form} name="venue">
			<Form.Control let:attrs>
				<Form.Label>*Venue Name</Form.Label>
				<Input
					{...attrs}
					bind:value={$formData.venue}
					placeholder="Club Social Night Venue"
				/>
			</Form.Control>
			<Form.Description>
				Enter the name of the venue where the event will be held.
			</Form.Description>
			<Form.FieldErrors />
		</Form.Field>

		<div class="flex flex-col gap-3 lg:flex-row">
			<Form.Field {form} name="date" class="w-full">
				<Form.Control let:attrs>
					<Form.Label>*Event Date</Form.Label>
					<DatePicker onChange={(v) => ($formData.date = v)} />
					<Form.Description>Enter the date of the event.</Form.Description>
					<Form.FieldErrors />
				</Form.Control>
			</Form.Field>

			<Form.Field {form} name="time" class="w-full">
				<Form.Control let:attrs>
					<Form.Label>*Event Time</Form.Label>
					<Input {...attrs} bind:value={$formData.time} type="time" />
				</Form.Control>
				<Form.Description>Enter the time of the event, e.g., 6:00 PM.</Form.Description>
				<Form.FieldErrors />
			</Form.Field>
		</div>

		<hr class="border-t border-gray-400" />

		<p class="text-lg font-bold">Event Detailed Location</p>

		<Form.Field {form} name="street">
			<Form.Control let:attrs>
				<Form.Label>*Address</Form.Label>
				<Input
					{...attrs}
					bind:value={$formData.street}
					placeholder="1234 Club Social Night Street, Apt 1234"
				/>
			</Form.Control>
			<Form.Description>
				Enter the street address where the event will be held.
			</Form.Description>
			<Form.FieldErrors />
		</Form.Field>

		<div class="flex flex-col gap-3 lg:flex-row">
			<Form.Field {form} name="state" class="w-full">
				<Form.Control let:attrs>
					<Form.Label>*State</Form.Label>
					<Select.Root
						selected={selectedState}
						onSelectedChange={(v) => ($formData.state = v?.value ?? '')}
					>
						<Select.Trigger {...attrs}>
							<Select.Value placeholder="Select Event State" />
						</Select.Trigger>
						<Select.Content class="max-h-72 overflow-y-auto">
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
					<Input {...attrs} bind:value={$formData.city} placeholder="City Name" />
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
					rows={5}
					placeholder="This is a social night event for the club members..."
				/>
			</Form.Control>
			<Form.Description>Add a description of the event.</Form.Description>
			<Form.FieldErrors />
		</Form.Field>

		<Form.Button disabled={$delayed || $submitting}>
			{#if $delayed || $submitting}
				<Loader2Icon size={20} class="mx-8 animate-spin" />
			{:else}
				Save
			{/if}
		</Form.Button>
	</form>
	<div class="h-auto max-h-[300px] bg-gray-500 lg:w-2/5">image</div>
</div>

{#if browser}
	<div class="mt-6">
		<SuperDebug data={$formData} />
	</div>
{/if}
