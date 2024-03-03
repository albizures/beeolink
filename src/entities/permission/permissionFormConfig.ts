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

export function updatePermissionFields(permission: Permission) {
	return createPermissionFields.concat({
		type: 'hidden',
		name: 'id',
		value: permission.id,
	}).map((field) => {
		if ('name' in field && field.name in permission) {
			const { name } = field
			return {
				...field,
				defaultValue: permission[name as keyof Permission],
			}
		}
		return field
	})
}
