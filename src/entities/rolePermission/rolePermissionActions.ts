'use server'
import { Err, Ok } from '@vyke/results'
import type { FormState } from '../../components/Form/formState'
import { rootSola } from '../../sola'
import { defineAction } from '../../actions'
import { rolePermissionHelper } from './rolePermission'

const sola = rootSola.withTag('rolePermissionActions')

export const addPermissionToRole = defineAction(async (prev: FormState, data: FormData): Promise<FormState> => {
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
}, ['MANAGE_PERMISSION', 'MANAGE_ROLE'])
