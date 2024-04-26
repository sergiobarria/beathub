import { type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { fail, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { createId } from '@paralleldrive/cuid2';
import slugify from 'slugify';
import { redirect } from 'sveltekit-flash-message/server';

import { InsertEventSchema } from '$lib/validations/event-schemas';
import { db } from '$lib/db/db.server';
import { events } from '$lib/db/schema';

export const load: PageServerLoad = async () => {
	const states = await db.query.states.findMany({
		columns: { abbreviation: false }
	});

	return {
		form: await superValidate(zod(InsertEventSchema)),
		states
	};
};

export const actions: Actions = {
	create: async (event) => {
		const form = await superValidate(event, zod(InsertEventSchema));
		if (!form.valid) return fail(400, { form });

		// Save the event to the database
		let result: { insertedId: string }[];

		try {
			result = await db
				.insert(events)
				.values({
					...form.data,
					id: createId(),
					slug: slugify(form.data.name)
				})
				.returning({ insertedId: events.id });

			if (result.length === 0) return fail(500, { form });
		} catch (err: unknown) {
			console.error('=> 💥 Error creating the event: ', err);
			return fail(500, { form });
		}

		const url = '/events/' + result[0].insertedId;
		redirect(303, url, { type: 'success', message: 'Event successfully created!' }, event);
	}
};
