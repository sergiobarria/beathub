import type { PageServerLoad } from './$types';

import { db } from '$lib/server/db';

export const load: PageServerLoad = async ({ url }) => {
	const term = url.searchParams.get('q') ?? '';

	const events = await db.query.events.findMany({
		columns: {
			id: true,
			name: true,
			slug: true,
			date: true,
			venue: true,
			performers: true,
			cover: true
		},
		where: (events, { or, like }) => {
			return or(
				like(events.name, `%${term}%`),
				like(events.venue, `%${term}%`),
				like(events.performers, `%${term}%`)
			);
		},
		orderBy: (events, { desc }) => [desc(events.createdAt), desc(events.name)]
	});

	// NOTE: The following code is equivalent to the above query but, using the regular Drizzle query syntax
	// let eventsData = await db
	// 	.select({
	// 		id: events.id,
	// 		name: events.name,
	// 		slug: events.slug,
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

	return { events };
};
