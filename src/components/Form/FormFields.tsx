import { Field, type FieldProps } from '../Field'
import { Icon } from '../Icon'
import type { FormStateStatus } from './formState'

export type FieldDescriptor = FieldProps & {
	type: 'text' | 'hidden'
}

export type FormsFieldProps = {
	submitLabel: string
	fields: Array<FieldDescriptor>
	status: FormStateStatus
}

export function FormFields(props: FormsFieldProps) {
	const { fields, status, submitLabel } = props
	return (
		<div className="space-y-4 mt-4">
			{fields.map((field, index) => {
				if (field.type === 'hidden') {
					return (
						<input
							key={index}
							type="hidden"
							name={field.name}
							defaultValue={field.defaultValue}
						/>
					)
				}

				return <Field key={index} {...field} />
			})}
			{
				status === 'failed' && (
					<div role="alert" className="border text-error border-error p-4 bg-transparent flex items-center gap-4 rounded-box">
						<Icon name="error" className="text-lg" />
						<span>Error! Task failed.</span>
					</div>
				)
			}
			<div className="text-center pt-4">
				<button type="submit" className="btn btn-primary">{submitLabel}</button>
			</div>
		</div>
	)
}
