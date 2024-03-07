import { getServerSession } from 'next-auth/next'
import { Ok, toUnwrapOr } from '@vyke/results'
import { authOptions } from './auth'
import { permissionsByRoleHelpers } from './entities/permissionsByRole/permissionsByRoles'
import { formStateStatus } from './components/Form/formState'

export function defineAction<TArgs extends Array<unknown>, TResult = void>(
	action: (...args: TArgs) => Promise<TResult>,
	permissions: Array<string>,
) {
	return async (...args: TArgs) => {
		const session = await getServerSession(authOptions)

		if (!session) {
			return Ok({
				status: formStateStatus.FAILED,
			})
		}

		const userPermissions = await toUnwrapOr(permissionsByRoleHelpers.getByUser(session.user.id), [])

		for (const permission of permissions) {
			if (!userPermissions.includes(permission)) {
				return Ok({
					status: formStateStatus.FAILED,
				})
			}
		}

		return action(...args)
	}
}
