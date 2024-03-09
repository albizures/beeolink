import { toUnwrapOr } from '@vyke/results'
import { roleHelpes } from '../../../entities/role/role'
import { DataTable } from '../../../components/DataTable'
import { createRoleFields } from '../../../entities/role/roleForms'
import { createRole } from '../../../entities/role/roleActions'
import { FormModalBtn } from '../../../components/FormModal/FormModalBtn'
import { roleTableConfig } from '../../../entities/role/roleDataConfig'
import { userHelpers } from '../../../entities/user/user'
import { usersTableConfig } from '../../../entities/user/userDataConfig'
import { Icon } from '../../../components/Icon'
import { ManageRolePermissionsModal } from './ManageRolePermissions'
import { ManageUserRolesModal } from './ManageUserRoles'

type RolesProps = {
	searchParams: Record<string, string> | undefined
}

export default async function Roles(props: RolesProps) {
	const { searchParams } = props
	const roles = await toUnwrapOr(roleHelpes.getAll(), [])
	const users = await toUnwrapOr(userHelpers.getAllUsers(), [])

	const userId = searchParams?.manageRolesOf
	const roleId = searchParams?.managePermissionsOf

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
			{roleId && <ManageRolePermissionsModal roleId={roleId} />}
			<DataTable config={usersTableConfig} items={users} />
		</div>
	)
}
