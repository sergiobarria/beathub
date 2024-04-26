import type { PageServerLoad } from './$types';
import { API_BASE_URL } from '$env/static/private';

import type { APIListResponse, Event } from '$lib/types/payload';

export const load: PageServerLoad = async ({ fetch }) => {
	try {
		const response = await fetch(API_BASE_URL + '/api/events/');

		if (!response.ok) throw new Error(response.statusText);

		const data: APIListResponse<Event> = await response.json();
		return { events: data.docs };
	} catch (err: unknown) {
		console.error('=> 💥 Error fetching Events list', err);

		return { events: [] };
	}
};
