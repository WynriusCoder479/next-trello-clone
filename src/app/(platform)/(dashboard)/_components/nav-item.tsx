'use client'

import {
	AccordionContent,
	AccordionItem,
	AccordionTrigger
} from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'
import {
	ActivityIcon,
	CreditCardIcon,
	LayoutIcon,
	LucideIcon,
	SettingsIcon
} from 'lucide-react'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'

export type OrganizationType = {
	id: string
	slug: string
	imageUrl: string
	name: string
}

interface NavItemProps {
	isExpanded: boolean
	isActive: boolean
	organization: OrganizationType
	onExpand: (id: string) => void
}

type RouteType = {
	label: string
	icon: LucideIcon
	href: string
}

const NavItem = ({
	isActive,
	isExpanded,
	onExpand,
	organization
}: NavItemProps) => {
	const router = useRouter()
	const pathname = usePathname()

	const hrefTemplate = (path: 'activity' | 'settings' | 'billing' | '' = '') =>
		`/organization/${organization.id}/${path}`

	const routes = [
		{
			label: 'Boards',
			icon: LayoutIcon,
			href: hrefTemplate()
		},
		{
			label: 'Activity',
			icon: ActivityIcon,
			href: hrefTemplate('activity')
		},
		{
			label: 'Settings',
			icon: SettingsIcon,
			href: hrefTemplate('settings')
		},
		{
			label: 'Billing',
			icon: CreditCardIcon,
			href: hrefTemplate('billing')
		}
	] satisfies RouteType[]

	const onPush = (href: string) => router.push(href)

	return (
		<AccordionItem
			value={organization.id}
			className='border-none'
		>
			<AccordionTrigger
				onClick={() => onExpand(organization.id)}
				className={cn(
					'flex items-center gap-x-2 p-1.5 text-neutral-700 rounded-md hover:bg-neutral-500/10 text-start no-underline hover:no-underline',
					{ 'bg-sky-500/10 text-sky-700': isActive && !isExpanded }
				)}
			>
				<div className='flex items-center gap-x-2'>
					<div className='w-7 h-7 relative'>
						<Image
							fill
							src={organization.imageUrl}
							alt='Organization'
							className='rounded-sm object-cover'
						/>
					</div>
					<span className='font-medium text-sm tracking-wider'>
						{organization.name}
					</span>
				</div>
			</AccordionTrigger>

			<AccordionContent className='pt-1 text-neutral-700'>
				{routes.map(route => {
					const { label, href, icon: Icon } = route

					return (
						<Button
							key={route.href}
							size='sm'
							onClick={() => onPush(route.href)}
							className={cn('w-full font-normal justify-start pl-10 mb-1', {
								'bg-sky-500/10 text-sky-700': pathname === route.href
							})}
							variant='ghost'
						>
							<Icon className='w-4 h-4 mr-2' />
							<p className='tracking-wider'>{route.label}</p>
						</Button>
					)
				})}
			</AccordionContent>
		</AccordionItem>
	)
}

NavItem.Skeleton = function SkeletonNavItem() {
	return (
		<div className='flex items-center gap-x-2'>
			<div className='w-10 h-10 relative shrink-0'>
				<Skeleton className='w-full h-full absolute' />
			</div>
			<Skeleton className='h-10 w-full' />
		</div>
	)
}

export default NavItem
