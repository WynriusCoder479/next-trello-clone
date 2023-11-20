import { Separator } from '@/components/ui/separator'
import Info from './_components/utils/info'
import { Suspense } from 'react'
import BoardList from './_components/board/board-list'

const OrganizationIdPage = () => {
	return (
		<div className='w-full mb-2o'>
			<Info isPro={false} />
			<Separator className='my-4' />
			<div className='px-2 md:px-4'>
				<Suspense fallback={<BoardList.Skeleton />}>
					<BoardList />
				</Suspense>
			</div>
		</div>
	)
}

export default OrganizationIdPage
