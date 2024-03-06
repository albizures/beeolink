import Link from 'next/link'
import { FormModal } from '../../components/FormModal/FormModal'
import { ConfirmModal } from '../../components/Confirm/Confirm'

export type AdminLayoutProps = {
	children: React.ReactNode
}

export default function AdminLayout(props: AdminLayoutProps) {
	const { children } = props

	return (
		<div className="drawer lg:drawer-open">
			<input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
			<div className="drawer-content">
				{/* Page content here */}
				{/* <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open drawer</label> */}
				{children}
				<ConfirmModal />
				<FormModal />
			</div>
			<div className="drawer-side max-w-60">
				<label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
				<ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content max-w-60">
					{/* Sidebar content here */}
					<li>
						<details open>
							<summary>Admin</summary>
							<ul>
								<li><Link href="/admin/roles">Roles</Link></li>
								<li><Link href="/admin/permissions">Permissions</Link></li>
							</ul>
						</details>
					</li>
				</ul>
			</div>
		</div>
	)
}
