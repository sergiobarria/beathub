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
		where: (events, { eq }) => eq(events.slug, params.slug)
	});

	if (!event) error(404, 'Event not found');

	return {
		event,
		form: await superValidate(zod(DeleteEventSchema))
	};
};

export const actions: Actions = {
	delete: async ({ request, cookies, fetch }) => {
		const form = await superValidate(request, zod(DeleteEventSchema));

		if (!form.valid) fail(400, { form });

		try {
			const event = await db.query.events.findFirst({
				columns: { cover: true },
				where: (events, { eq }) => eq(events.id, form.data.id)
			});

			if (event?.cover) {
				// Delete the image from the UploadThing bucket if it exists
				const response = await fetch('/api/uploadthing', {
					method: 'DELETE',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({ url: event?.cover })
				});
				if (!response.ok) throw new Error('Failed to delete image from UploadThing');

				const data = await response.json();
				console.log('🚀 ~ delete: ~ data:', data);

				if (!data.success) throw new Error('Failed to delete image from UploadThing');
			}

			// If the image was deleted from the UploadThing bucket, delete the event from the DB
			await db.delete(events).where(eq(events.id, form.data.id));
		} catch (err: unknown) {
			console.error('=> delete event error:', err);
			fail(500, { error: 'Failed to delete event' });
		}

		redirect('/events', { type: 'success', message: 'Event deleted' }, cookies);
	}
};
