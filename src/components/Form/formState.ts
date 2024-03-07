import { Ok, type Result } from '@vyke/results'

export const formStateStatus = {
	IDLE: 'idle',
	SUCCESS: 'success',
	FAILED: 'failed',
	LOADING: 'loading',
} as const

export type FormStateStatus = (typeof formStateStatus)[keyof typeof formStateStatus]
export type FormState = Result<{ status: FormStateStatus }, unknown>

export const initialFormState: FormState = Ok({
	status: 'idle',
})

export const failedFormStateValue = { status: 'failed' as const }
