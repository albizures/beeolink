'use server'
import { Err, Ok, toCapture } from '@vyke/results'
import type { FormState } from '../../components/Form/formState'
import { rootSola } from '../../sola'
import { roleHelpes } from './role'

const sola = rootSola.withTag('role-actions')

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

export async function deleteRole(id: string): Promise<FormState> {
	const result = await toCapture(roleHelpes.delete(id))

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

export async function updateRole(prev: FormState, data: FormData): Promise<FormState> {
	const rawFormData = {
		id: data.has('id') ? String(data.get('id')) : undefined,
		name: String(data.get('name')) || undefined,
		description: String(data.get('description')) || undefined,
	}

	const parseResult = roleHelpes.update.schema.safeParse(rawFormData)

	if (!parseResult.success) {
		sola.error(parseResult.error)

		return Err({
			status: 'failed',
		})
	}

	const result = await toCapture(roleHelpes.update.unsafe(parseResult.data))

	if (!result.ok) {
		sola.error(result)
		return Err({
			status: 'failed',
		})
	}

	return Ok({
		status: 'success',
	})
}
