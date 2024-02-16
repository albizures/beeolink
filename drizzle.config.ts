import type { Config } from 'drizzle-kit'

export default {
	schema: './src/schema/index.ts',
	driver: 'turso',
	dbCredentials: {
		url: 'file:./local.db',
	},
} satisfies Config
