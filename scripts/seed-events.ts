// import { createId } from '@paralleldrive/cuid2';
// import slugify from 'slugify';

// import { getTursoClient } from './get-client';
// import { events } from '../_old/src/lib/db/schema';
// import eventsData from '../data/events.json';

// async function main() {
// 	try {
// 		const { db } = getTursoClient();

// 		console.log('=> Seeding events...');
// 		const result = await db
// 			.insert(events)
// 			.values(
// 				eventsData.map((event) => ({
// 					id: createId(),
// 					name: event.name,
// 					slug: slugify(event.name, { lower: true }),
// 					venue: event.venue,
// 					date: new Date(event.date).toISOString(),
// 					time: event.time,
// 					state: event.state,
// 					city: event.city,
// 					street: event.street,
// 					zip: event.zip_code,
// 					description: event.description
// 				}))
// 			)
// 			.returning({ insertedId: events.id, name: events.name });

// 		for (const cabin of result) {
// 			console.log(`=> Inserted cabin: ${cabin.name} (ID: ${cabin.insertedId})`);
// 		}

// 		console.log('=> ✅ Seed complete!');
// 	} catch (err: unknown) {
// 		console.error('=> ❌ Seed failed:', err);
// 		process.exit(1);
// 	} finally {
// 		process.exit(0);
// 	}
// }

// main();
