'use server'
import { Err, Ok } from '@vyke/results'
import type { FormState } from '../../components/Form/formState'
import { rootSola } from '../../sola'
import { defineAction } from '../../actions'
import { actionStatus } from '../../actionStatus'
import { rolePermissionHelper } from './rolePermission'

const sola = rootSola.withTag('rolePermissionActions')

export const addPermissionToRole = defineAction(async (prev: FormState, data: FormData): Promise<FormState> => {
	const result = await rolePermissionHelper.addPermissionToRole.formData(data)

	if (result.ok) {
		return Ok({
			status: actionStatus.SUCCESS,
		})
	}

	sola.error(result)
	return Err({
		status: actionStatus.FAILED,
	})
}, ['MANAGE_PERMISSION', 'MANAGE_ROLE'])
