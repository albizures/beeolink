import type { FieldDescriptor } from '../../components/Form/FormFields'
import type { Role } from './roles'

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
		label: 'id',
	}).map((field) => {
		const name = field.name
		if (name in role) {
			return {
				...field,
				defaultValue: role[name as keyof Role],
			}
		}
		return field
	})
}
