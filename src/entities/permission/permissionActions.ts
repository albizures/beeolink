'use server'
import { Err, Ok, toCapture } from '@vyke/results'
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
