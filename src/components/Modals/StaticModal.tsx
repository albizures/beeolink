import clsx from 'clsx'
import { StaticModalBackdrop } from './StaticModalBackdrop'

type StaticModalProps = {
	status: 'open' | 'closed'
	children: React.ReactNode
}

export function StaticModal(props: StaticModalProps) {
	const { children, status } = props

	return (
		<dialog
			open={status === 'open'}
			className="modal"
		>
			{children}

			<StaticModalBackdrop />
		</dialog>
	)
}

type StaticModalBoxProps = {
	type?: 'normal' | 'form'
	className?: string
	children: React.ReactNode
}

export function StaticModalBox(props: StaticModalBoxProps) {
	const { type = 'normal', className, children } = props

	const box = (
		<div
			className={clsx('modal-box relative transition-all', className)}
		>
			{children}
		</div>
	)

	if (type === 'normal') {
		return box
	}

	return (
		<form>
			{box}
		</form>
	)
}
