'use server';

import { redirect } from 'next/navigation';
import { createId } from '@paralleldrive/cuid2';
import { parseWithZod } from '@conform-to/zod';
import slugify from 'slugify';
import { cookies } from 'next/headers';

import { db } from '@/lib/db/client';
import { events } from '@/lib/db/schema';
import { InsertEventSchema } from '@/lib/schemas';
import { revalidatePath } from 'next/cache';

export async function createEventRecord(prevState: unknown, formData: FormData) {
	const submission = parseWithZod(formData, { schema: InsertEventSchema });

	if (submission.status !== 'success') {
		return submission.reply();
	}

	// TODO: Handle errors
	const insertEventResult = await db
		.insert(events)
		.values({
			...submission.value,
			id: createId(),
			slug: slugify(submission.value.name, { lower: true }),
			date: submission.value.date.toISOString()
		})
		.returning({ insertedId: events.id });

	if (insertEventResult.length === 0) {
		return submission.reply({
			formErrors: ['Failed to save the event. Please try again later.']
		});
	}

	// Set a success cookie to show a success message on the next page
	cookies().set('eventCreated', 'true', { maxAge: 60 * 5 }); // 5 minutes

	revalidatePath('/events'); // Revalidate the events list page
	return redirect('/events/' + insertEventResult?.at(0)?.insertedId);
}
