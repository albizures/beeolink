'use server'
import { Err, Ok, toCapture } from '@vyke/results'
import type { FormState } from '../../components/Form/formState'
import { rootSola } from '../../sola'
import { defineAction } from '../../actions'
import { actionStatus } from '../../actionStatus'
import { roleHelpes } from './role'

const sola = rootSola.withTag('role-actions')

export const createRole = defineAction(async (prev: FormState, data: FormData): Promise<FormState> => {
	const rawFormData = {
		name: String(data.get('name')),
	}

	const result = await toCapture(roleHelpes.create(rawFormData))

	if (result.ok) {
		return Ok({
			status: actionStatus.SUCCESS,
		})
	}

	console.error(result)

	return Err({
		status: actionStatus.FAILED,
	})
}, ['MANAGE_ROLE'])

export const deleteRole = defineAction(async (id: string): Promise<FormState> => {
	const result = await toCapture(roleHelpes.delete(id))

	if (result.ok) {
		return Ok({
			status: actionStatus.SUCCESS,
		})
	}

	console.error(result)

	return Err({
		status: actionStatus.FAILED,
	})
}, ['MANAGE_ROLE'])

export const updateRole = defineAction(async (prev: FormState, data: FormData): Promise<FormState> => {
	const rawFormData = {
		id: data.has('id') ? String(data.get('id')) : undefined,
		name: String(data.get('name')) || undefined,
		description: String(data.get('description')) || undefined,
	}

	const parseResult = roleHelpes.update.schema.safeParse(rawFormData)

	if (!parseResult.success) {
		sola.error(parseResult.error)

		return Err({
			status: actionStatus.FAILED,
		})
	}

	const result = await toCapture(roleHelpes.update.unsafe(parseResult.data))

	if (!result.ok) {
		sola.error(result)
		return Err({
			status: actionStatus.FAILED,
		})
	}

	return Ok({
		status: actionStatus.SUCCESS,
	})
}, ['MANAGE_ROLE'])
