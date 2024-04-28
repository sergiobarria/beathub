<script lang="ts">
	import { CalendarIcon } from 'lucide-svelte';
	import {
		DateFormatter,
		type DateValue,
		getLocalTimeZone,
		today,
		parseDate
	} from '@internationalized/date';

	import { cn } from '$lib/utils';
	import { buttonVariants } from '$lib/components/ui/button';
	import { Calendar } from '$lib/components/ui/calendar';
	import * as Popover from '$lib/components/ui/popover';

	export let date: string | undefined;
	let value: DateValue | undefined;

	const df = new DateFormatter('en-US', {
		dateStyle: 'long'
	});

	$: value = date ? parseDate(date) : undefined;
</script>

<Popover.Root>
	<Popover.Trigger
		class={cn(
			buttonVariants({ variant: 'outline' }),
			'w-[280px] justify-start pl-4 text-left font-normal',
			!value && 'text-muted-foreground'
		)}
	>
		{value ? df.format(value.toDate(getLocalTimeZone())) : 'Pick a date'}
		<CalendarIcon class="ml-auto h-4 w-4 opacity-50" />
	</Popover.Trigger>
	<Popover.Content class="w-auto p-0" side="top">
		<Calendar
			{value}
			minValue={today(getLocalTimeZone())}
			calendarLabel="Date of birth"
			initialFocus
			onValueChange={(v) => {
				if (v) date = v.toString();
				else date = parseDate(today(getLocalTimeZone()).toString()).toString();
			}}
		/>
	</Popover.Content>
</Popover.Root>
