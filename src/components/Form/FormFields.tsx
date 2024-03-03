import clsx from 'clsx'
import type { Simplify } from 'type-fest'
import { Field, type FieldProps } from '../Field'
import { SelectField, SelectFieldOption, type SelectFieldProps } from './SelectField'

type Option = { label: string, value: string, selected?: boolean, disabled?: boolean }

export type FieldDescriptor =
	| Simplify<({ type: 'text' } & FieldProps)>
	| Simplify<({ type: 'hidden', name: string, value: string })>
	| Simplify<({ type: 'select', options: Array<Option> } & Omit<SelectFieldProps, 'children'>)>
	| Simplify<({ type: 'row', parts: Array<FieldDescriptor> })>

export type FormsFieldProps = {
	fields: Array<FieldDescriptor>
	className?: string
	isRow?: boolean
}

export function FormFields(props: FormsFieldProps) {
	const { fields, isRow = false, className } = props
	return (
		<div className={clsx('mt-4', {
			'space-y-4': !isRow,
			'grid grid-cols-2': isRow && fields.length === 2,
			'grid grid-cols-3': isRow && fields.length === 3,
			'grid grid-cols-4': isRow && fields.length === 4,
			'grid grid-cols-5': isRow && fields.length === 5,
			'grid grid-cols-6': isRow && fields.length === 6,
		}, className)}
		>
			{fields.map((field, index) => {
				return <FormField key={index} {...field} />
			})}
		</div>
	)
}

type FormFieldProps = FieldDescriptor & {
	//
}

function FormField(props: FormFieldProps) {
	const { type } = props
	if (type === 'hidden') {
		const { name, value } = props
		return (
			<input
				type="hidden"
				defaultValue={value}
				name={name}
			/>
		)
	}

	if (type === 'select') {
		const { options } = props
		return (
			<SelectField {...props}>
				{options.map((option, index) => {
					const { label, value } = option
					return <SelectFieldOption key={index} label={label} value={value} />
				})}
			</SelectField>
		)
	}
	if (type === 'row') {
		const { parts } = props

		return <FormFields fields={parts} isRow={true} />
	}

	return <Field {...props} />
}
