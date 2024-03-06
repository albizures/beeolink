import { type ClientSafeProvider, type LiteralUnion, getProviders } from 'next-auth/react'
import { to, unwrapOr } from '@vyke/results'
import type { BuiltInProviderType } from '@auth/core/providers'
import { SignInBtn } from '../../components/SignInBtn'

export default async function Login() {
	const providerResult = await to(getProviders())

	const providers = unwrapOr(providerResult, {} as Record<LiteralUnion<BuiltInProviderType, string>, ClientSafeProvider>)

	return (
		<div className="grid min-h-screen md:grid-cols-3 xl:grid-cols-4">
			<div className="col-span-2 flex flex-col justify-center items-center pb-40">
				<h1 className="text-2xl text-center font-medium">Log in to your profile</h1>
				<div className="m-8">
					{providers
						? Object.values(providers).map((provider) => (
							<div key={provider.name}>
								<SignInBtn provider={provider} />
							</div>
						))
						: null}
				</div>
			</div>
			<div className="hidden bg-base-300 md:block md:col-span-1 xl:col-span-2">
				{/* space */}
			</div>
		</div>
	)
}
