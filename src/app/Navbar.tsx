import Link from 'next/link'
import { getServerSession } from 'next-auth'
import { Icon } from '../components/Icon'
import { authOptions } from '../auth'
import { SignOutBtn } from './SignOutBtn'

export async function Navbar() {
	const session = await getServerSession(authOptions)

	return (
		<div className="navbar bg-base-100 border border-base-300">
			<div className="navbar-start">
				<div className="dropdown">
					<div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
						<Icon name="menu" />
					</div>
					<ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
						<li><a>Homepage</a></li>
						<li><a>Portfolio</a></li>
						<li><a>About</a></li>
					</ul>
				</div>
			</div>
			<div className="navbar-center">
				<a className="btn btn-ghost text-xl">BeeoLink</a>
			</div>
			<div className="navbar-end">
				<button className="btn btn-ghost btn-circle">
					<Icon name="search" />

				</button>
				<button className="btn btn-ghost btn-circle">
					<div className="indicator">
						<Icon name="bell" />
						<span className="badge badge-xs badge-primary indicator-item"></span>
					</div>
				</button>
				{session
					? (
						<Profile />
						)
					: (
						<Link className="btn btn-ghost" href="/login">
							login
							{' '}
							<Icon name="signIn" />
						</Link>
						)}
			</div>
		</div>
	)
}

function Profile() {
	return (
		<div className="dropdown dropdown-end">
			<div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
				<div className="w-9 rounded-full aspect-square bg-primary text-primary-content flex justify-center items-center">
					<span className="text-xl">§</span>
				</div>
			</div>
			<ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
				<li>
					<a className="justify-between">
						Profile
						<span className="badge">New</span>
					</a>
				</li>
				<li><a>Settings</a></li>
				<li>
					<SignOutBtn />
				</li>
			</ul>
		</div>
	)
}
