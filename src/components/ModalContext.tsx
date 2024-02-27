'use client'
import React from 'react'
import {
	ConfimartionModal,
	type ConfirmationModalData,
	type ConfirmationResult,
	useContextConfirmationModal,
} from './ConfirmationModal'

type ModalContextState = {
	confirmationModal: ConfirmationModalData<ConfirmationResult>
}

const initialValue: ModalContextState = {
	confirmationModal: {
		title: 'default',
		description: 'default',
		modalKey: 0,
		modalRef: {
			current: null,
		},
		open() {

		},
		onReset() {

		},
		close() {

		},
	},
}

const ModalContext = React.createContext(initialValue)

type ModalProviderProps = {
	children: React.ReactNode
}

export function ModalProvider(props: ModalProviderProps) {
	const { children } = props
	const confirmationModal = useContextConfirmationModal<ConfirmationResult>('cancel')

	const value = React.useMemo(() => {
		return {
			confirmationModal,
		}
	}, [confirmationModal])

	return (
		<ModalContext.Provider value={value}>
			{children}
			<ConfimartionModal key={confirmationModal.modalKey} {...confirmationModal} />
		</ModalContext.Provider>
	)
}

export function useConfirmationModal() {
	return React.useContext(ModalContext).confirmationModal
}
