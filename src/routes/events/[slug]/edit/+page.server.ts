import { fail, superValidate } from 'sveltekit-superforms';
import type { Actions, PageServerLoad } from './$types';
import { zod } from 'sveltekit-superforms/adapters';
import { redirect } from 'sveltekit-flash-message/server';

import { db } from '$lib/db/index.server';
import { InsertEventSchema } from '$lib/schemas';
import { events } from '$lib/db/schema';
import { eq } from 'drizzle-orm';

export const load: PageServerLoad = async ({ params }) => {
	const event = await db.query.events.findFirst({
		where: (events, { eq }) => eq(events.slug, params.slug)
	});

	const states = await db.query.states.findMany({
		columns: { abbreviation: false }
	});

	return {
		states,
		form: await superValidate(event, zod(InsertEventSchema))
	};
};

export const actions: Actions = {
	default: async ({ request, cookies }) => {
		const form = await superValidate(request, zod(InsertEventSchema));
		let eventSlug: string | null = null;

		if (!form.valid) return fail(400, { form });

		try {
			const result = await db
				.update(events)
				.set({ ...form.data })
				.where(eq(events.id, form.data.id as string))
				.returning({ eventSlug: events.slug });

			eventSlug = result?.at(0)?.eventSlug ?? null;
		} catch (err: unknown) {
			console.error('=> 💥 There was an error updating the event record: ', err);
			return fail(500, { form });
		}

		const redirectUrl = `/events/${eventSlug}`;
		redirect(303, redirectUrl, { type: 'success', message: 'Event updated' }, cookies);
	}
};
