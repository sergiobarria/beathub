import { Metadata } from 'next';

import { EventForm } from '@/components/events/event-form';
import { getStates } from '@/lib/models/state';

export const metadata: Metadata = {
	title: 'New Event | DJ Block',
	description: 'Create a new event on BeatHub'
};

export default async function EventsAddPage() {
	const states = await getStates();

	return (
		<main className="my-12 flex-1">
			<h1 className="text-3xl font-bold tracking-wide">New Event Form</h1>
			<p>
				This is the new event form. It is a simple form that allows you to create a new
				event.
			</p>

			<hr className="my-4 border-gray-600" />

			<EventForm states={states} />
		</main>
	);
}
