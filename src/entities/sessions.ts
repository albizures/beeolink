import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'
import { user } from './user/user'

export const session = sqliteTable('session', {
	sessionToken: text('sessionToken').notNull().primaryKey(),
	userId: text('userId')
		.notNull()
		.references(() => user.id, { onDelete: 'cascade' }),
	expires: integer('expires', { mode: 'timestamp_ms' }).notNull(),
})
