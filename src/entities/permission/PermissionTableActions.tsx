'use client'
import { useRouter } from 'next/navigation'
import { Icon } from '../../components/Icon'
import { rootSola } from '../../sola'
import type { ConfirmType } from '../../components/Confirm/confirmStore'
import { ConfirmBtn } from '../../components/Confirm/ConfirmBtn'
import { formModalHelpers } from '../../components/FModal/formModalStore'
import { deletePermission, updatePermission } from './permissionActions'
import { initialCreatePermissionState } from './permissions'
import { permissionFields } from './permissionFormConfig'

const sola = rootSola.withTag('permission-actions')

const editPermissionFields = permissionFields.concat({
	type: 'hidden',
	name: 'id',
	isRequired: false,
	label: 'id',
})

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

	function onEdit() {
		formModalHelpers.open({
			fields: editPermissionFields.map((field) => {
				const name = field.name
				if (name in props) {
					return {
						...field,
						defaultValue: props[name as keyof PermissionTableActionsProps],
					}
				}
				return field
			}),
			onSubmit(state) {
				if (state.ok && state.value.status === 'success') {
					router.refresh()
				}
			},
			title: 'Edit Permission',
			action: updatePermission,
			initialState: initialCreatePermissionState,
		})
	}

	return (
		<div className="space-x-2">
			<button onClick={onEdit} className="btn btn-xs btn-outline">
				<Icon name="edit" />
			</button>
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
