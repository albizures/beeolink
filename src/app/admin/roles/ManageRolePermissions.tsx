import clsx from 'clsx'
import { FormWithAction, SubmitForm } from '../../../components/Form/Form'
import { StaticModal, StaticModalBox } from '../../../components/Modals/StaticModal'
import { permissionsByRoleHelpers } from '../../../entities/permissionsByRole/permissionsByRoles'
import { type Permission, permissionHelpers } from '../../../entities/permission/permissions'
import { addPermissionToRoleFields } from '../../../entities/permissionsByRole/permissionsByRoleFormConfig'
import { addPermissionToRole } from '../../../entities/permissionsByRole/permissionsByRoleActions'
import { StaticModalCloseBtn } from '../../../components/Modals/StaticModalCloseBtn'
import { FormFields } from '../../../components/Form/FormFields'
import { roleHelpes } from '../../../entities/role/roles'
import { DeleteBtn } from '../../../components/DeleteBtn'
import { Icon } from '../../../components/Icon'
import { rootSola } from '../../../sola'

const _sola = rootSola.withTag('manage-role-permissions')

type ManageRolePermissionsModalProps = {
	roleId: string
}

export async function ManageRolePermissionsModal(props: ManageRolePermissionsModalProps) {
	const { roleId } = props
	const roleResult = await roleHelpes.getById(roleId)
	const allPermissionsResult = await permissionHelpers.getAll()

	if (!roleResult.ok || !roleResult.value || !allPermissionsResult.ok) {
		return null
	}
	const { value: role } = roleResult
	const { value: allPermissions } = allPermissionsResult
	const permissionsResult = await permissionsByRoleHelpers.getByRole(roleId)

	if (!permissionsResult.ok) {
		return null
	}

	const { value: permissions } = permissionsResult

	return (
		<StaticModal>
			<StaticModalBox>
				<StaticModalCloseBtn />
				<h3 className="text-2xl text-center">
					Updating role
				</h3>
				<div className="text-center mt-4">
					<div className="badge badge-primary badge-lg">{role.name}</div>
				</div>
				<FormWithAction action={addPermissionToRole}>
					<div className="flex items-end space-x-4">
						<FormFields className="flex-1" fields={addPermissionToRoleFields(role, allPermissions)} />
						<SubmitForm className="btn btn-secondary">
							<Icon name="add" />
							Add
						</SubmitForm>
					</div>
				</FormWithAction>
				<div className="divider mt-8">
					<h4 className="text-xl font-bold">List of Permissions</h4>
				</div>
				{permissions.length === 0
					? (
						<p className="capitalize text-center">no permissions for this role</p>
						)
					: (
						<ul>
							{permissions.map((permission, index) => {
								return (
									<PermissionItem
										roleId={roleId}
										isLast={permissions.length - 1 === index}
										permission={permission}
										key={permission.id}
									/>
								)
							})}
						</ul>
						)}
			</StaticModalBox>
		</StaticModal>
	)
}

type PermissionItemProps = {
	permission: Permission
	roleId: string
	isLast: boolean
}

async function PermissionItem(props: PermissionItemProps) {
	const { permission, isLast, roleId } = props

	async function onDelete() {
		'use server'
		return permissionsByRoleHelpers.delete({
			permissionId: permission.id,
			roleId,
		})
	}

	return (
		<li className={clsx('flex justify-between items-center border-x border-base-300 border-t py-2 px-4', {
			'border-b': isLast,
		})}
		>
			<div>
				<p className="font-bold">{permission.name}</p>
				<p className="text-sm opacity-65">{permission.description}</p>

			</div>
			<div>
				<DeleteBtn
					description="This action cannot be undone"
					title="Are you sure?"
					className="btn btn-error btn-sm btn-square btn-outline opacity-50 hover:opacity-100"
					onDelete={onDelete}
				>
					<Icon name="delete" />
				</DeleteBtn>
			</div>
		</li>
	)
}
