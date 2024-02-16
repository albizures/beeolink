import { type ClientSafeProvider, getProviders } from 'next-auth/react'
import { toUnwrapOr } from '@vyke/results'
import { SignInBtn } from '../../components/SignInBtn'

export default async function Login() {
	const providers = await toUnwrapOr(getProviders(), {} as Record<string, ClientSafeProvider>)

	return (
		<div className="grid min-h-screen md:grid-cols-3 xl:grid-cols-4">
			<div className="col-span-2 flex flex-col justify-center items-center pb-40">
				<h1 className="text-2xl text-center font-medium">Log in to your profile</h1>
				<div className="m-8">
					{Object.values(providers).map((provider) => (
						<div key={provider.name}>
							<SignInBtn provider={provider} />
						</div>
					))}
				</div>
			</div>
			<div className="hidden bg-base-300 md:block md:col-span-1 xl:col-span-2">
				{/* space */}
			</div>
		</div>
	)
}
