import { fail, type Actions } from '@sveltejs/kit';

import { db } from '$lib/server/db';
import { lucia } from '$lib/server/auth';
import type { PageServerLoad } from './$types';
import { redirect } from 'sveltekit-flash-message/server';

export const load: PageServerLoad = async () => {
	const events = await db.query.events.findMany({
		columns: {
			id: true,
			name: true,
			date: true,
			venue: true,
			performers: true,
			slug: true,
			cover: true
		},
		orderBy: (events, { desc }) => [desc(events.date)],
		limit: 3
	});

	return { events };
};

export const actions: Actions = {
	singOut: async (event) => {
		if (!event.locals.session) {
			return fail(401);
		}

		await lucia.invalidateSession(event.locals.session.id);

		const sessionCookie = lucia.createBlankSessionCookie();
		event.cookies.set(sessionCookie.name, sessionCookie.value, {
			path: '.',
			...sessionCookie.attributes
		});

		redirect(302, '/', { type: 'success', message: 'You have been signed out.' }, event.cookies);
	}
};
