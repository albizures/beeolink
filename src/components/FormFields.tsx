import type { FormStateStatus } from './CreateModal'
import { Field, type FieldProps } from './Field'
import { Icon } from './Icon'

export type FieldDescriptor = FieldProps & {
	//
}

export type FormsFieldProps = {
	fields: Array<FieldDescriptor>
	status: FormStateStatus
}

export function FormFields(props: FormsFieldProps) {
	const { fields, status } = props
	return (
		<div className="space-y-4 mt-4">
			{fields.map((field, index) => {
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
				<button className="btn btn-primary">Create</button>
			</div>
		</div>
	)
}
