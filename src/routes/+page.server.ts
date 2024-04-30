import { db } from '$lib/server/db';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const events = await db.query.events.findMany({
		columns: {
			id: true,
			name: true,
			date: true,
			venue: true,
			performers: true,
			slug: true,
			cover: true
		},
		orderBy: (events, { desc }) => [desc(events.date)],
		limit: 3
	});

	return { events };
};
