'use client'
import clsx from 'clsx'
import React from 'react'
import { useFormState, useFormStatus } from 'react-dom'
import { Icon } from '../Icon'
import type { FormStateStatus } from '../CreateModal'
import { FormFields } from '../Form/FormFields'
import { formModalHelpers } from './formModalStore'

export function FormModal() {
	const formRef = React.useRef<HTMLFormElement>(null)
	const modal = formModalHelpers.useModal()
	const { action, initialState, title, fields } = modal
	const [state, formAction] = useFormState(action, initialState)

	const status = state.ok ? state.value.status : 'failed'

	return (
		<dialog ref={formModalHelpers.setRef} className="modal">
			<form ref={formRef} action={formAction}>
				<ModalBox formStateStatus={status}>
					<button
						onClick={formModalHelpers.close}
						type="button"
						className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
					>
						✕
						<span className="sr-only">close</span>
					</button>
					<h2 className="text-2xl font-bold text-center">
						{title}
					</h2>
					<FormFields submitLabel="Edit" fields={fields} status={status} />
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
}

function ModalBox(props: ModalBoxProps) {
	const { children, formStateStatus } = props
	const formStatus = useFormStatus()

	const status = formStatus.pending ? 'loading' : formStateStatus

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
