import { relations, sql } from 'drizzle-orm';
import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const events = sqliteTable('events', {
	id: text('id').primaryKey(), // Using CUIDs as primary keys

	// columns
	name: text('name').notNull().unique(),
	slug: text('slug').notNull().unique(),
	venue: text('venue').notNull(),
	performers: text('performers').notNull(),
	date: text('date').notNull(),
	description: text('description').notNull(),
	time: text('time').notNull(),
	street: text('street').notNull(),
	city: text('city').notNull(),
	state: text('state').notNull(),
	zip: text('zip').notNull(),

	// timestamps
	createdAt: text('created_at')
		.default(sql`CURRENT_TIMESTAMP`)
		.notNull(),
	updatedAt: text('updated_at')
		.default(sql`CURRENT_TIMESTAMP`)
		.notNull()
});

export const eventImages = sqliteTable('event_images', {
	id: text('id').primaryKey(), // Using CUIDs as primary keys

	// columns
	eventId: text('event_id')
		.references(() => events.id, { onDelete: 'cascade' })
		.notNull(),
	objectKey: text('object_key').notNull(), // S3 object key, e.g. 'events/1234.jpg'
	caption: text('caption'),
	filename: text('filename').notNull(),
	mimetype: text('mimetype').notNull(),
	size: integer('size').notNull(),

	// timestamps
	createdAt: text('created_at')
		.default(sql`CURRENT_TIMESTAMP`)
		.notNull(),
	updatedAt: text('updated_at')
		.default(sql`CURRENT_TIMESTAMP`)
		.notNull()
});

export const states = sqliteTable('states', {
	id: text('id').primaryKey(),
	name: text('name').notNull(),
	abbreviation: text('abbreviation').notNull()
});

// =============== Relationships ===============
// These relationships are needed so we can query related data using the db.query mode
export const eventsRelations = relations(events, ({ many }) => ({
	images: many(eventImages) // One event can have many images
}));

export const eventImagesRelations = relations(eventImages, ({ one }) => ({
	event: one(events, {
		fields: [eventImages.eventId],
		references: [events.id]
	}) // One image belongs to one event
}));
