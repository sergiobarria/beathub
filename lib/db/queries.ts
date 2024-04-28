import { cache } from 'react';

import { db } from './client';

export const getEventById = cache(async (id: string) => {
	const result = await db.query.events.findFirst({
		where: (events, { eq }) => eq(events.id, id)
	});

	return result;
});

export const getStates = cache(async () => {
	const result = await db.query.states.findMany({
		columns: { abbreviation: false }
	});

	return result;
});
