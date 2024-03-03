import type { FormState } from './formState'

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

export type SubmitFormProps = {
	children: React.ReactNode
	className?: string
}

export function SubmitForm(props: SubmitFormProps) {
	const { children, className } = props
	return <button type="submit" className={className}>{children}</button>
}
