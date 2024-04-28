import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';

import { TURSO_DATABASE_TOKEN, TURSO_DATABASE_URL } from '$env/static/private';
import * as schema from './schema';

const client = createClient({
	authToken: TURSO_DATABASE_TOKEN,
	url: TURSO_DATABASE_URL
});

export const db = drizzle(client, { schema });
