import { toUnwrapOr } from '@vyke/results'
import { roleHelpes } from '../../../entities/role/role'
import { DataTable } from '../../../components/DataTable'
import { createRoleFields } from '../../../entities/role/roleForms'
import { createRole } from '../../../entities/role/roleActions'
import { FormModalBtn } from '../../../components/FormModal/FormModalBtn'
import { Icon } from '../../../components/Icon'
import { roleTableConfig } from '../../../entities/role/roleDataConfig'
import { userRoleHelpers } from '../../../entities/userRole/userRole'
import { rolesByUsersTableConfig } from '../../../entities/userRole/userRoleDataConfig'
import { ManageUserRolesModal } from './ManageUserRoles'
import { ManageRolePermissionsModal } from './ManageRolePermissions'

type RolesProps = {
	searchParams: Record<string, string> | undefined
}

export default async function Roles(props: RolesProps) {
	const { searchParams } = props
	const roles = await toUnwrapOr(roleHelpes.getAll(), [])
	const rolesByUsers = await toUnwrapOr(userRoleHelpers.getAll(), [])

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
			<DataTable config={rolesByUsersTableConfig} items={rolesByUsers} />
		</div>
	)
}
