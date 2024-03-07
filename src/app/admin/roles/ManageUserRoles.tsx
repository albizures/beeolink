import { toUnwrapOr } from '@vyke/results'
import { Icon } from '../../../components/Icon'
import { FormWithAction, SubmitForm } from '../../../components/Form/Form'
import { StaticModal, StaticModalBox } from '../../../components/Modals/StaticModal'
import { rolePermissionHelper } from '../../../entities/rolePermission/rolePermission'
import { addRoleToUserFields } from '../../../entities/userRole/userRoleForms'
import { userRoleHelpers } from '../../../entities/userRole/userRole'
import { FormFields } from '../../../components/Form/FormFields'
import { StaticModalCloseBtn } from '../../../components/Modals/StaticModalCloseBtn'
import { addRoleToUser } from '../../../entities/userRole/userRoleActions'
import type { Role } from '../../../entities/role/role'
import { userHelpers } from '../../../entities/user/user'
import { BoxList, BoxListItem } from '../../../components/Lists/BoxList'
import { DeleteBtn } from '../../../components/DeleteBtn'

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
	const rolesResult = await userRoleHelpers.getRolesByUser(userId)

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
						<BoxList>
							{roles.map((role, index) => {
								return <RoleItem userId={userId} isLast={roles.length - 1 === index} role={role} key={role.id} />
							})}
						</BoxList>
						)}
			</StaticModalBox>
		</StaticModal>
	)
}

type RoleItemProps = {
	role: Role
	userId: string
	isLast: boolean
}

async function RoleItem(props: RoleItemProps) {
	const { role, isLast, userId } = props

	const permissions = await toUnwrapOr(rolePermissionHelper.getByRole(role.id), [])

	async function onDelete() {
		'use server'
		return userRoleHelpers.delete({
			roleId: role.id,
			userId,
		})
	}

	return (
		<BoxListItem isLast={isLast} className="flex justify-between items-center">
			<div>
				<p className="font-bold">{role.name}</p>

				<p className="mt-1">
					<span className="text-sm opacity-70">Permissions: </span>
					{permissions.map((permission) => {
						return <span className="badge badge-neutral" key={permission.id}>{permission.name}</span>
					})}

				</p>

			</div>
			<div>
				<DeleteBtn
					description="This action cannot be undone"
					title="Are you sure?"
					className="btn btn-error btn-sm btn-square btn-outline opacity-50 hover:opacity-100"
					onDelete={onDelete}
				>
					<Icon name="delete" />
				</DeleteBtn>
			</div>
		</BoxListItem>
	)
}
