import { z } from 'zod';

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
		.min(5, 'Zip must be at least 5 characters')
});

export const InsertEventSchema = EventSchema.extend({
	id: EventSchema.shape.id.optional(),
	slug: EventSchema.shape.slug.optional(),
	createdAt: EventSchema.shape.createdAt.optional(),
	updatedAt: EventSchema.shape.updatedAt.optional()
});

export type Event = z.infer<typeof EventSchema>;
export type InsertEvent = typeof InsertEventSchema;
