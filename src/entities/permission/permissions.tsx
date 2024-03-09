export const appPermissions = {
	MANAGE_PERMISSION: 'MANAGE_PERMISSION',
	SEE_PERMISSION: 'SEE_PERMISSION',
	MANAGE_ROLE: 'MANAGE_ROLE',
	SEE_ROLE: 'SEE_ROLE',
	ADMIN: 'ADMIN',
} as const

export type AppPermissions = (typeof appPermissions)[keyof typeof appPermissions]
