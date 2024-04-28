import { createId } from '@paralleldrive/cuid2';
import slugify from 'slugify';
import { z } from 'zod';

import { db } from '$lib/db/index.server';
import { events } from '$lib/db/schema';
import type { InsertEventSchema } from '$lib/schemas';

export async function createOneEvent(data: z.infer<typeof InsertEventSchema>) {
	const result = await db
		.insert(events)
		.values({
			...data,
			id: createId(),
			slug: slugify(data.name, { lower: true })
		})
		.returning({ insertedId: events.id });

	return result?.at(0)?.insertedId ?? null;
}
