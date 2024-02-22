import { toUnwrapOr } from '@vyke/results'
import { roleHelpes, roleTableConfig } from '../../../entities/role/roles'
import { DataTable } from '../../../components/DataTable'
import { CreateRole } from './CreateRole'

export default async function Roles() {
	const roles = await toUnwrapOr(roleHelpes.getAll(), [])

	return (
		<div className="p-10">
			<CreateRole />

			<DataTable config={roleTableConfig} items={roles} />
		</div>
	)
}
