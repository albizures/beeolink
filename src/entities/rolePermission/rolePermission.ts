import { primaryKey, sqliteTable, text } from 'drizzle-orm/sqlite-core'
import { z } from 'zod'
import { and, eq } from 'drizzle-orm'
import { Ok } from '@vyke/results'
import { permission } from '../permission/permission'
import { userRole } from '../userRole/userRole'
import { defineHelper } from '../../entityHelpers'
import { rootSola } from '../../sola'
import { role } from '../role/role'

const sola = rootSola.withTag('rolePermission')

export const rolePermission = sqliteTable('role_permission', {
	permissionId: text('permissionId').references(() => permission.id),
	roleId: text('roleId').references(() => role.id),
}, (table) => {
	return {
		pk: primaryKey({ columns: [table.permissionId, table.roleId] }),
	}
})

export const rolePermissionHelper = {
	delete: defineHelper({
		input: z.object({
			roleId: z.string(),
			permissionId: z.string(),
		}),
		fn: async (args) => {
			const { db, input } = args

			const result = await db
				.delete(rolePermission)
				.where(and(
					eq(rolePermission.roleId, input.roleId),
					eq(rolePermission.permissionId, input.permissionId),
				))

			sola.log('remove result:', result)

			return Ok(result)
		},
	}),
	addPermissionToRole: defineHelper({
		input: z.object({
			permissionId: z.string(),
			roleId: z.string(),
		}),
		async fn(args) {
			const { db, input } = args

			sola.log('add input', input)

			const result = await db
				.insert(rolePermission)
				.values({
					...input,
				})
				.returning().get()

			return Ok(result)
		},
	}),
	getByRole: defineHelper({
		input: z.string(),
		fn: async (args) => {
			const { db, input } = args

			const result = await db
				.select({
					id: permission.id,
					name: permission.name,
					description: permission.description,
				})
				.from(rolePermission)
				.innerJoin(role, eq(role.id, rolePermission.roleId))
				.innerJoin(permission, eq(permission.id, rolePermission.permissionId))
				.where(eq(role.id, input))

			return Ok(result)
		},
	}),
	getByUser: defineHelper({
		input: z.string(),
		fn: async (args) => {
			const { db, input } = args

			const result = await db
				.select({
					name: permission.name,
				})
				.from(userRole)
				.innerJoin(rolePermission, eq(rolePermission.roleId, userRole.roleId))
				.innerJoin(permission, eq(permission.id, rolePermission.permissionId))
				.where(eq(userRole.userId, input))
				.groupBy(permission.id)

			return Ok(result.map((item) => {
				return item.name
			}))
		},
	}),
}
