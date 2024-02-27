'use client'
import { useRouter } from 'next/navigation'
import { ConfirmationBtn } from '../../components/ConfirmationBtn'
import { Icon } from '../../components/Icon'
import { rootSola } from '../../sola'
import { deletePermission } from './permissionActions'

const sola = rootSola.withTag('permission-actions')

export type PermissionTableActionsProps = {
	id: string
	name: string
	description: string
}

export function PermissionTableActions(props: PermissionTableActionsProps) {
	const router = useRouter()
	async function onDelete() {
		const result = await deletePermission(props.id)

		if (result.ok) {
			sola.log('permission deleted')
			router.refresh()
		}
		else {
			// TODO: add alert for feedback
			sola.error('Error while deleting permission', result.value)
		}
	}
	return (
		<div>
			<ConfirmationBtn description="This action cannot be undone" title="Are you sure?" className="btn btn-xs btn-outline btn-error" onConfirm={onDelete}>
				<Icon name="delete" />
			</ConfirmationBtn>
		</div>
	)
}
