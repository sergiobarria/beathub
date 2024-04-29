import { db } from '$lib/db/index.server';
import type { PageServerLoad } from './$types';

import { STORAGE_BASE_URL } from '$env/static/private';
import { getEventCoverImage } from '$lib/utils';

export const load: PageServerLoad = async () => {
	const eventsData = await db.query.events.findMany({
		columns: {
			id: true,
			name: true,
			date: true,
			venue: true,
			performers: true,
			cover: true
		},
		orderBy: (events, { desc }) => [desc(events.date)],
		limit: 3
	});

	const events = eventsData.map((event) => ({
		...event,
		cover: getEventCoverImage(event?.cover ?? '', STORAGE_BASE_URL)
	}));

	return { events };
};
