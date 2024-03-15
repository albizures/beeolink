import { Err, Ok, type Result, toCapture } from '@vyke/results'
import { defineAction, useActionContext } from '../../actions'
import type { FormState } from '../../components/Form/formState'
import { rootSola } from '../../sola'
import { type FailedActionStatus, actionStatus } from '../../actionStatus'
import { type Olink, olinkHelpers } from './olink'

const sola = rootSola.withTag('olink-actions')

export const createOlink = defineAction(async (prev: FormState, data: FormData): Promise<FormState> => {
	const result = await toCapture(olinkHelpers.create.formData(data))

	if (result.ok) {
		return Ok({
			status: actionStatus.SUCCESS,
		})
	}

	sola.error(result)

	return Err({
		status: actionStatus.FAILED,
	})
}, [])

export const getOlinks = defineAction(async (): Promise<Result<Array<Olink>, {
	status: FailedActionStatus
}>> => {
	const { session } = useActionContext()

	const result = await toCapture(olinkHelpers.getByUser(session.user.id))

	if (result.ok) {
		return Ok(result.value)
	}

	sola.error(result)

	return Err({
		status: actionStatus.FAILED,
	})
}, [])
