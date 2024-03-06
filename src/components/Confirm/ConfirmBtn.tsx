'use client'
import { type OnConfirm, confirmHelpers } from './confirmStore'

type ConfirmBtnProps = {
	children: React.ReactNode
	className?: string
	// confirm specific props
	title: string
	description: string
	confirmLabel?: string
	onConfirm: OnConfirm | undefined
}

export function ConfirmBtn(props: ConfirmBtnProps) {
	const { children, className, title, description, onConfirm } = props

	function onClick() {
		confirmHelpers.open({
			title,
			description,
			confirmLabel: 'Delete',
			onConfirm,
		})
	}

	return (
		<button className={className} onClick={onClick}>
			{children}
		</button>
	)
}
