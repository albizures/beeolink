import { to } from '@vyke/results'
import { users } from '../../schema/auth'
import { db } from '../../db'

export default async function Test() {
	const result = await to(db.select().from(users))

	console.log('db', result)

	return (
		<div>
			test
		</div>
	)
}
