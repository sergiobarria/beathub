import { cache } from 'react';

import { db } from '@/lib/db/client';

export const getStates = cache(async () => {
	const result = await db.query.states.findMany({
		columns: { abbreviation: false }
	});

	return result;
});
