import { fail, superValidate } from 'sveltekit-superforms';
import type { Actions, PageServerLoad } from './$types';
import { zod } from 'sveltekit-superforms/adapters';
import { redirect } from 'sveltekit-flash-message/server';

import { db } from '$lib/db/index.server';
import { InsertEventSchema } from '$lib/schemas';
import { getEventCoverImage } from '$lib/utils';
import { STORAGE_BASE_URL } from '$env/static/private';
import { uploadFileToR2 } from '$lib/s3.server';
import { events } from '$lib/db/schema';

export const load: PageServerLoad = async ({ params }) => {
	const eventData = await db.query.events.findFirst({
		where: (events, { eq }) => eq(events.id, params.id)
	});

	const states = await db.query.states.findMany({
		columns: { abbreviation: false }
	});

	const imageUrl = getEventCoverImage(eventData?.cover ?? '', STORAGE_BASE_URL);
	const event = {
		...eventData,
		imageUrl
	};

	return {
		states,
		form: await superValidate(event, zod(InsertEventSchema))
	};
};

export const actions: Actions = {
	default: async ({ request, cookies }) => {
		const form = await superValidate(request, zod(InsertEventSchema));
		let eventId: string | null = null;

		if (!form.valid) return fail(400, { form });

		try {
			let objectKey = form.data.cover ?? null;
			if (form.data.image) {
				objectKey = await uploadFileToR2(form.data.image);
				if (!objectKey) throw new Error('Failed to upload the image');
			}

			const result = await db
				.update(events)
				.set({
					...form.data,
					cover: objectKey
				})
				.returning({ eventId: events.id });

			eventId = result?.at(0)?.eventId ?? null;
		} catch (err: unknown) {
			console.error('=> 💥 There was an error creating the event record: ', err);
			return fail(500, { form });
		}

		const redirectUrl = `/events/${eventId}`;
		redirect(303, redirectUrl, { type: 'success', message: 'Event updated' }, cookies);
	}
};
