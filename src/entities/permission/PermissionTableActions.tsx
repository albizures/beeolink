'use client'
import { useRouter } from 'next/navigation'
import { Icon } from '../../components/Icon'
import { rootSola } from '../../sola'
import type { ConfirmType } from '../../components/Confirm/confirmStore'
import { ConfirmBtn } from '../../components/Confirm/ConfirmBtn'
import { FormModalBtn } from '../../components/FModal/FormModalBtn'
import { deletePermission, updatePermission } from './permissionActions'
import { editPermissionFields } from './permissionFormConfig'

const sola = rootSola.withTag('permission-actions')

export type PermissionTableActionsProps = {
	id: string
	name: string
	description: string
}

export function PermissionTableActions(props: PermissionTableActionsProps) {
	const router = useRouter()

	async function onConfirmDelete(type: ConfirmType) {
		if (type === 'cancel') {
			sola.log('deletion canceled')
			return
		}

		const result = await deletePermission(props.id)

		if (result.ok) {
			sola.log('deleted')
			router.refresh()
		}
		else {
			// TODO: add alert for feedback
			sola.error('Error while deleting permission', result.value)
		}
	}

	return (
		<div className="space-x-2">
			<FormModalBtn
				fields={editPermissionFields(props)}
				title="Edit Permission"
				action={updatePermission}
				submitLabel="Edit Permission"
				className="btn btn-xs btn-outline"
			>
				<Icon name="edit" />
			</FormModalBtn>
			<ConfirmBtn
				description="This action cannot be undone"
				title="Are you sure?"
				className="btn btn-xs btn-outline btn-error"
				onConfirm={onConfirmDelete}
			>
				<Icon name="delete" />
			</ConfirmBtn>
		</div>
	)
}
