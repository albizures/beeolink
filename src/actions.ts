import { AsyncLocalStorage } from 'node:async_hooks'
import { createContext } from 'unctx'
import { getServerSession } from 'next-auth/next'
import { Err, Ok, type Result, toUnwrapOr } from '@vyke/results'
import type { Session } from 'next-auth'
import { authOptions } from './auth'
import { rolePermissionHelper } from './entities/rolePermission/rolePermission'
import type { AppPermissions } from './entities/permission/permissions'
import { type FailedActionStatus, actionStatus } from './actionStatus'

type ActionContext = {
	session: Session
}

const ctx = createContext<ActionContext>({
	asyncContext: true,
	AsyncLocalStorage,
})

export const useActionContext = ctx.use

export function defineAction<TArgs extends Array<unknown>, TResult = void>(
	action: (...args: TArgs) => Promise<Result<TResult, { status: FailedActionStatus }>>,
	permissions: Array<AppPermissions>,
) {
	return async (...args: TArgs) => {
		const session = await getServerSession(authOptions)

		if (!session) {
			return Err({
				status: actionStatus.FAILED,
			})
		}

		const userPermissions = await toUnwrapOr(rolePermissionHelper.getByUser(session.user.id), [])

		for (const permission of permissions) {
			if (!userPermissions.includes(permission)) {
				return Err({
					status: actionStatus.FAILED,
				})
			}
		}

		return ctx.call({
			session,
		}, () => {
			return action(...args)
		})
	}
}
