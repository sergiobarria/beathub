import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';

import { db } from '$lib/db/index.server';

export const load: PageServerLoad = async ({ params }) => {
	const event = await db.query.events.findFirst({
		where: (events, { eq }) => eq(events.id, params.id),
		with: { images: true }
	});
	console.log('🚀 ~ constload:PageServerLoad= ~ event:', event);

	if (!event) error(404, 'Event not found');

	return { event };
};
