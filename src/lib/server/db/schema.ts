import { createId } from '@paralleldrive/cuid2';
import { sql } from 'drizzle-orm';
import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const events = sqliteTable('events', {
	id: text('id')
		.primaryKey()
		.$defaultFn(() => createId()), // Using CUIDs as primary keys

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
	id: text('id')
		.primaryKey()
		.$defaultFn(() => createId()),
	name: text('name').notNull(),
	abbreviation: text('abbreviation').notNull()
});

// ======== Auth Related Tables ========
export const users = sqliteTable('users', {
	id: text('id')
		.notNull()
		.primaryKey()
		.$defaultFn(() => createId()),
	email: text('email').unique(),
	password: text('password'),
	github_id: integer('github_id').unique(),
	username: text('username').notNull()
});

export const sessions = sqliteTable('sessions', {
	id: text('id').notNull().primaryKey(), // Can't use the $defaultFn here because it causes issues with Lucia's adapter
	userId: text('user_id')
		.notNull()
		.references(() => users.id),
	expiresAt: integer('expires_at').notNull()
});
