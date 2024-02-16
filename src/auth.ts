import GoogleProvider from 'next-auth/providers/google'
import { DrizzleAdapter } from '@auth/drizzle-adapter'
import type { NextAuthOptions } from 'next-auth'
import type { Adapter } from 'next-auth/adapters'
import { env } from './env.mjs'
import { db } from './db'

export const authOptions: NextAuthOptions = {
	// it seems Adapter form next-auth and @auth/drizzle-adapter are differente 🤷‍♂️
	adapter: DrizzleAdapter(db) as Adapter,
	providers: [
		GoogleProvider({
			clientId: env.GOOGLE_CLIENT_ID,
			clientSecret: env.GOOGLE_CLIENT_SECRET,
		}),
	],
}
