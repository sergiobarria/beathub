import type { PageServerLoad } from './$types';
import { fail, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';

import { db } from '$lib/db/index.server';
import { InsertEventSchema } from '$lib/schemas';
import type { Actions } from '@sveltejs/kit';
import { createOneEvent } from '$lib/models/event';
import { redirect } from 'sveltekit-flash-message/server';

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
		console.log('🚀 ~ create: ~ form:', form);

		if (!form.valid) return fail(400, { form });

		try {
			eventId = await createOneEvent(form.data);
			console.log('🚀 ~ create: ~ eventId:', eventId);
		} catch (err: unknown) {
			console.error('=> 💥 There was an error creating the event record: ', err);
			return fail(500, { form });
		}

		const url = `/events/${eventId}`;
		redirect(303, url, { type: 'success', message: 'Event created successfully' }, cookies);
	}
};
