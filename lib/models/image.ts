import { createId } from '@paralleldrive/cuid2';
import slugify from 'slugify';

import { db } from '@/lib/db/client';
import { eventImages } from '@/lib/db/schema';
import { InsertImage } from '@/lib/schemas';

export const saveImageRecord = async (data: InsertImage) => {
	await db.insert(eventImages).values({
		id: createId(),
		eventId: data?.eventId,
		objectKey: data?.objectKey,
		caption: '', // TODO: Add caption
		filename: data?.filename as string,
		mimetype: data?.mimetype ?? 'image/jpeg',
		size: data?.size ?? 0
	});
};
