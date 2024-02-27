'use client'
import React from 'react'
import { Modal } from '../Modal'
import { confirmHelpers } from './confirmStore'

export function ConfirmModal() {
	const { confirmLabel, title, description } = confirmHelpers.useModal()

	function onCancel() {
		confirmHelpers.close('cancel')
	}
	function onConfirm() {
		confirmHelpers.close('continue')
	}

	return (
		<Modal modalRef={confirmHelpers.setRef} className="max-w-xs">
			<h2 className="text-2xl font-bold text-center">
				{title}
			</h2>
			<p className="text-center mt-4">
				{description}
			</p>
			<div className="space-y-4 mt-8">
				<button onClick={onConfirm} className="btn btn-sm w-full btn-primary">{confirmLabel}</button>
				<button onClick={onCancel} className="btn btn-sm w-full btn-ghost btn-outline">Cancel</button>
			</div>
		</Modal>
	)
}
