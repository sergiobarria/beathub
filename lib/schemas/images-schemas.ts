import { z } from 'zod';

export const ImageSchema = z.object({
	id: z.string(),
	createdAt: z.string(),
	updatedAt: z.string(),

	eventId: z.string({
		required_error: 'Event ID is required'
	}),
	objectKey: z.string({
		required_error: 'Object key is required'
	}),
	caption: z.string().optional(),
	filename: z.string({
		required_error: 'Filename is required'
	}),
	mimetype: z.string({
		required_error: 'Mimetype is required'
	}),
	size: z.number({
		required_error: 'Size is required'
	})
});

export const InsertImageSchema = ImageSchema.omit({
	id: true,
	createdAt: true,
	updatedAt: true
});

export type Image = z.infer<typeof ImageSchema>;
export type InsertImage = z.infer<typeof InsertImageSchema>;
