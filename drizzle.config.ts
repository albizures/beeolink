import type { Config } from 'drizzle-kit'

export default {
	schema: './src/entities/schema.ts',
	driver: 'turso',
	dbCredentials: {
		url: 'file:./local.db',
	},
} satisfies Config
