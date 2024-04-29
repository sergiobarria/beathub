import type { PageServerLoad } from './$types';
import { error, fail, type Actions } from '@sveltejs/kit';
import { redirect } from 'sveltekit-flash-message/server';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';

import { db } from '$lib/db/index.server';
import { events } from '$lib/db/schema';
import { eq } from 'drizzle-orm';
import { DeleteEventSchema } from '$lib/schemas';

export const load: PageServerLoad = async ({ params }) => {
	const event = await db.query.events.findFirst({
		where: (events, { eq }) => eq(events.id, params.id),
		with: { images: true }
	});

	if (!event) error(404, 'Event not found');

	return {
		event,
		form: await superValidate(zod(DeleteEventSchema))
	};
};

export const actions: Actions = {
	delete: async ({ request, cookies }) => {
		const form = await superValidate(request, zod(DeleteEventSchema));

		if (!form.valid) fail(400, { form });

		try {
			await db.delete(events).where(eq(events.id, form.data.id));

			// TODO: Delete the images from the R2 bucket (they cascade for the DB) 👇
		} catch (err: unknown) {
			console.error('=> delete event error:', err);
			fail(500, { error: 'Failed to delete event' });
		}

		redirect('/events', { type: 'success', message: 'Event deleted' }, cookies);
	}
};
