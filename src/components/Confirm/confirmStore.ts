import { type StoreApi, create } from 'zustand'
import { type ModalState, createModalHelpers } from '../Modals/modalHelpers'

type Status = 'open' | 'closed'
export type ConfirmType = 'cancel' | 'continue'
export type OnConfirm = (type: ConfirmType) => void
type ConfirmState = ModalState & {
	status: Status
	title: string
	description: string
	confirmLabel: string | undefined
	onConfirm: OnConfirm | undefined
}

const defaultState: ConfirmState = {
	status: 'closed',
	title: 'default title',
	description: 'default description',
	confirmLabel: undefined,
	onConfirm: undefined,
}

type OpenArgs = {
	title: string
	description: string
	confirmLabel?: string
	onConfirm?: OnConfirm
}

type SetState = StoreApi<ConfirmState>['setState']
type GetState = StoreApi<ConfirmState>['getState']

function createHelpers(set: SetState, get: GetState) {
	const modalHelpers = createModalHelpers({
		defaultState,
		onClose() {
			const { onConfirm } = get()

			onConfirm && onConfirm('cancel')
		},
	}, set, get)

	function open(args: OpenArgs) {
		const { title, description, onConfirm, confirmLabel } = args

		set({
			title,
			description,
			confirmLabel,
			onConfirm,
			status: 'open',
		})

		modalHelpers.open()
	}

	function close(confirmType: ConfirmType) {
		const { onConfirm } = get()

		onConfirm && onConfirm(confirmType)
		modalHelpers.close()
	}

	return {
		...modalHelpers,
		open,
		close,
	}
}

type Helpers = ReturnType<typeof createHelpers>

const useConfirmStore = create<ConfirmState & { helpers: Helpers }>(
	(set, get) => ({
		...defaultState,
		helpers: {
			...createHelpers(set, get),
		},
	}),
)

export const confirmHelpers = {
	...useConfirmStore.getState().helpers,
	useModal: useConfirmStore,
}
