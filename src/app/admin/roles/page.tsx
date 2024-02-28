import { toUnwrapOr } from '@vyke/results'
import { roleHelpes, roleTableConfig } from '../../../entities/role/roles'
import { DataTable } from '../../../components/DataTable'
import { roleFields } from '../../../entities/role/roleFormConfig'
import { createRole } from '../../../entities/role/roleActions'
import { FormModalBtn } from '../../../components/FModal/FormModalBtn'
import { Icon } from '../../../components/Icon'
import { initialFormState } from '../../../components/Form/formState'

export default async function Roles() {
	const roles = await toUnwrapOr(roleHelpes.getAll(), [])

	return (
		<div className="p-10">
			<FormModalBtn
				className="btn"
				title="Add New Role"
				submitLabel="Create Role"
				action={createRole}
				fields={roleFields}
			>
				<Icon name="add" />
				Add Roles
			</FormModalBtn>

			<DataTable config={roleTableConfig} items={roles} />
		</div>
	)
}
