'use client'
import { type ClientSafeProvider, signIn } from 'next-auth/react'
import { Icon } from './Icon'

export type SignInBtnProps = {
	provider: ClientSafeProvider
}

export function SignInBtn(props: SignInBtnProps) {
	const { provider } = props
	return (
		<button
			className="btn btn-outline btn-primary"
			onClick={() => signIn(provider.id, {
				callbackUrl: '/',
			})}
		>
			<span>
				{provider.name.toLowerCase() === 'google' && <Icon name="google" />}
			</span>
			Sign in with
			{' '}
			{provider.name}

		</button>
	)
}
