import type { Metadata } from 'next'
import { Nunito } from 'next/font/google'
import '@/styles/globals.css'
import { siteConfig } from '@/config/site'
import { cn } from '@/lib/utils'

const font = Nunito({ subsets: ['latin'] })

export const metadata: Metadata = {
	title: {
		default: siteConfig.name,
		template: `%s | ${siteConfig.name}`
	},
	description: siteConfig.description,
	icons: [
		{
			url: '/logo.svg',
			href: '/logo.svg'
		}
	]
}

export default function RootLayout({
	children
}: {
	children: React.ReactNode
}) {
	return (
		<html lang='en'>
			<body className={cn('antialiased', font.className)}>{children}</body>
		</html>
	)
}
