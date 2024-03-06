// export const runtime = 'edge'

export default function NotFound() {
	return (
		<>
			<title>404: This page could not be found.</title>
			<div className="h-screen text-center flex flex-col items-center justify-center">
				<div>
					<style
						dangerouslySetInnerHTML={{
							__html: `body{color:#000;background:#fff;margin:0}.next-error-h1{border-right:1px solid rgba(0,0,0,.3)}@media (prefers-color-scheme:dark){body{color:#fff;background:#000}.next-error-h1{border-right:1px solid rgba(255,255,255,.3)}}`,
						}}
					/>
					<h1 className="next-error-h1 text-2xl">
						404
					</h1>
					<div className="inline-block">
						<h2 className="text-lg">This page could not be found.</h2>
					</div>
				</div>
			</div>
		</>
	)
}
