import { toUnwrapOr } from '@vyke/results'
import { permissionHelpers } from '../../../entities/permission/permissions'
import { DataTable } from '../../../components/DataTable'
import { FormModalBtn } from '../../../components/FormModal/FormModalBtn'
import { createPermission } from '../../../entities/permission/permissionActions'
import { Icon } from '../../../components/Icon'
import { createPermissionFields } from '../../../entities/permission/permissionFormConfig'
import { permissionTableConfig } from '../../../entities/permission/permissionTableConfig'

export default async function Roles() {
	const permissions = await toUnwrapOr(permissionHelpers.getAll(), [])

	return (
		<div className="p-10">
			<FormModalBtn
				className="btn"
				title="Add New Permission"
				submitLabel="Crear Permission"
				action={createPermission}
				fields={createPermissionFields}
			>
				<Icon name="add" />
				Add Permission
			</FormModalBtn>

			<DataTable config={permissionTableConfig} items={permissions} />
		</div>
	)
}
