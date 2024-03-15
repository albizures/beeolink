import { type StoreApi, create } from 'zustand'
import { Ok } from '@vyke/results'
import { type ModalState, createModalHelpers } from '../Modals/modalHelpers'
import type { FieldDescriptor } from '../Form/FormFields'
import type { FormAction } from '../Form/Form'
import type { FormState } from '../Form/formState'
import { actionStatus } from '../../actionStatus'

type FormModalState = ModalState & {
	status: 'open' | 'closed'
	fields: Array<FieldDescriptor>
	action: FormAction
	initialState: FormState
	title: string
	submitLabel: string
	onSubmit?: (state: FormState) => void
	formKey: number
}

const defaultFormState: FormState = Ok({
	status: actionStatus.IDLE,
})

const defaultState: FormModalState = {
	status: 'closed',
	title: 'default title',
	submitLabel: 'submit',
	fields: [],
	action: async () => {
		return defaultFormState
	},
	initialState: defaultFormState,
	formKey: 0,
}

type SetState = StoreApi<FormModalState>['setState']
type GetState = StoreApi<FormModalState>['getState']

function createHelpers(set: SetState, get: GetState) {
	const modalHelpers = createModalHelpers({
		defaultState,
		onClose() {
			const { formKey } = get()
			set({ formKey: formKey + 1 })
		},
	}, set, get)

	type OpenArgs = {
		title: string
		action: FormAction
		initialState?: FormState
		submitLabel: string
		fields: Array<FieldDescriptor>
		onSubmit?: (state: FormState) => void
	}

	function createAction(action: FormAction) {
		return async (prev: FormState, data: FormData) => {
			const result = await action(prev, data)
			const { onSubmit } = get()

			onSubmit && onSubmit(result)
			if (result.ok && result.value.status === 'success') {
				setTimeout(() => {
					modalHelpers.close()
				}, 2000)
			}

			return result
		}
	}

	function open(args: OpenArgs) {
		const { action } = args
		set({
			...args,
			status: 'open',
			action: createAction(action),
		})
		modalHelpers.open()
	}

	function close() {
		const { formKey } = get()

		modalHelpers.close()
		set({ formKey: formKey + 1 })
	}

	return {
		...modalHelpers,
		close,
		open,
	}
}

type Helpers = ReturnType<typeof createHelpers>

const useFormModalStore = create<FormModalState & { helpers: Helpers }>(
	(set, get) => ({
		...defaultState,
		helpers: {
			...createHelpers(set, get),
		},
	}),
)

export const formModalHelpers = {
	...useFormModalStore.getState().helpers,
	useModal: useFormModalStore,
	useFormKey() {
		return useFormModalStore((s) => s.formKey)
	},
}
