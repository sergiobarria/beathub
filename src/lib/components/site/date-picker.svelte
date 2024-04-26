<script lang="ts">
	import { CalendarIcon } from 'lucide-svelte';
	import { type DateValue, DateFormatter, getLocalTimeZone } from '@internationalized/date';

	import { Button } from '$lib/components/ui/button';
	import { Calendar } from '$lib/components/ui/calendar';
	import * as Popover from '$lib/components/ui/popover';
	import { cn } from '$lib/utils';

	let value: DateValue | undefined;
	export let onChange: (date: string) => void;

	const df = new DateFormatter('en-US', {
		dateStyle: 'long'
	});

	function handleDateChange(v: DateValue | undefined) {
		if (v) onChange(v.toString());
		else onChange('');
	}
</script>

<Popover.Root openFocus>
	<Popover.Trigger asChild let:builder>
		<Button
			variant="outline"
			class={cn(
				'w-[280px] justify-start text-left font-normal',
				!value && 'text-muted-foreground'
			)}
			builders={[builder]}
		>
			<CalendarIcon class="mr-2 size-4" />
			{value ? df.format(value?.toDate(getLocalTimeZone())) : 'Select a Date'}
		</Button>
	</Popover.Trigger>

	<Popover.Content class="w-auto p-0">
		<Calendar bind:value initialFocus onValueChange={handleDateChange} />
	</Popover.Content>
</Popover.Root>
