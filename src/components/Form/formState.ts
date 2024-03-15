import { Ok, type Result } from '@vyke/results'
import { type ActionStatus, type FailedActionStatus, actionStatus } from '../../actionStatus'

export type FormState = Result<{ status: ActionStatus }, { status: FailedActionStatus }>

export const initialFormState: FormState = Ok({
	status: actionStatus.IDLE,
})

export const failedFormStateValue = { status: actionStatus.FAILED }
