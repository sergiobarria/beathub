import { z } from 'zod';

export const MAX_IMAGE_SIZE = 5_000_000; // 5MB in bytes

export const EventSchema = z.object({
	id: z.string(),
	name: z
		.string({
			required_error: 'Name is required'
		})
		.min(3, 'Name must be at least 3 characters'),
	slug: z.string(),
	venue: z
		.string({
			required_error: 'Venue is required'
		})
		.min(3, 'Venue must be at least 3 characters'),
	performers: z.string({
		required_error: 'Performers list is required'
	}),
	cover: z.string().optional(),
	date: z.string({ required_error: 'Date is required' }),
	description: z
		.string({
			required_error: 'Description is required'
		})
		.min(3, 'Description must be at least 3 characters'),
	time: z.string({ required_error: 'Time is required' }),
	street: z
		.string({
			required_error: 'Street is required'
		})
		.min(3, 'Street must be at least 3 characters'),
	city: z.string({ required_error: 'City is required' }),
	state: z.string({ required_error: 'State is required' }),
	zip: z
		.string({
			required_error: 'Zip is required'
		})
		.min(5, 'Zip must be at least 5 characters'),
	createdAt: z.string(),
	updatedAt: z.string()
});

export const InsertEventSchema = EventSchema.omit({
	slug: true,
	createdAt: true,
	updatedAt: true
}).extend({
	id: z.string().optional(),
	cover: z.string().optional().nullable()
});

export const DeleteEventSchema = z.object({
	id: z.string()
});

export type Event = z.infer<typeof EventSchema>;
export type InsertEvent = typeof InsertEventSchema;
export type DeleteEvent = typeof DeleteEventSchema;
