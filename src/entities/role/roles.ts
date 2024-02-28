import { sqliteTable, text } from 'drizzle-orm/sqlite-core'
import { v4 as uuidv4 } from 'uuid'
import { Ok, type Result, to } from '@vyke/results'
import { z } from 'zod'
import { type HelperResultType, defineHelper } from '../../entityHelpers'
import type { DataTableConfig } from '../../components/DataTable'
import { rootSola } from '../../sola'

const sola = rootSola.withTag('roles')

export const roles = sqliteTable('roles', {
	id: text('id').notNull().primaryKey().$defaultFn(() => uuidv4()),
	name: text('name').notNull().unique(),
})

export const roleHelpes = {
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
}

export const roleTableConfig: DataTableConfig<HelperResultType<typeof roleHelpes, 'getAll'>> = {
	rowId(item) {
		return item.id
	},
	columns: [
		{
			title() {
				return '#'
			},
			content(item, index) {
				return index + 1
			},
		},
		{
			title() {
				return 'name'
			},
			content(item) {
				return item.name
			},
		},
		{
			title() {
				return 'actions'
			},
			content(_item) {
				return 'actions'
			},
		},
	],
}
