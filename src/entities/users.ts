import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'
import { to } from '@vyke/results'
import { defineHelper } from '../entityHelpers'

export const users = sqliteTable('user', {
	id: text('id').notNull().primaryKey(),
	name: text('name'),
	email: text('email').notNull(),
	emailVerified: integer('emailVerified', { mode: 'timestamp_ms' }),
	image: text('image'),
})

export const userHelpes = {
	getAllUsers: defineHelper({
		fn: (args) => {
			const { db } = args

			return to(db.query.users.findMany())
		},
	}),
}
