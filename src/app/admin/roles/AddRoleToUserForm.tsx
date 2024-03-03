'use client'
import { useFormState } from 'react-dom'
import { Form } from '../../../components/Form/Form'
import { FormFeedback } from '../../../components/Form/FormFeedback'
import { initialFormState } from '../../../components/Form/formState'
import { addRoleToUser } from '../../../entities/rolesByUser/roleByUserActions'

type AddRoleToUserFormProps = {
	children: React.ReactNode
}

export function AddRoleToUserForm(props: AddRoleToUserFormProps) {
	const { children } = props
	const [state, formAction] = useFormState(addRoleToUser, initialFormState)

	return (
		<Form action={formAction}>
			<div className="flex items-end space-x-4">
				{children}
			</div>
			<FormFeedback state={state} />
		</Form>

	)
}
