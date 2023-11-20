'use client'

import CLientOnly from '@/components/shared/client-only'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent } from '@/components/ui/sheet'
import { useMobileSidebar } from '@/hooks/use-mobile-sidebar'
import { Menu } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { useEffect } from 'react'
import Sidebar from './sidebar'

const MobileSidebar = () => {
	const pathname = usePathname()

	const { isOpen, onClose, onOpen } = useMobileSidebar(state => state)

	useEffect(() => {
		onClose()
	}, [pathname, onClose])

	return (
		<CLientOnly>
			<Button
				onClick={onOpen}
				className='block md:hidden mr-2'
				variant='ghost'
				size='sm'
			>
				<Menu className='h-4 w-4' />
			</Button>
			<Sheet
				open={isOpen}
				onOpenChange={onClose}
			>
				<SheetContent
					side='left'
					className='p-2 pt-10'
				>
					<Sidebar storageKey='t-sidebar-mobile-state' />
				</SheetContent>
			</Sheet>
		</CLientOnly>
	)
}

export default MobileSidebar
