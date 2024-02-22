'use client'
import clsx from 'clsx'
import React from 'react'
import { useFormStatus } from 'react-dom'
import type { FormStateStatus } from '../entities/permission/permissions'

type ModalProps = {
	children: React.ReactNode
	modalRef: React.RefObject<HTMLDialogElement>
	formStateStatus: FormStateStatus
}

export function Modal(props: ModalProps) {
	const { children, modalRef, formStateStatus } = props
	const formStatus = useFormStatus()

	return (
		<dialog ref={modalRef} className="modal">
			<div
				className={clsx('modal-box relative transition-all', {
					'max-w-60 min-h-52': formStatus.pending,
				})}
			>
				<ModalContent formStateStatus={formStateStatus}>
					{children}
				</ModalContent>
			</div>

			<form method="dialog" className="modal-backdrop">
				<button>close</button>
			</form>

		</dialog>
	)
}

type ModalContentProps = {
	children: React.ReactNode
	formStateStatus: FormStateStatus
}

function ModalContent(props: ModalContentProps) {
	const { children, formStateStatus } = props
	const { pending } = useFormStatus()

	if (pending || formStateStatus === 'success') {
		return (
			<div className="bg-base-100 m-0 absolute h-full z-10 inset-0 flex items-center justify-center">
				<label
					className={clsx('swap text-6xl', {
						'swap-active': formStateStatus === 'success',
					})}
				>

					<span className="loading loading-lg loading-spinner text-secondary"></span>

					<div className="swap-off">😭</div>
				</label>
			</div>
		)
	}

	return children
}

export function useModal() {
	const modalRef = React.useRef<HTMLDialogElement>(null)

	return {
		modalRef,
		onClick: React.useCallback(() => {
			modalRef.current?.showModal()
		}, []),
		close: React.useCallback(() => {
			modalRef.current?.close()
		}, []),
	}
}
