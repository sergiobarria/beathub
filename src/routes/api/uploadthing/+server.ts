import { createRouteHandler, UTApi } from 'uploadthing/server';

import { fileRouter } from '$lib/server/upload';
import { env } from '$env/dynamic/private';
import { json, type RequestHandler } from '@sveltejs/kit';
import { z } from 'zod';

const { GET, POST } = createRouteHandler({
	router: fileRouter,
	config: {
		uploadthingSecret: env.UPLOADTHING_SECRET
	}
});

const DeleteRequestSchema = z.object({
	url: z.string().url()
});

export const DELETE: RequestHandler = async ({ request }) => {
	const body = await request.json();
	const result = DeleteRequestSchema.safeParse(body);

	if (!result.success) {
		console.error('=> 💥 Missing required parameters.', result.error);
		return json({ success: false, message: 'Missing required parameters.' }, { status: 400 });
	}

	const { url } = result.data;
	const utapi = new UTApi();

	try {
		const objectKey = url.split('/').pop() as string;
		const result = await utapi.deleteFiles([objectKey]);

		if (!result.success) throw new Error('Failed to delete file');

		return json({ success: true, message: 'File Deleted' });
	} catch (err: unknown) {
		console.error('=> 💥 Error deleting object from UploadThing.', err);
		return json(
			{ success: false, message: 'Error deleting object from UploadThing.' },
			{ status: 500 }
		);
	}
};

export { GET, POST };
