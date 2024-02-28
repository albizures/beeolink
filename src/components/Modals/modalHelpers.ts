import type { StoreApi } from 'zustand'

export type ModalState = {
	modal?: HTMLDialogElement
}

type SetState = StoreApi<ModalState>['setState']
type GetState = StoreApi<ModalState>['getState']

type ModalHelperConfig = {
	defaultState: ModalState
	onClose?: () => void
}

export function createModalHelpers(
	config: ModalHelperConfig,
	set: SetState,
	get: GetState,
) {
	const { defaultState, onClose } = config

	function open() {
		const { modal } = get()
		if (!modal) {
			set({ ...defaultState })
			throw new Error('modal reference is invalid')
		}

		modal.showModal()
	}

	function setRef(modal: HTMLDialogElement | null) {
		set({ modal: modal ?? undefined })
		if (modal) {
			modal.addEventListener('close', () => {
				const { modal: current } = get()
				if (current === modal) {
					set({
						...defaultState,
					})
					onClose && onClose()
				}
			})
		}
	}

	function close() {
		const { modal } = get()

		set({
			...defaultState,
		})

		modal?.close()
	}

	return {
		open,
		close,
		setRef,
	}
}
