import { unwrapOr } from '@vyke/results'
import { Icon } from '../Icon'
import { type FormState, failedFormStateValue } from './formState'

type FormFeedbackProps = {
	state: FormState
}

export function FormFeedback(props: FormFeedbackProps) {
	const { state } = props
	const status = unwrapOr(state, failedFormStateValue).status

	if (status !== 'failed') {
		return null
	}

	return (
		<div role="alert" className="border text-error border-error p-4 bg-transparent flex items-center gap-4 rounded-box">
			<Icon name="error" className="text-lg" />
			<span>Error! Task failed.</span>
		</div>
	)
}
