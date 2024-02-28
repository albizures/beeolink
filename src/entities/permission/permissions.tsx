import { z } from 'zod'
import { v4 as uuidv4 } from 'uuid'
import { Ok, to } from '@vyke/results'
import { type InferSelectModel, eq } from 'drizzle-orm'
import { sqliteTable, text } from 'drizzle-orm/sqlite-core'
import { defineHelper } from '../../entityHelpers'
import { rootSola } from '../../sola'

const sola = rootSola.withTag('permissions')

export const permissions = sqliteTable('permissions', {
	id: text('id').notNull().primaryKey().$defaultFn(() => uuidv4()),
	name: text('name').notNull().unique(),
	description: text('description').notNull().default(''),
})

export type Permission = InferSelectModel<typeof permissions>

export const permissionHelpers = {
	create: defineHelper({
		input: z.object({
			name: z.string(),
			description: z.string().optional(),
		}),
		fn: async (args) => {
			const { db, input } = args

			const result = await db
				.insert(permissions)
				.values({
					...input,
				})
				.returning()
				.get()

			sola.log('create result:', result)

			return Ok(result)
		},
	}),
	update: defineHelper({
		input: z.object({
			id: z.string(),
			name: z.string().optional(),
			description: z.string().optional(),
		}),
		fn: async (args) => {
			const { db, input } = args

			sola.log(input)

			const result = await db
				.update(permissions)
				.set({
					...input,
				})
				.where(eq(permissions.id, input.id))
				.returning()
				.get()

			sola.log('update result:', result)

			return Ok(result)
		},
	}),
	delete: defineHelper({
		input: z.string(),
		fn: async (args) => {
			const { db, input } = args

			const result = await db
				.delete(permissions)
				.where(eq(permissions.id, input))

			sola.log('remove result:', result)

			return Ok(result)
		},
	}),
	getAll: defineHelper({
		fn: (args) => {
			const { db } = args

			return to(db.query.permissions.findMany())
		},
	}),
}
