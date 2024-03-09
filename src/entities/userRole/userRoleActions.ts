'use server'
import { Err, Ok } from '@vyke/results'
import type { FormState } from '../../components/Form/formState'
import { rootSola } from '../../sola'
import { defineAction } from '../../actions'
import { userRoleHelpers } from './userRole'

const sola = rootSola.withTag('userRoleActions')

export const addRoleToUser = defineAction(async (prev: FormState, data: FormData): Promise<FormState> => {
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
}, ['MANAGE_PERMISSION', 'MANAGE_ROLE'])
