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
	default: async ({ request, cookies }) => {
		const form = await superValidate(request, zod(InsertEventSchema));
		let eventSlug: string | null = null;

		if (!form.valid) return fail(400, { form });

		try {
			let objectKey: string | null = null;
			if (form.data.image) {
				objectKey = await uploadFileToR2(form.data.image);
				if (!objectKey) throw new Error('Failed to upload the image');
			}

			const result = await db
				.insert(events)
				.values({
					...form.data,
					id: createId(),
					slug: slugify(form.data.name, { lower: true }),
					cover: objectKey
				})
				.returning({ insertedSlug: events.slug });

			eventSlug = result?.at(0)?.insertedSlug ?? null;
			if (!eventSlug) throw new Error('Failed to create the event record');
		} catch (err: unknown) {
			console.error('=> 💥 There was an error creating the event record: ', err);
			return fail(500, { form });
		}

		const url = `/events/${eventSlug}`;
		redirect(303, url, { type: 'success', message: 'Event created successfully' }, cookies);
	}
};
