'use server'
import { Err, Ok, type Result, toCapture } from '@vyke/results'
import { rootSola } from '../../sola'
import { type CreatePermissionFormState, type UpdatePermissionFormState, permissionHelpers } from './permissions'

const sola = rootSola.withTag('permission-actions')

export async function createPermission(prev: CreatePermissionFormState, data: FormData): Promise<CreatePermissionFormState> {
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
}

type DeletePermissionResult = Result<true, {
	status: 'failed'
}>

export async function deletePermission(id: string): Promise<DeletePermissionResult> {
	const result = await toCapture(permissionHelpers.delete(id))

	if (result.ok) {
		return Ok(true)
	}

	console.error(result)

	return Err({
		status: 'failed',
	})
}

export async function updatePermission(prev: CreatePermissionFormState, data: FormData): Promise<UpdatePermissionFormState> {
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
