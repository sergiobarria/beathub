import { Metadata } from 'next';
import { cookies } from 'next/headers';

import { getEventById } from '@/lib/models/event';

type PageProps = {
	params: {
		id: string;
	};
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
	const event = await getEventById(params.id);

	return {
		title: event?.name || 'Event Details',
		description: event?.description || 'Event details on BeatHub'
	};
}

export default async function EventDetailsPage({ params }: PageProps) {
	const event = await getEventById(params.id);
	const success = cookies().get('eventCreated');

	return (
		<main className="flex-1 py-12">
			<div>
				<h1>Event Details Page: Event - {params.id}</h1>
				{success && <p className="font-semibold text-green-400">New Event Created!</p>}
			</div>
			<pre>{JSON.stringify(event, null, 2)}</pre>
		</main>
	);
}
