'use client'
import React from 'react'
import { useRouter } from 'next/navigation'
import { Icon } from '../../../components/Icon'
import { createPermission } from '../../../entities/permission/permissionActions'
import { initialCreatePermissionState } from '../../../entities/permission/permissions'
import { formModalHelpers } from '../../../components/FModal/formModalStore'
import { permissionFields } from '../../../entities/permission/permissionFormConfig'

type CreatePermissionProps = {
	// emtpy
}

export function CreatePermission(_props: CreatePermissionProps) {
	const router = useRouter()
	function onCreate() {
		formModalHelpers.open({
			fields: permissionFields,
			title: 'Add New Permission',
			action: createPermission,
			initialState: initialCreatePermissionState,
			onSubmit(state) {
				if (state.ok && state.value.status === 'success') {
					router.refresh()
				}
			},
		})
	}

	return (
		<button className="btn" onClick={onCreate}>
			<Icon name="add" />
			Add Permission
		</button>
	)
}
