import { sql } from 'drizzle-orm';
import { sqliteTable, text } from 'drizzle-orm/sqlite-core';

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
	cover: text('cover'),
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

export const states = sqliteTable('states', {
	id: text('id').primaryKey(),
	name: text('name').notNull(),
	abbreviation: text('abbreviation').notNull()
});
