import { z } from 'zod';

// Max Image size 5MB
export const MAX_IMAGE_SIZE = 5_000_000; // 5MB in bytes

export const EventSchema = z.object({
	id: z.string(),
	createdAt: z.string(),
	updatedAt: z.string(),
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
	date: z.date({ required_error: 'Date is required' }),
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
		.min(5, 'Zip must be at least 5 characters')
});

export const InsertEventSchema = EventSchema.omit({
	id: true,
	slug: true,
	createdAt: true,
	updatedAt: true
});

export type Event = z.infer<typeof EventSchema>;
export type InsertEvent = z.infer<typeof InsertEventSchema>;
