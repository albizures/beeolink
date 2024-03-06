import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'
import { to } from '@vyke/results'
import { type InferSelectModel, eq } from 'drizzle-orm'
import { z } from 'zod'
import { defineHelper } from '../entityHelpers'

export const users = sqliteTable('user', {
	id: text('id').notNull().primaryKey(),
	name: text('name'),
	email: text('email').notNull(),
	emailVerified: integer('emailVerified', { mode: 'timestamp_ms' }),
	image: text('image'),
})

export type User = InferSelectModel<typeof users>

export const userHelpers = {
	getAllUsers: defineHelper({
		fn: (args) => {
			const { db } = args

			return to(db.query.users.findMany())
		},
	}),
	getUser: defineHelper({
		input: z.string(),
		fn: (args) => {
			const { db, input } = args
			return to(db.query.users.findFirst({
				where: eq(users.id, input),
			}))
		},
	}),
}
