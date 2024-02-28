'use client'
import React from 'react'
import { useRouter } from 'next/navigation'
import type { FormAction } from '../Form/Form'
import type { FieldDescriptor } from '../Form/FormFields'
import { type FormState, initialFormState } from '../Form/formState'
import { formModalHelpers } from './formModalStore'

type CreatePermissionProps = {
	action: FormAction
	initialState?: FormState
	title: string
	fields: Array<FieldDescriptor>
	submitLabel: string
	children: React.ReactNode
	className?: string
}

export function FormModalBtn(props: CreatePermissionProps) {
	const { action, initialState = initialFormState, title, fields, submitLabel, children, className } = props
	const router = useRouter()
	function onCreate() {
		formModalHelpers.open({
			fields,
			title,
			action,
			initialState,
			submitLabel,
			onSubmit(state) {
				if (state.ok && state.value.status === 'success') {
					router.refresh()
				}
			},
		})
	}

	return (
		<button className={className} onClick={onCreate}>
			{children}
		</button>
	)
}
