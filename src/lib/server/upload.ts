import { createUploadthing } from 'uploadthing/server';
import type { FileRouter } from 'uploadthing/server';

const f = createUploadthing();

// const auth = (req: Request) => ({ id: 'user123' }); // Fake auth function

export const fileRouter = {
	imageUploader: f({ image: { maxFileSize: '4MB' } })
		.middleware(async () => {
			// .middleware(async ({ req }) => {
			// const user = await auth(req);

			// if (!user) throw new Error('Unauthorized');

			return { userId: 'user123' };
		})
		.onUploadComplete(async ({ metadata, file }) => {
			console.log('Upload complete for userId:', metadata.userId);

			console.log('file url', file.url);
		})
} satisfies FileRouter;

export type AppFileRouter = typeof fileRouter;
