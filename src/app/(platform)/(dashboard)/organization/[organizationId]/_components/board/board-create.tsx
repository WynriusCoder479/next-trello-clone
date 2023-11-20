import { Hint } from '@/components/shared/hint'
import { HelpCircle } from 'lucide-react'
import { FC } from 'react'

interface BoardCreatProps {
	isPro: boolean
}

const BoardCreate: FC<BoardCreatProps> = ({ isPro }) => {
	return (
		<div
			role='button'
			className='aspect-video relative h-full w-full bg-muted rouned-sm flex flex-col gap-y-1 items-center justify-center hover:opacity-75 transition'
		>
			<p className='text-sm'>Create new board</p>
			<span className='text-xs'>{isPro ? 'Unlimited' : '5 remaining'}</span>
			<Hint
				sideOffset={40}
				description={`
 Free Workspaces can have up to 5 open boards. For unlimited boards upgrade this workspace.
`}
			>
				<HelpCircle className='absolute bottom-1 right-2 h-[14px] w-[14px]' />
			</Hint>
		</div>
	)
}

export default BoardCreate
