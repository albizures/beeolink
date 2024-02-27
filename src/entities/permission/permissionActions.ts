'use server'
import { Err, Ok, type Result, toCapture } from '@vyke/results'
import { type CreatePermissionFormState, permissionHelpers } from './permissions'

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
