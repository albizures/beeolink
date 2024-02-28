import { Ok, type Result } from '@vyke/results'

export type FormStateStatus = 'idle' | 'success' | 'failed' | 'loading'
export type FormState = Result<{ status: FormStateStatus }, unknown>

export const initialFormState: FormState = Ok({
	status: 'idle',
})
