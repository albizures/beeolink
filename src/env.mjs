// @ts-check
import process from 'node:process'
import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

export const env = createEnv({
	/*
   * Serverside Environment variables, not available on the client.
   * Will throw if you access these variables on the client.
   */
	server: {
		GOOGLE_CLIENT_ID: z.string(),
		GOOGLE_CLIENT_SECRET: z.string(),
		DATABASE_URL: z.string(),
		DATABASE_AUTH_TOKEN: z.string().optional(),
		NEXTAUTH_SECRET: z.string(),
	},
	/*
   * Environment variables available on the client (and server).
   *
   * 💡 You'll get type errors if these are not prefixed with NEXT_PUBLIC_.
   */
	client: {
		//
	},
	/*
   * Due to how Next.js bundles environment variables on Edge and Client,
   * we need to manually destructure them to make sure all are included in bundle.
   *
   * 💡 You'll get type errors if not all variables from `server` & `client` are included here.
   */
	runtimeEnv: {
		GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
		GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
		NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
		DATABASE_URL: process.env.DATABASE_URL,
		DATABASE_AUTH_TOKEN: process.env.DATABASE_AUTH_TOKEN,
	},
})
