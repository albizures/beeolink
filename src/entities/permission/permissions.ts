import { z } from 'zod'
import { v4 as uuidv4 } from 'uuid'
import { Ok, type Result, to } from '@vyke/results'
import type { InferSelectModel } from 'drizzle-orm'
import { sqliteTable, text } from 'drizzle-orm/sqlite-core'
import { type HelperResultType, defineHelper } from '../../entityHelpers'
import type { DataTableConfig } from '../../components/DataTable'
import type { FormStateStatus } from '../../components/CreateModal'
import { rootSola } from '../../sola'

const sola = rootSola.withTag('permissions')

export const permissions = sqliteTable('permissions', {
	id: text('id').notNull().primaryKey().$defaultFn(() => uuidv4()),
	name: text('name').notNull().unique(),
	description: text('description').notNull().default(''),
})

export type Permissions = InferSelectModel<typeof permissions>

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
	getAll: defineHelper({
		fn: (args) => {
			const { db } = args

			return to(db.query.permissions.findMany())
		},
	}),
}

export type CreatePermissionFormState = Result<{
	status: FormStateStatus
}, unknown>

export const initialCreatePermissionState: CreatePermissionFormState = Ok({
	status: 'idle',
})

export const permissionTableConfig: DataTableConfig<HelperResultType<typeof permissionHelpers, 'getAll'>> = {
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
				return 'description'
			},
			content(item) {
				return item.description
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
