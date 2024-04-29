import type { Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { fail, superValidate } from 'sveltekit-superforms';
import { redirect } from 'sveltekit-flash-message/server';
import { zod } from 'sveltekit-superforms/adapters';
import { createId } from '@paralleldrive/cuid2';
import slugify from 'slugify';

import { db } from '$lib/db/index.server';
import { InsertEventSchema } from '$lib/schemas';
import { uploadFileToR2 } from '$lib/s3.server';
import { events } from '$lib/db/schema';

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
		let objectKey: string | null = null;

		if (!form.valid) return fail(400, { form });

		try {
			if (form.data.image) {
				objectKey = await uploadFileToR2(form.data.image);
				if (!objectKey) throw new Error('Failed to upload the image');
			}

			const result = await db
				.insert(events)
				.values({
					...form.data,
					id: createId(),
					slug: slugify(form.data.name, { lower: true })
				})
				.returning({ insertedId: events.id });

			eventId = result?.at(0)?.insertedId ?? null;
			if (!eventId) throw new Error('Failed to create the event record');
		} catch (err: unknown) {
			console.error('=> 💥 There was an error creating the event record: ', err);
			return fail(500, { form });
		}

		const url = `/events/${eventId}`;
		redirect(303, url, { type: 'success', message: 'Event created successfully' }, cookies);
	}
};
