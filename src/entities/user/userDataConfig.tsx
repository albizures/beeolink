import Link from 'next/link'
import type { DataTableConfig } from '../../components/DataTable'
import type { HelperResultType } from '../../entityHelpers'
import type { userHelpers } from './user'

export type GetAllResult = HelperResultType<typeof userHelpers, 'getAllUsers'>

export const usersTableConfig: DataTableConfig<GetAllResult> = {
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
				return 'user'
			},
			content(item) {
				return item.name
			},
		},
		{
			title() {
				return 'roles'
			},
			content(item) {
				return <Link className="btn btn-link" href={`?manageRolesOf=${item.id}`}>edit roles</Link>
			},
		},
		{
			title() {
				return 'actions'
			},
			content(_item) {
				// return (
				// 	<TableActions
				// 		title="Permission"
				// 		item={item}
				// 		deleteAction={deletePermission}
				// 		updateAction={updatePermission}
				// 		updateFields={updatePermissionFields(item)}
				// 	/>
				// )

				return 'actions'
			},
		},
	],
}
