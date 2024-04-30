import { createId } from '@paralleldrive/cuid2';
import slugify from 'slugify';

import { getTursoClient } from './get-client';
import { events } from '../src/lib/server/db/schema';
import eventsData from '../data/events.json';
import performersData from '../data/performers.json';

async function main() {
	try {
		const { db } = getTursoClient();

		console.log('=> Seeding events...');

		// for the performers, the database expects a string comma separated list of performers names
		// e.g. "performer1, performer2, performer3"
		// so we need to map the performers data to the expected format and pick a random number of performers
		// between 1 and 3
		const performers = performersData.map((performer) => performer.name);
		const result = await db
			.insert(events)
			.values(
				eventsData.map((event) => ({
					id: createId(),
					name: event.name,
					slug: slugify(event.name, { lower: true }),
					venue: event.venue,
					date: event.date,
					time: event.time,
					state: event.state,
					city: event.city,
					street: event.street,
					zip: event.zip_code,
					description: event.description,
					performers: performers.slice(0, Math.floor(Math.random() * 3) + 1).join(', ')
				}))
			)
			.returning({ insertedId: events.id, name: events.name });

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
