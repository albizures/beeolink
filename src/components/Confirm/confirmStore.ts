import { type StoreApi, create } from 'zustand'

type Status = 'open' | 'closed'
export type ConfirmType = 'cancel' | 'continue'
export type OnConfirm = (type: ConfirmType) => void
type ConfirmState = {
	status: Status
	title: string
	description: string
	confirmLabel: string | undefined
	onConfirm: OnConfirm | undefined
	modal?: HTMLDialogElement
}

const defaultState: ConfirmState = {
	status: 'closed',
	title: 'default title',
	description: 'default description',
	confirmLabel: undefined,
	onConfirm: undefined,
}

type SetState = StoreApi<ConfirmState>['setState']
type GetState = StoreApi<ConfirmState>['getState']

type OpenArgs = {
	title: string
	description: string
	confirmLabel?: string
	onConfirm?: OnConfirm
}

function createHelpers(set: SetState, get: GetState) {
	function open(args: OpenArgs) {
		const { modal } = get()
		if (!modal) {
			throw new Error('modal reference is invalid')
		}

		const { title, description, onConfirm, confirmLabel } = args

		set({
			title,
			description,
			confirmLabel,
			onConfirm,
			status: 'open',
		})

		modal.showModal()
	}

	function close(confirmType: ConfirmType) {
		const { modal, onConfirm } = get()

		set({
			...defaultState,
		})

		onConfirm && onConfirm(confirmType)
		modal?.close()
	}

	function setRef(modal: HTMLDialogElement | null) {
		set({ modal: modal ?? undefined })
		if (modal) {
			modal.addEventListener('close', () => {
				const { modal: current, onConfirm } = get()
				if (current === modal) {
					set({
						...defaultState,
					})
					onConfirm && onConfirm('cancel')
				}
			})
		}
	}

	return {
		setRef,
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
