import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { SessionProvider } from '../components/SessionProvider'
import { Navbar } from './Navbar'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
	title: 'BeeoLink',
	description: 'BeeoLink',
}

type RootLayoutProps = {
	children: React.ReactNode
}

export default function RootLayout(props: RootLayoutProps) {
	const { children } = props
	return (
		<html lang="en">
			<body className={inter.className}>
				<SessionProvider>
					<Navbar />
					<div>
						{children}
					</div>
				</SessionProvider>
			</body>
		</html>
	)
}
