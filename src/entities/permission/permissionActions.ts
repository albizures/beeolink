'use server'
import { Err, Ok, toCapture } from '@vyke/results'
import { getServerSession } from 'next-auth'
import { rootSola } from '../../sola'
import type { FormState } from '../../components/Form/formState'
import { authOptions } from '../../auth'
import { defineAction } from '../../actions'
import { permissionHelpers } from './permissions'

const sola = rootSola.withTag('permission-actions')

export const createPermission = defineAction(async (prev: FormState, data: FormData): Promise<FormState> => {
	const rawFormData = {
		name: String(data.get('name')),
		description: String(data.get('description')),
	}

	const result = await toCapture(permissionHelpers.create(rawFormData))

	if (result.ok) {
		return Ok({
			status: 'success',
		})
	}

	console.error(result)

	return Err({
		status: 'failed',
	})
}, [])

export async function deletePermission(id: string): Promise<FormState> {
	const session = await getServerSession(authOptions)

	sola.log('delete permission session', session)
	const result = await toCapture(permissionHelpers.delete(id))

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

export async function updatePermission(prev: FormState, data: FormData): Promise<FormState> {
	const session = await getServerSession(authOptions)

	sola.log('edit permission session', session)
	const rawFormData = {
		id: data.has('id') ? String(data.get('id')) : undefined,
		name: String(data.get('name')) || undefined,
		description: String(data.get('description')) || undefined,
	}

	const parseResult = permissionHelpers.update.schema.safeParse(rawFormData)

	if (!parseResult.success) {
		sola.error(parseResult.error)

		return Err({
			status: 'failed',
		})
	}

	const result = await toCapture(permissionHelpers.update.unsafe(parseResult.data))

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
