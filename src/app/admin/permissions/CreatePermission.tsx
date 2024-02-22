'use client'
import React from 'react'
import { Icon } from '../../../components/Icon'
import { createPermission } from '../../../entities/permission/permissionActions'
import { initialCreatePermissionState } from '../../../entities/permission/permissions'
import type { FieldDescriptor } from '../../../components/FormFields'
import { CreateModal } from '../../../components/CreateModal'

type CreatePermissionProps = {
	// emtpy
}

const fields: Array<FieldDescriptor> = [
	{
		isRequired: true,
		name: 'name',
		label: 'Name',
		placeholder: 'Permission name',
	},
	{
		isRequired: true,
		name: 'description',
		label: 'Description',
		placeholder: 'Permission description',
	},
]

export function CreatePermission(_props: CreatePermissionProps) {
	return (
		<>
			<CreateModal
				formTitle="Add New Permission"
				action={createPermission}
				initialState={initialCreatePermissionState}
				fields={fields}
			>
				<Icon name="add" />
				Add Permission
			</CreateModal>
		</>
	)
}
