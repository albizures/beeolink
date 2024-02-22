'use client'
import clsx from 'clsx'
import React from 'react'
import { useFormStatus } from 'react-dom'
import { useRouter } from 'next/navigation'
import { Icon } from './Icon'
import type { FormStateStatus } from './CreateModal'

type ModalProps = {
	children: React.ReactNode
	modalRef: React.RefObject<HTMLDialogElement>
	formStateStatus: FormStateStatus
	action: (data: FormData) => void
	onReset: () => void
}

export function FormModal(props: ModalProps) {
	const { children, modalRef, action, formStateStatus, onReset } = props
	const formRef = React.useRef<HTMLFormElement>(null)

	function onClose() {
		modalRef.current?.close()
	}

	React.useEffect(() => {
		modalRef.current?.addEventListener('close', onClose)

		function onClose() {
			formRef.current?.reset()
			onReset()
		}

		return () => {
			modalRef.current?.removeEventListener('close', onClose)
		}
	}, [onReset, modalRef])

	return (
		<dialog ref={modalRef} className="modal relative">
			<form ref={formRef} action={action}>
				<ModalBox modalRef={modalRef} formStateStatus={formStateStatus}>
					<button
						onClick={onClose}
						type="button"
						className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
					>
						✕
					</button>
					{children}
				</ModalBox>
			</form>
			<form method="dialog" className="modal-backdrop absolute w-full h-full">
				<button>close</button>
			</form>

		</dialog>
	)
}

type ModalBoxProps = {
	children: React.ReactNode
	formStateStatus: FormStateStatus
	modalRef: React.RefObject<HTMLDialogElement>
}

function ModalBox(props: ModalBoxProps) {
	const { children, formStateStatus, modalRef } = props
	const formStatus = useFormStatus()
	const router = useRouter()

	const status = formStatus.pending ? 'loading' : formStateStatus

	React.useEffect(() => {
		if (status === 'success') {
			const timeout = setTimeout(() => {
				modalRef.current?.close()
				router.refresh()
			}, 3000)

			return () => {
				clearTimeout(timeout)
			}
		}
	}, [status, router, modalRef])

	return (
		<>
			<div
				className={clsx('modal-box p-10 relative transition-all', {
					'min-w-20 min-h-20': status === 'loading' || status === 'success',
					'min-w-96 min-h-52': status === 'idle' || status === 'failed',
				})}
			>
				<ModalContent formStateStatus={formStateStatus}>
					{children}
				</ModalContent>

			</div>
			<div className={clsx('absolute inset-0 w-full h-full', {
				hidden: status !== 'loading',
				block: status === 'loading',
			})}
			>
			</div>
		</>
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
					className={clsx('swap swap-rotate text-6xl', {
						'swap-active': formStateStatus !== 'success',
					})}
				>
					<span className="swap-on loading loading-lg loading-spinner text-secondary"></span>
					<div className="swap-off">
						<Icon name="success" className="text-success aspect-square w-10 h-10" />
					</div>
				</label>
			</div>
		)
	}

	return children
}

export type UseFormModalResult = ReturnType<typeof useFormModal>

export function useFormModal() {
	const [formKey, setFormKey] = React.useState(0)
	const modalRef = React.useRef<HTMLDialogElement>(null)

	return {
		formKey,
		modalRef,
		onReset: React.useCallback(() => {
			setFormKey((key) => key + 1)
		}, []),
		onClick: React.useCallback(() => {
			modalRef.current?.showModal()
		}, []),
		close: React.useCallback(() => {
			modalRef.current?.close()
		}, []),
	}
}
