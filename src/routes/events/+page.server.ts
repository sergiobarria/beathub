import type { PageServerLoad } from './$types';

import { STORAGE_BASE_URL } from '$env/static/private';
import { db } from '$lib/db/index.server';
import { getEventCoverImage } from '$lib/utils';

export const load: PageServerLoad = async ({ url }) => {
	const term = url.searchParams.get('q') ?? '';

	let eventsData = await db.query.events.findMany({
		columns: {
			id: true,
			name: true,
			date: true,
			venue: true,
			performers: true,
			cover: true
		},
		where: (events, { or, like }) =>
			or(
				like(events.name, `%${term}%`),
				like(events.venue, `%${term}%`),
				like(events.performers, `%${term}%`)
			)
	});

	// NOTE: The following code is equivalent to the above query but, using the regular Drizzle query syntax
	// let eventsData = await db
	// 	.select({
	// 		id: events.id,
	// 		name: events.name,
	// 		date: events.date,
	// 		venue: events.venue,
	// 		performers: events.performers,
	// 		cover: events.cover
	// 	})
	// 	.from(events)
	// 	.where(
	// 		term
	// 			? or(
	// 					like(events.name, `%${term}%`),
	// 					like(events.venue, `%${term}%`),
	// 					like(events.performers, `%${term}%`)
	// 				)
	// 			: undefined
	// 	)
	// 	.orderBy(desc(events.date), desc(events.name));

	eventsData = eventsData.map((event) => ({
		...event,
		cover: getEventCoverImage(event.cover ?? '', STORAGE_BASE_URL)
	}));

	return { events: eventsData };
};
