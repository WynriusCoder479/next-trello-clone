'use client'

import { Button } from '@/components/ui/button'
import Logo from '@/components/shared/logo'
import { cn } from '@/lib/utils'
import { Plus } from 'lucide-react'
import { useEffect, useState } from 'react'
import { OrganizationSwitcher, UserButton } from '@clerk/nextjs'
import FormPopover from '@/components/form/form-popover'

const Navbar = () => {
	const [isTop, setIsTop] = useState<boolean>(false)

	useEffect(() => {
		const handleScroll = () =>
			window.scrollY > 10 ? setIsTop(true) : setIsTop(false)

		window.addEventListener('scroll', handleScroll)

		return () => window.removeEventListener('scroll', handleScroll)
	}, [isTop])

	return (
		<nav
			className={cn(
				'fixed z-50 top-0 px-4 w-full h-14 bg-white flex items-center',
				{ 'border-b shadow-sm': isTop }
			)}
		>
			<div className='flex items-center gap-x-4'>
				<div className='hidden md:flex'>
					<Logo />
				</div>

				<FormPopover>
					<Button
						variant='primary'
						size='sm'
						className='rounded-sm hidden md:block h-auto py-1.5 px-2'
					>
						Create
					</Button>
				</FormPopover>

				<FormPopover>
					<Button
						variant='primary'
						size='sm'
						className='rounded-sm block md:hidden'
					>
						<Plus className='w-4 h-4' />
					</Button>
				</FormPopover>
			</div>

			<div className='ml-auto flex items-center gap-x-2'>
				<OrganizationSwitcher
					hidePersonal
					afterCreateOrganizationUrl='/organization/:id'
					afterLeaveOrganizationUrl='/select-org'
					afterSelectOrganizationUrl='/organization/:id'
					appearance={{
						elements: {
							rootBox: 'flex items-center justify-center'
						}
					}}
				/>

				<UserButton
					afterSignOutUrl='/'
					appearance={{
						elements: {
							avatarBox: 'w-[30px] h-[30px]'
						}
					}}
				/>
			</div>
		</nav>
	)
}

export default Navbar
