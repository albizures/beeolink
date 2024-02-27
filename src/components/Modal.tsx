'use client'
import clsx from 'clsx'
import React from 'react'

type ModalProps = {
	children: React.ReactNode
	modalRef: React.LegacyRef<HTMLDialogElement>
	className?: string
}

export function Modal(props: ModalProps) {
	const { children, modalRef, className } = props

	return (
		<dialog ref={modalRef} className="modal">
			<div
				className={clsx('modal-box relative transition-all', className)}
			>
				{children}
			</div>

			<form method="dialog" className="modal-backdrop">
				<button>close</button>
			</form>

		</dialog>
	)
}

export type ModalBaseData<TResult> = {
	modalRef: React.RefObject<HTMLDialogElement>
	modalKey: number
	onReset: () => void
	close: (result?: TResult) => void
}
