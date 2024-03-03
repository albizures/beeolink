export type SelectFieldProps = {
	label: string
	name: string
	defaultValue?: string
	isRequired?: boolean
	rightLabel?: string
	bottomLeftLabel?: string
	bottomRightLabel?: string
	children: React.ReactNode
}

export function SelectField(props: SelectFieldProps) {
	const {
		label,
		name,
		isRequired = false,
		rightLabel,
		bottomLeftLabel,
		bottomRightLabel,
		defaultValue,
		children,
	} = props

	return (
		<label className="form-control w-full">
			<div className="label">
				<span className="label-text font-bold">{label}</span>
				{rightLabel && <span className="label-text-alt">{rightLabel}</span>}
			</div>
			<select
				required={isRequired}
				defaultValue={defaultValue}
				name={name}
				className="select select-bordered"
			>
				{children}
			</select>
			{(bottomLeftLabel || bottomRightLabel) && (
				<div className="label">
					{bottomLeftLabel && <span className="label-text-alt">{bottomLeftLabel}</span>}
					{bottomRightLabel && <span className="label-text-alt">{bottomRightLabel}</span>}
				</div>
			)}
		</label>
	)
}

type SelectFieldOptionProps = React.HTMLAttributes<HTMLOptionElement> & {
	value: string
	label: string

}

export function SelectFieldOption(props: SelectFieldOptionProps) {
	const { value, label } = props
	return <option {...props} value={value}>{label}</option>
}
