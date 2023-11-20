import { cn } from '@/lib/utils'
import localFont from 'next/font/local'
import Branding from './_components/branding'
import Medal from './_components/medal'
import Quote from './_components/quote'
import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'

const headingFont = localFont({
	src: '../../../public/fonts/font.woff2'
})

const MarketingPage = () => {
	return (
		<div className='flex items-center justify-center flex-col space-y-4'>
			<div
				className={cn(
					'flex items-center justify-center flex-col',
					headingFont.className
				)}
			>
				<Medal />
				<Branding />
			</div>
			<p className='text-2xl'>***</p>
			<Quote />
			<Link
				href='sign-up'
				className={buttonVariants({
					size: 'lg',
					className: 'mt-8 text-lg'
				})}
			>
				Get Taskify for free
			</Link>
		</div>
	)
}

export default MarketingPage
