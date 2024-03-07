'use server'
import { Err, Ok } from '@vyke/results'
import type { FormState } from '../../components/Form/formState'
import { rootSola } from '../../sola'
import { userRoleHelpers } from './userRole'

const sola = rootSola.withTag('userRoleActions')

export async function addRoleToUser(prev: FormState, data: FormData): Promise<FormState> {
	const result = await userRoleHelpers.addRole.formData(data)

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
