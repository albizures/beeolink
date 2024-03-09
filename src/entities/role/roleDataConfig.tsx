import Link from 'next/link'
import type { DataTableConfig } from '../../components/DataTable'
import { TableActions } from '../../components/TableActions'
import type { HelperResultType } from '../../entityHelpers'
import { deleteRole, updateRole } from './roleActions'
import { updateRoleFields } from './roleForms'
import type { roleHelpes } from './role'

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
				return 'Permissions'
			},
			content(item) {
				return (
					<Link
						className="btn btn-link"
						href={`?managePermissionsOf=${item.id}`}
					>
						edit permissions
					</Link>
				)
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
