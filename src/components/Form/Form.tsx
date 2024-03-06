'use client'
import { useFormState, useFormStatus } from 'react-dom'
import { useRouter } from 'next/navigation'
import { type FormState, initialFormState } from './formState'
import { FormFeedback } from './FormFeedback'

export type FormAction = (prev: FormState, data: FormData) => Promise<FormState>

export type FormProps = React.DetailedHTMLProps<React.FormHTMLAttributes<HTMLFormElement>, HTMLFormElement> & {
	submitLabel?: React.ReactNode
}

export function Form(props: FormProps) {
	const { children, submitLabel } = props
	return (
		<form {...props}>
			{children}
			{submitLabel && (
				<div className="text-center pt-4">
					<SubmitForm className="btn btn-primary">{submitLabel}</SubmitForm>
				</div>
			)}
		</form>
	)
}

type FormWithActionProps = {
	children: React.ReactNode
	action: (prev: FormState, data: FormData) => Promise<FormState>
}

export function FormWithAction(props: FormWithActionProps) {
	const { children, action } = props
	const router = useRouter()
	const [state, formAction] = useFormState(async (prev: FormState, data: FormData) => {
		const state = await action(prev, data)
		router.refresh()
		return state
	}, initialFormState)

	return (
		<Form action={formAction}>
			{children}
			<FormFeedback state={state} />
		</Form>
	)
}

export type SubmitFormProps = {
	children: React.ReactNode
	className?: string
	loading?: React.ReactNode
}

export function SubmitForm(props: SubmitFormProps) {
	const { children, className, loading } = props
	const status = useFormStatus()
	return (
		<button
			disabled={status.pending}
			type="submit"
			className={className}
		>
			{status.pending ? loading : children}
		</button>
	)
}
