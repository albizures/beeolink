import { sqliteTable, text } from 'drizzle-orm/sqlite-core'
import { v4 as uuidv4 } from 'uuid'
import { Ok, type Result, to } from '@vyke/results'
import { z } from 'zod'
import { type InferSelectModel, eq } from 'drizzle-orm'
import { defineHelper } from '../../entityHelpers'
import { rootSola } from '../../sola'

const sola = rootSola.withTag('roles')

export const roles = sqliteTable('roles', {
	id: text('id').notNull().primaryKey().$defaultFn(() => uuidv4()),
	name: text('name').notNull().unique(),
})

export type Role = InferSelectModel<typeof roles>

export const roleHelpes = {
	getById: defineHelper({
		input: z.string(),
		async fn(args) {
			const { db, input } = args

			return to(db.query.roles.findFirst({
				where: eq(roles.id, input),
			}))
		},
	}),
	create: defineHelper({
		input: z.object({
			name: z.string(),
		}),
		fn: async (args) => {
			const { db, input } = args

			const result = await db
				.insert(roles)
				.values({
					...input,
				})
				.returning()
				.get()

			sola.log('create result:', result)

			return Ok(result)
		},
	}),
	getAll: defineHelper({
		fn: (args) => {
			const { db } = args

			return to(db.query.roles.findMany())
		},
	}),
	delete: defineHelper({
		input: z.string(),
		fn: async (args) => {
			const { db, input } = args

			const result = await db
				.delete(roles)
				.where(eq(roles.id, input))

			sola.log('remove result:', result)

			return Ok(result)
		},
	}),
	update: defineHelper({
		input: z.object({
			id: z.string(),
			name: z.string().optional(),
		}),
		fn: async (args) => {
			const { db, input } = args

			sola.log(input)

			const result = await db
				.update(roles)
				.set({
					...input,
				})
				.where(eq(roles.id, input.id))
				.returning()
				.get()

			sola.log('update result:', result)

			return Ok(result)
		},
	}),
}
