import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { createId } from '@paralleldrive/cuid2';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

import { env } from './env';

export const s3 = new S3Client({
	region: 'auto',
	endpoint: `https://${env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
	credentials: {
		accessKeyId: env.R2_ACCESS_KEY_ID,
		secretAccessKey: env.R2_SECRET_ACCESS_KEY
	}
});

export async function getS3SignedUrl(file: File | undefined) {
	if (!file) return;

	const fileName = file.name?.split('.').slice(0, -1).join('.');
	const objectKey = `${fileName}_${createId()}`;

	const command = new PutObjectCommand({
		Bucket: env.R2_BUCKET_NAME,
		Key: objectKey,
		ContentType: file?.type,
		ACL: 'public-read'
	});

	const presignedUrl = await getSignedUrl(s3, command, { expiresIn: 60 * 5 });

	return { objectKey, url: presignedUrl };
}

export async function uploadFileToR2(file: File) {
	try {
		const result = await getS3SignedUrl(file);

		if (!result) throw new Error('Failed to get the presigned URL.');
		const { objectKey, url } = result;

		const uploadResponse = await fetch(url, {
			method: 'PUT',
			body: file
		});

		if (!uploadResponse.ok) throw new Error('Failed to upload the image.');

		return objectKey;
	} catch (err: unknown) {
		console.error('=> Error uploading file to R2:', err);
		return null;
	}
}
