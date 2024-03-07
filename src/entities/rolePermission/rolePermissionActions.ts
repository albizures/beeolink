'use server'
import { Err, Ok } from '@vyke/results'
import type { FormState } from '../../components/Form/formState'
import { rootSola } from '../../sola'
import { rolePermissionHelper } from './rolePermission'

const sola = rootSola.withTag('rolePermissionActions')

export async function addPermissionToRole(prev: FormState, data: FormData): Promise<FormState> {
	const result = await rolePermissionHelper.addPermissionToRole.formData(data)

	if (result.ok) {
		return Ok({
			status: 'success',
		})
	}

	sola.error(result)
	return Err({
		status: 'failed',
	})
}
