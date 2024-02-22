'use client'
import React from 'react'
import { useFormState } from 'react-dom'
import type { Result } from '@vyke/results'
import { FormModal, type UseFormModalResult, useFormModal } from './FormModal'
import { type FieldDescriptor, FormFields } from './FormFields'

export type FormStateStatus = 'idle' | 'success' | 'failed' | 'loading'

type Action = (prev: State, data: FormData) => Promise<State>
type State = Result<{ status: FormStateStatus }, unknown>
type CreateModalProps = {
	formTitle: React.ReactNode
	action: Action
	initialState: State
	fields: Array<FieldDescriptor>
	children: React.ReactNode
}

export function CreateModal(props: CreateModalProps) {
	const { formTitle, action, initialState, fields, children } = props
	const modal = useFormModal()
	return (
		<>
			<button className="btn" onClick={modal.onClick}>

				{children}
			</button>
			<CreateContent title={formTitle} fields={fields} initialState={initialState} action={action} key={modal.formKey} {...modal} />
		</>
	)
}

type CreateContentProps = UseFormModalResult & {
	initialState: State
	action: Action
	fields: Array<FieldDescriptor>
	title: React.ReactNode
}

function CreateContent(props: CreateContentProps) {
	const { action, initialState, fields, title } = props
	const [state, formAction] = useFormState(action, initialState)

	const status = state.ok ? state.value.status : 'failed'

	return (
		<FormModal
			{...props}
			formStateStatus={status}
			action={formAction}
		>
			<h2 className="text-2xl font-bold text-center">
				{title}
			</h2>

			<FormFields fields={fields} status={status} />

		</FormModal>
	)
}
