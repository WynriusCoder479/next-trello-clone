import { Board } from '@prisma/client'
import Link from 'next/link'
import { FC } from 'react'

interface BoardCardProps {
	board: Board
}

const BoardCard: FC<BoardCardProps> = ({
	board: { id, title, imageThumbUrl }
}) => {
	return (
		<Link
			href={`/board/${id}`}
			className='group relative aspect-video bg-no-repeat bg-center bg-cover bg-sky-700 rounded-sm h-full w-full p-2 overflow-hidden'
			style={{ backgroundImage: `url(${imageThumbUrl})` }}
		>
			<div className='absolute inset-0 bg-black/30 group-hover:bg-black/40 transition' />
			<p className='relative font-semibold text-white'>{title}</p>
		</Link>
	)
}

export default BoardCard
