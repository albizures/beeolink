import type { FieldDescriptor } from '../../components/Form/FormFields'

export const roleFields: Array<FieldDescriptor> = [
	{
		isRequired: true,
		name: 'name',
		label: 'Name',
		placeholder: 'Role name',
		type: 'text',
	},
]
