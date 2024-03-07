import { primaryKey, sqliteTable, text } from 'drizzle-orm/sqlite-core'
import { z } from 'zod'
import { Ok } from '@vyke/results'
import { and, eq } from 'drizzle-orm'
import { role } from '../role/role'
import { user } from '../users'
import { defineHelper } from '../../entityHelpers'
import { rootSola } from '../../sola'

const sola = rootSola.withTag('userRole')

export const userRole = sqliteTable('user_role', {
	userId: text('userId').references(() => user.id),
	roleId: text('roleId').references(() => role.id),
}, (table) => {
	return {
		pk: primaryKey({ columns: [table.userId, table.roleId] }),
	}
})

export const userRoleHelpers = {
	delete: defineHelper({
		input: z.object({
			roleId: z.string(),
			userId: z.string(),
		}),
		fn: async (args) => {
			const { db, input } = args

			const result = await db
				.delete(userRole)
				.where(and(
					eq(userRole.roleId, input.roleId),
					eq(userRole.userId, input.userId),
				))

			sola.log('remove result:', result)

			return Ok(result)
		},
	}),
	getRolesByUser: defineHelper({
		input: z.string(),
		async fn(args) {
			const { db, input } = args

			const result = await db.select({
				id: role.id,
				name: role.name,
			}).from(userRole)
				.innerJoin(role, eq(role.id, userRole.roleId))
				.where(eq(userRole.userId, input))
			return Ok(result)
		},
	}),
	getAll: defineHelper({
		async fn(args) {
			const { db } = args

			const result = await db.select({
				user: {
					id: user.id,
					name: user.name,
				},
				role: {
					id: role.id,
					name: role.name,
				},
			}).from(user)
				.leftJoin(userRole, eq(userRole.userId, user.id))
				.leftJoin(role, eq(role.id, userRole.roleId))
			return Ok(result)
		},
	}),
	addRole: defineHelper({
		input: z.object({
			userId: z.string(),
			roleId: z.string(),
		}),
		async fn(args) {
			const { db, input } = args

			sola.log('input', input)

			const result = await db.insert(userRole).values({
				...input,
			}).returning().get()

			return Ok(result)
		},
	}),
}
