import GoogleProvider from 'next-auth/providers/google'
import { DrizzleAdapter } from '@auth/drizzle-adapter'
import { type NextAuthOptions, getServerSession } from 'next-auth'
import type { Adapter } from 'next-auth/adapters'
import type { GetServerSidePropsContext, NextApiRequest, NextApiResponse } from 'next'
import { env } from './env.mjs'
import { db } from './db'
import type { User } from './entities/users'

export const authOptions: NextAuthOptions = {
	// it seems Adapter form next-auth and @auth/drizzle-adapter are different 🤷‍♂️
	adapter: DrizzleAdapter(db) as Adapter,
	providers: [
		GoogleProvider({
			clientId: env.GOOGLE_CLIENT_ID,
			clientSecret: env.GOOGLE_CLIENT_SECRET,
		}),
	],
	callbacks: {
		session(params) {
			const { session, user } = params

			return {
				...session,
				user,
			}
		},
	},
}

declare module 'next-auth' {
	/**
	 * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
	 */
	// eslint-disable-next-line ts/consistent-type-definitions
	interface Session {
		user: User
	}
}

export function auth(
	...args:
		| [GetServerSidePropsContext['req'], GetServerSidePropsContext['res']]
		| [NextApiRequest, NextApiResponse]
		| []
) {
	return getServerSession(...args, authOptions)
}
