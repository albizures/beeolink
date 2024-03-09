import type { FieldDescriptor } from '../../components/Form/FormFields'
import type { Role } from './role'

export const createRoleFields: Array<FieldDescriptor> = [
	{
		isRequired: true,
		name: 'name',
		label: 'Name',
		placeholder: 'Role name',
		type: 'text',
	},
]

export function updateRoleFields(role: Role) {
	return createRoleFields.concat({
		type: 'hidden',
		name: 'id',
		value: role.id,
	}).map((field) => {
		if ('name' in field && field.name in role) {
			const name = field.name
			return {
				...field,
				defaultValue: role[name as keyof Role],
			}
		}
		return field
	})
}
