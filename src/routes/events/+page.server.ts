import type { PageServerLoad } from './$types';

import { STORAGE_BASE_URL } from '$env/static/private';
import { db } from '$lib/db/index.server';
import { getEventCoverImage } from '$lib/utils';

export const load: PageServerLoad = async () => {
	const eventsData = await db.query.events.findMany({
		columns: {
			id: true,
			name: true,
			date: true,
			venue: true,
			performers: true
		},
		with: {
			images: {
				columns: {
					id: true,
					objectKey: true
				}
			}
		},
		orderBy: (events, { desc }) => [desc(events.date)]
	});

	const events = eventsData.map((event) => ({
		...event,
		cover: getEventCoverImage(event.images[0]?.objectKey, STORAGE_BASE_URL)
	}));

	return { events };
};
