import type { DataTableConfig } from '../../components/DataTable'
import { TableActions } from '../../components/TableActions'
import type { HelperResultType } from '../../entityHelpers'
import { deleteRole, updateRole } from './roleActions'
import { updateRoleFields } from './roleFormConfig'
import type { roleHelpes } from './roles'

export const roleTableConfig: DataTableConfig<HelperResultType<typeof roleHelpes, 'getAll'>> = {
	rowId(item) {
		return item.id
	},
	columns: [
		{
			title() {
				return '#'
			},
			content(item, index) {
				return index + 1
			},
		},
		{
			title() {
				return 'name'
			},
			content(item) {
				return item.name
			},
		},
		{
			title() {
				return 'actions'
			},
			content(item) {
				return (
					<TableActions
						title="Role"
						item={item}
						deleteAction={deleteRole}
						updateAction={updateRole}
						updateFields={updateRoleFields(item)}
					/>
				)
			},
		},
	],
}
