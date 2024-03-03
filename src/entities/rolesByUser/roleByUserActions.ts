'use server'
import { Err, Ok } from '@vyke/results'
import type { FormState } from '../../components/Form/formState'
import { rootSola } from '../../sola'
import { roleByUserHelpers } from './roleByUsers'

const sola = rootSola.withTag('roleByUserActions')

export async function addRoleToUser(prev: FormState, data: FormData): Promise<FormState> {
	const result = await roleByUserHelpers.addRole.formData(data)

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
