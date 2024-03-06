import clsx from 'clsx'

type BoxListProps = {
	children: React.ReactNode
}

export function BoxList(props: BoxListProps) {
	const { children } = props
	return <ul>{children}</ul>
}

type BoxListItemProps = {
	children: React.ReactNode
	className?: string
	isLast: boolean
}

export function BoxListItem(props: BoxListItemProps) {
	const { children, className, isLast } = props
	return (
		<li
			className={clsx('border-x border-base-300 border-t py-2 px-4', {
				'border-b': isLast,
			}, className)}
		>
			{children}
		</li>
	)
}
