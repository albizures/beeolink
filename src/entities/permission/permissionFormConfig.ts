import type { FieldDescriptor } from '../../components/Form/FormFields'
import type { Permission } from './permissions'

export const createPermissionFields: Array<FieldDescriptor> = [
	{
		type: 'text',
		isRequired: true,
		name: 'name',
		label: 'Name',
		placeholder: 'Permission name',
	},
	{
		type: 'text',
		isRequired: true,
		name: 'description',
		label: 'Description',
		placeholder: 'Permission description',
	},
]

export function editPermissionFields(permission: Permission) {
	return createPermissionFields.concat({
		type: 'hidden',
		name: 'id',
		label: 'id',
	}).map((field) => {
		const name = field.name
		if (name in permission) {
			return {
				...field,
				defaultValue: permission[name as keyof Permission],
			}
		}
		return field
	})
}
