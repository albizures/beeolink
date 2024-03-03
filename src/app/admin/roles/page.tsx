import { toUnwrapOr } from '@vyke/results'
import { type Role, roleHelpes } from '../../../entities/role/roles'
import { DataTable } from '../../../components/DataTable'
import { createRoleFields } from '../../../entities/role/roleFormConfig'
import { createRole } from '../../../entities/role/roleActions'
import { FormModalBtn } from '../../../components/FormModal/FormModalBtn'
import { Icon } from '../../../components/Icon'
import { roleTableConfig } from '../../../entities/role/roleTableConfig'
import { roleByUserHelpers } from '../../../entities/rolesByUser/roleByUsers'
import { rolesByUsersTableConfig } from '../../../entities/rolesByUser/rolesByUserDataConfig'
import { StaticModal, StaticModalBox } from '../../../components/Modals/StaticModal'
import { userHelpers } from '../../../entities/users'
import { Form, SubmitForm } from '../../../components/Form/Form'
import { FormFields } from '../../../components/Form/FormFields'
import { addRoleToUserFields } from '../../../entities/rolesByUser/roleByUserFormConfig'
import { initialFormState } from '../../../components/Form/formState'
import { FormFeedback } from '../../../components/Form/FormFeedback'
import { AddRoleToUserForm } from './AddRoleToUserForm'

type RolesProps = {
	searchParams: Record<string, string> | undefined
}

export default async function Roles(props: RolesProps) {
	const { searchParams } = props
	const roles = await toUnwrapOr(roleHelpes.getAll(), [])
	const rolesByUsers = await toUnwrapOr(roleByUserHelpers.getAll(), [])

	const userId = searchParams?.manageRolesOf

	return (
		<div className="p-10">
			<FormModalBtn
				className="btn"
				title="Add New Role"
				submitLabel="Create Role"
				action={createRole}
				fields={createRoleFields}
			>
				<Icon name="add" />
				Add Roles
			</FormModalBtn>

			<DataTable config={roleTableConfig} items={roles} />
			<div className="divider"></div>

			{userId && <ManageUserRolesModal allRoles={roles} userId={userId} />}
			<DataTable config={rolesByUsersTableConfig} items={rolesByUsers} />
		</div>
	)
}

type ManageUserRolesModalProps = {
	userId: string
	allRoles: Array<Role>
}

async function ManageUserRolesModal(props: ManageUserRolesModalProps) {
	const { userId, allRoles } = props
	const userResult = await userHelpers.getUser(userId)

	// addRoleToUser

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
		<StaticModal status={userId ? 'open' : 'closed'}>
			<StaticModalBox>
				<h3 className="text-2xl text-center">
					Updating roles
				</h3>
				<h4 className="text-lg mt-4">
					User:
					<span className="font-bold">{user.name}</span>
				</h4>
				<AddRoleToUserForm>
					<FormFields className="flex-1" fields={addRoleToUserFields(user, allRoles)} />
					<SubmitForm className="btn btn-secondary">
						<Icon name="add" />
						Add
					</SubmitForm>
				</AddRoleToUserForm>
				<div className="divider mt-8">
					<h4 className="text-xl font-bold">List of Roles</h4>
				</div>
				{roles.length === 0
					? (
						<p className="capitalize text-center">no roles for this user</p>
						)
					: (
						<ul>
							{roles.map((role) => {
								return <li key={role.id}>{role.name}</li>
							})}
						</ul>
						)}
			</StaticModalBox>
		</StaticModal>
	)
}
