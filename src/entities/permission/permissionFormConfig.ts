import type { FieldDescriptor } from '../../components/Form/FormFields'

export const permissionFields: Array<FieldDescriptor> = [
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
