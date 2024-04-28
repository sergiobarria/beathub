import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';

import * as schema from './schema';
import { env } from '@/lib/env';

const client = createClient({
	authToken: env.TURSO_DATABASE_TOKEN,
	url: env.TURSO_DATABASE_URL
});

export const db = drizzle(client, { schema });
