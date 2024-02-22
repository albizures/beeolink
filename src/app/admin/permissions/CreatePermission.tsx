'use client'
import React from 'react'
import { Icon } from '../../../components/Icon'
import { createPermission } from '../../../entities/permission/permissionActions'
import { initialCreatePermissionState } from '../../../entities/permission/permissions'
import { useFormModal } from '../../../components/FormModal'
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
	const modal = useFormModal()

	return (
		<>
			<CreateModal
				formTitle="Add New Permission"
				action={createPermission}
				initialState={initialCreatePermissionState}
				fields={fields}
				key={modal.formKey}
				{...modal}
			>
				<Icon name="add" />
				Add Permission
			</CreateModal>
		</>
	)
}
