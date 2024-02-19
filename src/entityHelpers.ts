import { Err, type Result } from '@vyke/results'
import type { z } from 'zod'
import type { Db } from './db'

export type HelperFnArgs<TInput> = {
	db: Db
	input: TInput
}
export type HelperFn<TInput, TValue, TError> = (args: HelperFnArgs<TInput>) => Promise<Result<TValue, TError>>

export type UnsafeHelper<TInput, TValue, TError = unknown> = {
	unsafe: Helper<TInput, TValue, TError>
}

export type Helper<TInput, TValue, TError = unknown> = [TInput] extends [never]
	? () => Promise<Result<TValue, TError>>
	: (input: TInput) => Promise<Result<TValue, TError>>

let db: Db

export function initializeHelpers(currentDb: Db) {
	db = currentDb
}

export type HelperDescriptor<TInput, TValue, TError = unknown> = [TInput] extends [never] ? {
	input?: undefined
	fn: HelperFn<TInput, TValue, TError>
} : {
	input: z.ZodType<TInput>
	fn: HelperFn<TInput, TValue, TError>
}

export function defineHelper<TValue, TInput = never, TError = unknown>(
	descriptor: HelperDescriptor<TInput, TValue, TError>,
): Helper<TInput, TValue, TError> & UnsafeHelper<TInput, TValue, TError> {
	const { fn, input: schema } = descriptor

	const unsafe = ((input: TInput) => {
		return fn({ input, db })
	}) as Helper<TInput, TValue, TError>

	const safe = ((input: TInput) => {
		const result = schema!.safeParse(input)
		return result.success ? unsafe(result.data) : Err(new Error('invalid input'))
	}) as Helper<TInput, TValue, TError>

	const helper = (schema ? safe : unsafe) as Helper<TInput, TValue, TError> & UnsafeHelper<TInput, TValue, TError>

	helper.unsafe = unsafe

	return helper
}
