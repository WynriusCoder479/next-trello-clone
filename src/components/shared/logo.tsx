import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import localFont from 'next/font/local'

const headingFont = localFont({
	src: '../../../public/fonts/font.woff2'
})

const Logo = () => {
	return (
		<Link
			href='/'
			className='hover:opacity-75 transiton items-center gap-x-2 hidden md:flex'
		>
			<Image
				src='/logo.svg'
				alt='logo'
				height={30}
				width={30}
			/>
			<p
				className={cn(
					'text-lg text-neutral-700 leading-none tracking-wider uppercase',
					headingFont.className
				)}
			>
				Taskify
			</p>
		</Link>
	)
}

export default Logo
