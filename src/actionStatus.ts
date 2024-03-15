import type { Opaque } from 'type-fest'

export const actionStatus = {
	IDLE: 'idle' as Opaque<'idle', 'form-status'>,
	SUCCESS: 'success' as Opaque<'success', 'form-status'>,
	FAILED: 'failed' as Opaque<'failed', 'form-status'>,
	LOADING: 'loading' as Opaque<'loading', 'form-status'>,
}

export type ActionStatus = (typeof actionStatus)[keyof typeof actionStatus]

export type FailedActionStatus = typeof actionStatus.FAILED
