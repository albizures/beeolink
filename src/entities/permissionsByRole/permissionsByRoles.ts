import { primaryKey, sqliteTable, text } from 'drizzle-orm/sqlite-core'
import { z } from 'zod'
import { eq } from 'drizzle-orm'
import { Ok } from '@vyke/results'
import { permissions } from '../permission/permissions'
import { roles } from '../role/roles'
import { defineHelper } from '../../entityHelpers'
import { users } from '../users'
import { roleByUsers } from '../rolesByUser/roleByUsers'

export const permissionsByRoles = sqliteTable('role_permissions', {
	permissionId: text('permissionId').references(() => permissions.id),
	roleId: text('roleId').references(() => roles.id),
}, (table) => {
	return {
		pk: primaryKey({ columns: [table.permissionId, table.roleId] }),
	}
})

export const permissionsByRoleHelpers = {
	getByUser: defineHelper({
		input: z.string(),
		fn: async (args) => {
			const { db, input } = args

			const result = await db.select().from(users).innerJoin(roleByUsers, eq(users.id, roleByUsers.userId))
				.where(eq(users.id, input))

			return Ok(result)
		},
	}),
}
