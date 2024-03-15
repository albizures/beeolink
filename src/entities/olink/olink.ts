import { z } from 'zod'
import { Ok } from '@vyke/results'
import { v4 as uuidv4 } from 'uuid'
import { type InferSelectModel, eq } from 'drizzle-orm'
import { sqliteTable, text } from 'drizzle-orm/sqlite-core'
import { defineHelper } from '../../entityHelpers'
import { rootSola } from '../../sola'
import { user } from '../user/user'

const sola = rootSola.withTag('olink')

export const olink = sqliteTable('olink', {
	id: text('id').notNull().primaryKey().$defaultFn(() => uuidv4()),
	url: text('url').notNull().unique(),
	label: text('label').notNull(),
})

export const userOlink = sqliteTable('user_olink', {
	userId: text('userId').references(() => olink.id),
	olinkId: text('olinkId').references(() => user.id),
})

export type Olink = InferSelectModel<typeof olink>

export const olinkHelpers = {
	getByUser: defineHelper({
		input: z.string(),
		async fn(args) {
			const { db, input } = args

			const result = await db
				.select({
					id: olink.id,
					label: olink.label,
					url: olink.url,
				})
				.from(userOlink)
				.innerJoin(olink, eq(olink.id, userOlink.olinkId))
				.where(eq(userOlink.userId, input))

			return Ok(result)
		},
	}),
	create: defineHelper({
		input: z.object({
			url: z.string(),
			label: z.string(),
			userId: z.string(),
		}),
		async fn(args) {
			const { db, input } = args

			const result = await db
				.insert(olink)
				.values({
					...input,
				})
				.returning()
				.get()

			sola.log('create result:', result)

			await db.insert(userOlink)
				.values({
					userId: input.userId,
					olinkId: result.id,
				})

			return Ok(result)
		},
	}),
}
