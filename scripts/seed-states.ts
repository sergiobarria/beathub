import { createId } from '@paralleldrive/cuid2';

import { getTursoClient } from './get-client';
import { states } from '../lib/db/schema';
import statesData from '../data/states.json';

async function main() {
	try {
		const { db } = getTursoClient();

		console.log('=> Seeding states...');
		const result = await db
			.insert(states)
			.values(
				statesData.map((state) => ({
					id: createId(),
					name: state.name,
					abbreviation: state.abbreviation
				}))
			)
			.returning({ insertedId: states.id, name: states.name });

		for (const cabin of result) {
			console.log(`=> Inserted cabin: ${cabin.name} (ID: ${cabin.insertedId})`);
		}

		console.log('=> ✅ Seed complete!');
	} catch (err: unknown) {
		console.error('=> ❌ Seed failed:', err);
		process.exit(1);
	} finally {
		process.exit(0);
	}
}

main();
