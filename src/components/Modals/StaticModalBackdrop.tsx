'use client'

import { useRouter } from 'next/navigation'

export function StaticModalBackdrop() {
	const router = useRouter()
	return (
		<div className="modal-backdrop bg-black/30">
			<button onClick={router.back}>close</button>
		</div>
	)
}
