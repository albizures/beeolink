import { getServerSession } from 'next-auth'
import { toUnwrapOr } from '@vyke/results'
import type { AppPermissions } from './entities/permission/permissions'
import { authOptions } from './auth'
import { rolePermissionHelper } from './entities/rolePermission/rolePermission'

export async function hasAccess(permissions: Array<AppPermissions>): Promise<boolean> {
	const session = await getServerSession(authOptions)

	if (!session) {
		return false
	}

	const userPermissions = await toUnwrapOr(rolePermissionHelper.getByUser(session.user.id), [])

	for (const permission of permissions) {
		if (!userPermissions.includes(permission)) {
			return false
		}
	}

	return true
}
