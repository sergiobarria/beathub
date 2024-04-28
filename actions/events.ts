'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { parseWithZod } from '@conform-to/zod';

import { InsertEventSchema } from '@/lib/schemas';
import { uploadFileToR2 } from '@/lib/s3';
import { saveEvent } from '@/lib/models/event';
import { saveImageRecord } from '@/lib/models/image';

export async function createEventRecord(prevState: unknown, formData: FormData) {
	const submission = parseWithZod(formData, { schema: InsertEventSchema });
	let newEventId: string | null;

	if (submission.status !== 'success') {
		return submission.reply();
	}

	try {
		// 1. Save the event to the database and get the inserted ID
		newEventId = await saveEvent(submission.value);
		if (!newEventId) throw new Error('Failed to save the event.');

		const objectKey = await uploadFileToR2(submission?.value?.image as File);
		if (!objectKey) throw new Error('Failed to upload the image.');

		// 2.3 Save the image objectKey to the event_images table
		await saveImageRecord({
			eventId: newEventId,
			objectKey,
			filename: submission?.value?.image?.name as string,
			mimetype: submission?.value?.image?.type ?? 'image/jpeg',
			size: submission?.value?.image?.size ?? 0
		});

		// 3. Create a success cookie to show a success message on the next page
		cookies().set('eventCreated', 'true', { maxAge: 60 * 5 }); // 5 minutes
	} catch (err: unknown) {
		console.error('=> 💥 Error creating the new event record.', err);
		return submission.reply({
			formErrors: ['Failed to save the event. Please try again later.']
		});
	}

	return redirect('/events/' + newEventId);
}
