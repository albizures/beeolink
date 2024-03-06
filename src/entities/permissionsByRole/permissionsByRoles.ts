import { primaryKey, sqliteTable, text } from 'drizzle-orm/sqlite-core'
import { z } from 'zod'
import { and, eq } from 'drizzle-orm'
import { Ok } from '@vyke/results'
import { permissions } from '../permission/permissions'
import { roleByUsers } from '../rolesByUser/roleByUsers'
import { defineHelper } from '../../entityHelpers'
import { rootSola } from '../../sola'
import { roles } from '../role/roles'
import { users } from '../users'

const sola = rootSola.withTag('permissionsByRoles')

export const permissionsByRoles = sqliteTable('role_permissions', {
	permissionId: text('permissionId').references(() => permissions.id),
	roleId: text('roleId').references(() => roles.id),
}, (table) => {
	return {
		pk: primaryKey({ columns: [table.permissionId, table.roleId] }),
	}
})

export const permissionsByRoleHelpers = {
	delete: defineHelper({
		input: z.object({
			roleId: z.string(),
			permissionId: z.string(),
		}),
		fn: async (args) => {
			const { db, input } = args

			const result = await db
				.delete(permissionsByRoles)
				.where(and(
					eq(permissionsByRoles.roleId, input.roleId),
					eq(permissionsByRoles.permissionId, input.permissionId),
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
				.insert(permissionsByRoles)
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
					id: permissions.id,
					name: permissions.name,
					description: permissions.description,
				})
				.from(permissionsByRoles)
				.innerJoin(roles, eq(roles.id, permissionsByRoles.roleId))
				.innerJoin(permissions, eq(permissions.id, permissionsByRoles.permissionId))
				.where(eq(roles.id, input))

			return Ok(result)
		},
	}),
	getByUser: defineHelper({
		input: z.string(),
		fn: async (args) => {
			const { db, input } = args

			const result = await db
				.select()
				.from(users)
				.innerJoin(roleByUsers, eq(users.id, roleByUsers.userId))
				.where(eq(users.id, input))

			return Ok(result)
		},
	}),
}
