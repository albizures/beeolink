import { useConfirmationModal } from './ModalContext'

type ConfirmationBtnProps = {
	onConfirm: () => void
	children: React.ReactNode
	title: string
	description: string
	className?: string
}

export function ConfirmationBtn(props: ConfirmationBtnProps) {
	const { children, className, title, description, onConfirm } = props
	const modal = useConfirmationModal()
	function onClick() {
		modal.open({
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
