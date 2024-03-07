export const permissions = {
	MANAGE_PERMISSION: 'MANAGE_PERMISSION',
	SEE_PERMISSION: 'SEE_PERMISSION',
	MANAGE_ROLE: 'MANAGE_ROLE',
	SEE_ROLE: 'SEE_ROLE',
} as const

export type Permissions = (typeof permissions)[keyof typeof permissions]
