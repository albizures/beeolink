'use client'
import { useRouter } from 'next/navigation'
import type { Result } from '@vyke/results'
import { rootSola } from '../sola'
import { ConfirmBtn } from './Confirm/ConfirmBtn'
import type { ConfirmType } from './Confirm/confirmStore'

const sola = rootSola.withTag('delete-btn')

type DeleteBtnProps = {
	title: string
	description: string
	children: React.ReactNode
	className?: string
	onDelete: () => Promise<Result<unknown, unknown>>
}

export function DeleteBtn(props: DeleteBtnProps) {
	const { children, onDelete, title, description, className } = props
	const router = useRouter()

	async function onConfirm(type: ConfirmType) {
		if (type === 'cancel') {
			return
		}

		const result = await onDelete()

		if (result.ok) {
			router.refresh()
		}
		else {
			// TODO: add alert for feedback
			sola.error(`Error while deleting ${title}`, result.value)
		}
	}

	return (
		<ConfirmBtn
			description={description}
			title={title}
			className={className}
			onConfirm={onConfirm}
		>
			{children}
		</ConfirmBtn>
	)
}
