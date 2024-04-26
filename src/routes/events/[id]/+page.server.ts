import { db } from '$lib/db/db.server';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const eventId = params.id;

	const event = await db.query.events.findFirst({
		where: (events, { eq }) => eq(events.id, eventId)
	});

	if (!event) error(404, 'Event not found');

	return { event };
};
