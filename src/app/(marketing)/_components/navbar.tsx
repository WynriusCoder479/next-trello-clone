'use client'

import Logo from '@/components/shared/logo'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import Link from 'next/link'

const Navbar = () => {
	return (
		<div
			className={cn(
				'fixed top-0 inset-x-0 w-full h-14 flex items-center bg-slate-100 border-b shadow-sm'
			)}
		>
			<div className='md:max-w-screen-2xl container flex items-center justify-between gap-x-2 space-x-2'>
				<Logo />
				<div className='space-x-4 md:block md:w-auto flex items-center justify-between w-full'>
					<Link
						href='/sign-in'
						className={buttonVariants({
							size: 'sm',
							variant: 'outline'
						})}
					>
						Login
					</Link>

					<Link
						href='/sign-up'
						className={buttonVariants({
							size: 'sm'
						})}
					>
						Get Taskify for free
					</Link>
				</div>
			</div>
		</div>
	)
}

export default Navbar
