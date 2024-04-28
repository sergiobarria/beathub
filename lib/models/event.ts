import { cache } from 'react';
import { createId } from '@paralleldrive/cuid2';
import slugify from 'slugify';

import { db } from '@/lib/db/client';
import { events } from '@/lib/db/schema';
import { InsertEvent } from '@/lib/schemas';

export const saveEvent = async (data: InsertEvent) => {
	const result = await db
		.insert(events)
		.values({
			...data,
			id: createId(),
			slug: slugify(data.name, { lower: true }),
			date: data.date.toISOString()
		})
		.returning({ insertedId: events.id });

	return result?.at(0)?.insertedId ?? null;
};

export const getEventById = cache(async (id: string) => {
	const result = await db.query.events.findFirst({
		where: (events, { eq }) => eq(events.id, id),
		with: { images: true }
	});

	return result;
});