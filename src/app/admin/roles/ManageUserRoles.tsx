import { toUnwrapOr } from '@vyke/results'
import { Icon } from '../../../components/Icon'
import { FormWithAction, SubmitForm } from '../../../components/Form/Form'
import { StaticModal, StaticModalBox } from '../../../components/Modals/StaticModal'
import { permissionsByRoleHelpers } from '../../../entities/permissionsByRole/permissionsByRoles'
import { addRoleToUserFields } from '../../../entities/rolesByUser/roleByUserFormConfig'
import { roleByUserHelpers } from '../../../entities/rolesByUser/roleByUsers'
import { FormFields } from '../../../components/Form/FormFields'
import { StaticModalCloseBtn } from '../../../components/Modals/StaticModalCloseBtn'
import { addRoleToUser } from '../../../entities/rolesByUser/roleByUserActions'
import type { Role } from '../../../entities/role/roles'
import { userHelpers } from '../../../entities/users'

type ManageUserRolesModalProps = {
	userId: string
	allRoles: Array<Role>
}

export async function ManageUserRolesModal(props: ManageUserRolesModalProps) {
	const { userId, allRoles } = props
	const userResult = await userHelpers.getUser(userId)

	if (!userResult.ok || !userResult.value) {
		return null
	}
	const { value: user } = userResult
	const rolesResult = await roleByUserHelpers.getRolesByUser(userId)

	if (!rolesResult.ok) {
		return null
	}

	const { value: roles } = rolesResult

	return (
		<StaticModal>
			<StaticModalBox>
				<StaticModalCloseBtn />
				<h3 className="text-2xl text-center">
					Updating roles
				</h3>
				<div className="text-center mt-4">
					<div className="badge badge-primary badge-lg">{user.name}</div>
				</div>
				<FormWithAction action={addRoleToUser}>
					<div className="flex items-end space-x-4">
						<FormFields className="flex-1" fields={addRoleToUserFields(user, allRoles)} />
						<SubmitForm className="btn btn-secondary">
							<Icon name="add" />
							Add
						</SubmitForm>
					</div>
				</FormWithAction>
				<div className="divider mt-8">
					<h4 className="text-xl font-bold">List of Roles</h4>
				</div>
				{roles.length === 0
					? (
						<p className="capitalize text-center">no roles for this user</p>
						)
					: (
						<ul className="list-disc list-inside">
							{roles.map((role) => {
								return <RoleItem role={role} key={role.id} />
							})}
						</ul>
						)}
			</StaticModalBox>
		</StaticModal>
	)
}

type RoleItemProps = {
	role: Role
}

async function RoleItem(props: RoleItemProps) {
	const { role } = props

	const permissions = await toUnwrapOr(permissionsByRoleHelpers.getByRole(role.id), [])
	return (
		<li>
			{role.name}
			<ul>
				{permissions.map((permission) => {
					return <li key={permission.id}>{permission.name}</li>
				})}
			</ul>
		</li>
	)
}
