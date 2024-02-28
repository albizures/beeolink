'use server'
import { Err, Ok, toCapture } from '@vyke/results'
import type { FormState } from '../../components/Form/formState'
import { roleHelpes } from './roles'

export async function createRole(prev: FormState, data: FormData): Promise<FormState> {
	const rawFormData = {
		name: String(data.get('name')),
	}

	const result = await toCapture(roleHelpes.create(rawFormData))

	if (result.ok) {
		return Ok({
			status: 'success',
		})
	}

	console.error(result)

	return Err({
		status: 'failed',
	})
}
