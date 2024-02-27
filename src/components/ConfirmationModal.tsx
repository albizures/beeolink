'use client'
import React from 'react'
import type { Simplify } from 'type-fest'
import { Modal, type ModalBaseData } from './Modal'

export type ConfirmationResult = 'continue' | 'cancel'
type ConfirmationModalProps = ModalBaseData<ConfirmationResult> & {
	title: React.ReactNode
	description: React.ReactNode
	confirmLabel?: string
}

export function ConfimartionModal(props: ConfirmationModalProps) {
	const { title, description, close, confirmLabel = 'confirm' } = props

	function onCancel() {
		close()
	}
	function onConfirm() {
		close('continue')
	}

	return (
		<Modal {...props} className="max-w-xs">
			<h2 className="text-2xl font-bold text-center">
				{title}
			</h2>
			<p className="text-center mt-4">
				{description}
			</p>
			<div className="space-y-4 mt-8">
				<button onClick={onConfirm} className="btn btn-sm w-full btn-primary">{confirmLabel}</button>
				<button onClick={onCancel} className="btn btn-sm w-full btn-ghost btn-outline">Cancel</button>
			</div>
		</Modal>
	)
}

type OnConfirm = () => void

type OpenArgs = {
	title: string
	description: string
	confirmLabel?: string
	onConfirm: OnConfirm
}

export type ConfirmationModalData<TResult> = Simplify<ModalBaseData<TResult> & {
	open: (args: OpenArgs) => void
	title: string
	description: string
	confirmLabel?: string
}>

export function useContextConfirmationModal<TResult>(defaultResult: TResult): ConfirmationModalData<TResult> {
	const modalRef = React.useRef<HTMLDialogElement>(null)
	const [title, setTitle] = React.useState('default')
	const [description, setDescription] = React.useState('default')
	const [confirmLabel, setConfirmLabel] = React.useState<string | undefined>()
	const [modalKey, setModalKey] = React.useState(0)
	const onConfirmRef = React.useRef<OnConfirm>()

	return React.useMemo(() => ({
		modalRef,
		modalKey,
		title,
		description,
		confirmLabel,
		open(args: OpenArgs) {
			const { title, description, onConfirm, confirmLabel } = args
			setConfirmLabel(confirmLabel)
			setTitle(title)
			setDescription(description)
			onConfirmRef.current = onConfirm
			modalRef.current?.showModal()
		},
		onReset() {
			setModalKey((key) => key + 1)
		},
		close(result: TResult = defaultResult) {
			if (result !== defaultResult && onConfirmRef.current) {
				onConfirmRef.current()
			}

			onConfirmRef.current = undefined
			modalRef.current?.close()
		},
	}), [modalKey, title, description, defaultResult, confirmLabel])
}
