import type { FieldDescriptor } from '../../components/Form/FormFields'
import type { Role } from '../role/role'
import type { User } from '../user/user'

export function addRoleToUserFields(user: User, roles: Array<Role>): Array<FieldDescriptor> {
	return [
		{
			type: 'hidden',
			name: 'userId',
			value: user.id,
		},
		{
			type: 'select',
			name: 'roleId',
			label: 'Role',
			isRequired: true,
			options: [{
				value: '',
				label: 'Pick a role',
				disabled: true,
				selected: true,
			}, ...roles.map((role) => {
				return {
					value: role.id,
					label: role.name,
				}
			})],
		},
	]
}
