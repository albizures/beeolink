'use client'
import { useRouter } from 'next/navigation'
import { rootSola } from '../sola'
import { Icon } from './Icon'
import type { ConfirmType } from './Confirm/confirmStore'
import { ConfirmBtn } from './Confirm/ConfirmBtn'
import { FormModalBtn } from './FormModal/FormModalBtn'
import type { FormAction } from './Form/Form'
import type { FormState } from './Form/formState'
import type { FieldDescriptor } from './Form/FormFields'

const sola = rootSola.withTag('table-actions')

export type PermissionTableActionsProps<TItem extends { id: string }> = {
	item: TItem
	title: string
	deleteAction: (id: string) => Promise<FormState>
	updateAction: FormAction
	updateFields: Array<FieldDescriptor>
}

export function TableActions<TItem extends { id: string }>(props: PermissionTableActionsProps<TItem>) {
	const { item, deleteAction, updateAction, updateFields, title } = props
	const router = useRouter()

	async function onConfirmDelete(type: ConfirmType) {
		if (type === 'cancel') {
			sola.log('deletion canceled', title)
			return
		}

		const result = await deleteAction(item.id)

		if (result.ok) {
			sola.log('deleted', title)
			router.refresh()
		}
		else {
			// TODO: add alert for feedback
			sola.error(`Error while deleting ${title}`, result.value)
		}
	}

	return (
		<div className="space-x-2">
			<FormModalBtn
				fields={updateFields}
				title={`Edit ${title}`}
				action={updateAction}
				submitLabel={`Update ${title}`}
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
