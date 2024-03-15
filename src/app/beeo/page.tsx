import { toCapture, toUnwrapOr } from '@vyke/results'
import { Icon } from '../../components/Icon'
import { getOlinks } from '../../entities/olink/olinkActions'
import type { Olink } from '../../entities/olink/olink'

export default async function Beeo() {
	const olinks = await toUnwrapOr(getOlinks(), [])

	return (
		<div className="max-w-sm mx-auto mt-10">
			<h1 className="text-3xl font-bold text-center">Beeo</h1>

			<LinkList links={olinks}>
				<h4 className="text-center mt-6">
					No links found
				</h4>
			</LinkList>
			<div className="mt-6">
				<button className="btn btn-outline w-full">
					<Icon name="add" />
					add link
				</button>

			</div>
		</div>
	)
}

type LinkListProps = {
	links: Array<Olink>
	children: React.ReactNode
}

function LinkList(props: LinkListProps) {
	const { links, children } = props

	if (links.length === 0) {
		return children
	}

	return (
		<ul>
			{links.map((link) => {
				return <li key={link.id}>{link.label}</li>
			})}
		</ul>
	)
}
