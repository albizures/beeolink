'use client'
import { signOut } from 'next-auth/react'
import { Icon } from '../components/Icon'

export function SignOutBtn() {
	return (
		<button onClick={() => signOut({
			callbackUrl: '/',
		})}
		>
			Sign out
			{' '}
			<Icon name="signOut" />
		</button>
	)
}
