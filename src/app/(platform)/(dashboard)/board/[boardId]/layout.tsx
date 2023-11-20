import { db } from '@/lib/db'
import { auth } from '@clerk/nextjs'
import { notFound, redirect } from 'next/navigation'
import { ReactNode } from 'react'
import BoardNavbar from './_components/board/board-navbar'

interface BoardIdProps {
	children: ReactNode
	params: {
		boardId: string
	}
}

export async function generateMetadate({ params: { boardId } }: BoardIdProps) {
	const { orgId } = auth()

	if (!orgId)
		return {
			title: 'Board'
		}

	const board = await db.board.findUnique({
		where: {
			id: boardId,
			orgId
		}
	})

	return {
		title: board?.title || 'Board'
	}
}

const BoardIdLayout = async ({
	children,
	params: { boardId }
}: BoardIdProps) => {
	const { orgId } = auth()

	if (!orgId) redirect('/select-org')

	const board = await db.board.findUnique({
		where: {
			id: boardId,
			orgId
		}
	})

	if (!board) notFound()

	return (
		<div
			className='relative h-full bg-no-repeat bg-cover bg-center'
			style={{ backgroundImage: `url(${board.imageFullUrl})` }}
		>
			<BoardNavbar board={board} />
			<div className='absolute inset-0 bg-black/40' />
			<main className='relative pt-28 h-full'>{children}</main>
		</div>
	)
}

export default BoardIdLayout
