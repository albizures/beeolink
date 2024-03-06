import { primaryKey, sqliteTable, text } from 'drizzle-orm/sqlite-core'
import { z } from 'zod'
import { Ok } from '@vyke/results'
import { and, eq } from 'drizzle-orm'
import { roles } from '../role/roles'
import { users } from '../users'
import { defineHelper } from '../../entityHelpers'
import { rootSola } from '../../sola'

const sola = rootSola.withTag('roleByUsers')

export const roleByUsers = sqliteTable('user_roles', {
	userId: text('userId').references(() => users.id),
	roleId: text('roleId').references(() => roles.id),
}, (table) => {
	return {
		pk: primaryKey({ columns: [table.userId, table.roleId] }),
	}
})

export const roleByUserHelpers = {
	delete: defineHelper({
		input: z.object({
			roleId: z.string(),
			userId: z.string(),
		}),
		fn: async (args) => {
			const { db, input } = args

			const result = await db
				.delete(roleByUsers)
				.where(and(
					eq(roleByUsers.roleId, input.roleId),
					eq(roleByUsers.userId, input.userId),
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
				id: roles.id,
				name: roles.name,
			}).from(roleByUsers)
				.innerJoin(roles, eq(roles.id, roleByUsers.roleId))
				.where(eq(roleByUsers.userId, input))
			return Ok(result)
		},
	}),
	getAll: defineHelper({
		async fn(args) {
			const { db } = args

			const result = await db.select({
				user: {
					id: users.id,
					name: users.name,
				},
				role: {
					id: roles.id,
					name: roles.name,
				},
			}).from(users)
				.leftJoin(roleByUsers, eq(roleByUsers.userId, users.id))
				.leftJoin(roles, eq(roles.id, roleByUsers.roleId))
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

			const result = await db.insert(roleByUsers).values({
				...input,
			}).returning().get()

			return Ok(result)
		},
	}),
}
