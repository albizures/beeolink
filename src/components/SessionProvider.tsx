'use client'
import { SessionProvider as NextSessionProvider } from 'next-auth/react'

export type SessionProviderProps = {
	children: React.ReactNode
}

export function SessionProvider(props: SessionProviderProps) {
	const { children } = props
	return <NextSessionProvider>{children}</NextSessionProvider>
}
