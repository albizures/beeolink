'use client'
import React from 'react'
import type { Result } from '@vyke/results'
import { Modal, useModal } from './Modal'

export type FormStateStatus = 'idle' | 'success' | 'failed' | 'loading'

type Action = (data: FormData) => Promise<State>
type State = Result<{ status: FormStateStatus }, unknown>
type DeleteModalProps = {
	confirmationTitle: React.ReactNode
	children: React.ReactNode
}

export function DeleteModal(props: DeleteModalProps) {
	const { confirmationTitle, children } = props
	const modal = useModal()
	return (
		<>
			<button className="btn" onClick={modal.onClick}>

				{children}
			</button>
			<DeleteContent title={confirmationTitle} key={modal.formKey} {...modal} />
		</>
	)
}

type CreateContentProps = {
	title: React.ReactNode
	modalRef: React.RefObject<HTMLDialogElement>
}

function DeleteContent(props: CreateContentProps) {
	const { title } = props

	return (
		<Modal
			{...props}
		>
			<h2 className="text-2xl font-bold text-center">
				{title}
			</h2>

		</Modal>
	)
}
