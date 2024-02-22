'use client'
import React from 'react'
import { Icon } from '../../../components/Icon'
import { useFormModal } from '../../../components/FormModal'
import type { FieldDescriptor } from '../../../components/FormFields'
import { CreateModal } from '../../../components/CreateModal'
import { createRole } from '../../../entities/role/roleActions'
import { initialCreateRoleState } from '../../../entities/role/roles'

type CreateRoleProps = {
	// emtpy
}

const fields: Array<FieldDescriptor> = [
	{
		isRequired: true,
		name: 'name',
		label: 'Name',
		placeholder: 'Role name',
	},
]

export function CreateRole(_props: CreateRoleProps) {
	return (
		<CreateModal
			formTitle="Add New Role"
			action={createRole}
			initialState={initialCreateRoleState}
			fields={fields}
		>
			<Icon name="add" />
			Add Role
		</CreateModal>
	)
}
