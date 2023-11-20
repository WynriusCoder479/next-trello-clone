import FormPopover from '@/components/form/form-popover'
import { Skeleton } from '@/components/ui/skeleton'
import { db } from '@/lib/db'
import { auth } from '@clerk/nextjs'
import { Users2 } from 'lucide-react'
import { redirect } from 'next/navigation'
import BoardCard from './board-card'
import BoardCreate from './board-create'

const BoardList = async () => {
	const { orgId } = auth()

	if (!orgId) {
		return redirect('/select-org')
	}

	const boards = await db.board.findMany({
		where: {
			orgId
		},
		orderBy: {
			createdAt: 'desc'
		}
	})

	const isPro = false

	return (
		<div className='space-y-4'>
			<div className='flex items-center font-semibold text-lg text-neutral-700'>
				<Users2 className='h-6 w-6 mr-2' />
				Your boards
			</div>

			<div className='grid gird-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4'>
				{boards.map(board => (
					<BoardCard
						key={board.id}
						board={board}
					/>
				))}

				<FormPopover>
					<BoardCreate isPro={isPro} />
				</FormPopover>
			</div>
		</div>
	)
}

BoardList.Skeleton = function SkeletonBoardList() {
	return (
		<div className='grid gird-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4'>
			<Skeleton className='aspect-video h-full w-full p-2' />
			<Skeleton className='aspect-video h-full w-full p-2' />
			<Skeleton className='aspect-video h-full w-full p-2' />
			<Skeleton className='aspect-video h-full w-full p-2' />
			<Skeleton className='aspect-video h-full w-full p-2' />
			<Skeleton className='aspect-video h-full w-full p-2' />
			<Skeleton className='aspect-video h-full w-full p-2' />
			<Skeleton className='aspect-video h-full w-full p-2' />
		</div>
	)
}

export default BoardList
