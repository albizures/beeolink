'use client'

import { useRouter } from 'next/navigation'

export function StaticModalCloseBtn() {
	const router = useRouter()

	function onClose() {
		router.back()
	}

	return (
		<button
			onClick={onClose}
			type="button"
			className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
		>
			✕
			<span className="sr-only">close</span>
		</button>
	)
}
