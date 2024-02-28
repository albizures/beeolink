export type FieldProps = {
	label: string
	name: string
	placeholder?: string
	defaultValue?: string
	isRequired: boolean
	rightLabel?: string
	bottomLeftLabel?: string
	bottomRightLabel?: string
}

export function Field(props: FieldProps) {
	const {
		label,
		name,
		isRequired = false,
		placeholder,
		rightLabel,
		bottomLeftLabel,
		bottomRightLabel,
		defaultValue,
	} = props
	return (
		<label className="form-control w-full">
			<div className="label">
				<span className="label-text font-bold">{label}</span>
				{rightLabel && <span className="label-text-alt">Top Right label</span>}
			</div>
			<input required={isRequired} defaultValue={defaultValue} type="text" name={name} placeholder={placeholder} className="input input-bordered w-full" />
			{(bottomLeftLabel || bottomRightLabel) && (
				<div className="label">
					{bottomLeftLabel && <span className="label-text-alt">{bottomLeftLabel}</span>}
					{bottomRightLabel && <span className="label-text-alt">{bottomRightLabel}</span>}
				</div>
			)}
		</label>
	)
}
