import { json, type RequestHandler } from '@sveltejs/kit';
import { DeleteObjectCommand } from '@aws-sdk/client-s3';
import { z } from 'zod';

import { s3 } from '$lib/s3.server';
import { R2_BUCKET_NAME } from '$env/static/private';

const RequestBodySchema = z.object({
	objectKey: z.string()
});

export const DELETE: RequestHandler = async ({ request }) => {
	const body = await request.json();
	const result = RequestBodySchema.safeParse(body);

	if (!result.success) {
		console.error('=> 💥 Missing required parameters.', result.error);
		return json({ success: false, message: 'Missing required parameters.' }, { status: 400 });
	}

	try {
		const command = new DeleteObjectCommand({
			Bucket: R2_BUCKET_NAME,
			Key: result.data.objectKey
		});

		await s3.send(command);
		return json({ success: true, message: 'File Deleted' });
	} catch (err: unknown) {
		console.error('=> 💥 Error deleting object from S3.', err);
		return json({ success: false, message: 'Error deleting object from S3.' }, { status: 500 });
	}
};
