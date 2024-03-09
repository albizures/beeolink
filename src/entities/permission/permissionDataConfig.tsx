import type { DataTableConfig } from '../../components/DataTable'
import { TableActions } from '../../components/TableActions'
import type { HelperResultType } from '../../entityHelpers'
import { deletePermission, updatePermission } from './permissionActions'
import { updatePermissionFields } from './permissionForms'
import type { permissionHelpers } from './permission'

export type GetAllResult = HelperResultType<typeof permissionHelpers, 'getAll'>

export const permissionTableConfig: DataTableConfig<GetAllResult> = {
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
				return 'description'
			},
			content(item) {
				return item.description
			},
		},
		{
			title() {
				return 'actions'
			},
			content(item) {
				return (
					<TableActions
						title="Permission"
						item={item}
						deleteAction={deletePermission}
						updateAction={updatePermission}
						updateFields={updatePermissionFields(item)}
					/>
				)
			},
		},
	],
}
