import { toUnwrapOr } from '@vyke/results'
import { permissionHelpers, permissionTableConfig } from '../../../entities/permission/permissions'
import { DataTable } from '../../../components/DataTable'
import { FormModalBtn } from '../../../components/FModal/FormModalBtn'
import { createPermission } from '../../../entities/permission/permissionActions'
import { Icon } from '../../../components/Icon'
import { createPermissionFields } from '../../../entities/permission/permissionFormConfig'

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
