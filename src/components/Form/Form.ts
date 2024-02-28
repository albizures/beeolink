import type { Result } from '@vyke/results'
import type { FormState } from './formState'

export type FormAction = (prev: FormState, data: FormData) => Promise<FormState>
