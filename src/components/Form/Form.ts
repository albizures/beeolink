import type { Result } from '@vyke/results'

export type FormStateStatus = 'idle' | 'success' | 'failed' | 'loading'
export type FormAction = (prev: FormState, data: FormData) => Promise<FormState>
export type FormState = Result<{ status: FormStateStatus }, unknown>
