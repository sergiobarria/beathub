import type { Actions } from '@sveltejs/kit';
import { fail, superValidate } from 'sveltekit-superforms';
import { redirect } from 'sveltekit-flash-message/server';
import { zod } from 'sveltekit-superforms/adapters';
import { createId } from '@paralleldrive/cuid2';
import type { PageServerLoad } from './$types';

import { db } from '$lib/db/index.server';
import { InsertEventSchema } from '$lib/schemas';
import { createOneEvent } from '$lib/models/event';
import { uploadFileToR2 } from '$lib/s3.server';
import { eventImages, events } from '$lib/db/schema';
import { eq } from 'drizzle-orm';

export const load: PageServerLoad = async () => {
	const states = await db.query.states.findMany({
		columns: { abbreviation: false }
	});

	return {
		states,
		form: await superValidate(zod(InsertEventSchema))
	};
};

export const actions: Actions = {
	create: async ({ request, cookies }) => {
		const form = await superValidate(request, zod(InsertEventSchema));
		let eventId: string | null = null;

		if (!form.valid) return fail(400, { form });

		try {
			eventId = await createOneEvent(form.data);
			if (!eventId) throw new Error('Failed to create the event record');

			if (form.data.image) {
				const objectKey = await uploadFileToR2(form.data.image);
				if (!objectKey) throw new Error('Failed to upload the image');

				// save image record to database
				const result = await db
					.insert(eventImages)
					.values({
						id: createId(),
						objectKey,
						eventId,
						filename: form.data.image.name,
						mimetype: form.data.image.type ?? '',
						size: form.data.image.size ?? 0
					})
					.returning({ imageId: eventImages.id });

				if (!eventId || !objectKey || !result?.at(0)?.imageId) {
					// delete the event record if the image upload fails
					await db.delete(events).where(eq(events.id, eventId));
				}
			}
		} catch (err: unknown) {
			console.error('=> 💥 There was an error creating the event record: ', err);
			return fail(500, { form });
		}

		const url = `/events/${eventId}`;
		redirect(303, url, { type: 'success', message: 'Event created successfully' }, cookies);
	}
};
