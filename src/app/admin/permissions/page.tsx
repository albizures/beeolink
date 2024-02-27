import { toUnwrapOr } from '@vyke/results'
import { permissionHelpers, permissionTableConfig } from '../../../entities/permission/permissions'
import { DataTable } from '../../../components/DataTable'
import { ModalProvider } from '../../../components/ModalContext'
import { CreatePermission } from './CreatePermission'

export default async function Roles() {
	const permissions = await toUnwrapOr(permissionHelpers.getAll(), [])

	return (
		<div className="p-10">
			<CreatePermission />

			<ModalProvider>
				<DataTable config={permissionTableConfig} items={permissions} />
			</ModalProvider>
		</div>
	)
}
