import type { FieldDescriptor } from '../../components/Form/FormFields'
import type { Permission } from '../permission/permission'
import type { Role } from '../role/role'

export function addPermissionToRoleFields(role: Role, permissions: Array<Permission>): Array<FieldDescriptor> {
	return [
		{
			type: 'hidden',
			name: 'roleId',
			value: role.id,
		},
		{
			type: 'select',
			name: 'permissionId',
			label: 'Permission',
			isRequired: true,
			options: [{
				value: '',
				label: 'Pick a permission',
				disabled: true,
				selected: true,
			}, ...permissions.map((permission) => {
				return {
					value: permission.id,
					label: permission.name,
				}
			})],
		},
	]
}
