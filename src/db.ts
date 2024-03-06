import { drizzle } from 'drizzle-orm/libsql'
import { createClient } from '@libsql/client'

import { env } from './env.mjs'
import * as schema from './entities/schema'
import { initializeHelpers } from './entityHelpers'

export const db = drizzle(createClient({
	url: env.DATABASE_URL,
	authToken: env.DATABASE_AUTH_TOKEN,
}), {
	schema,
})

initializeHelpers(db)

export type Db = typeof db
