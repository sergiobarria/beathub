import { getTursoClient } from './get-client';
import { events } from '../src/lib/db/schema';

async function main() {
	try {
		const { db } = getTursoClient();

		await db.delete(events);

		console.log('=> Deleting all events records...');
		console.log('=> ✅ Delete complete!');
	} catch (err: unknown) {
		console.error('=> ❌ Delete failed:', err);
		process.exit(1);
	} finally {
		process.exit(0);
	}
}

main();
