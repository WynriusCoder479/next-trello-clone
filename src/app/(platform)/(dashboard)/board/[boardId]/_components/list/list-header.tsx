'use client'

import { updateList } from '@/actions/list/update-list'
import FormInput from '@/components/form/form-input'
import { useAction } from '@/hooks/use-action'
import { List } from '@prisma/client'
import { ElementRef, FC, useRef, useState } from 'react'
import { toast } from 'sonner'
import { useEventListener } from 'usehooks-ts'
import ListOptions from './list-options'

interface ListHeaderProps {
	list: List
	onAddCard: () => void
}

const ListHeader: FC<ListHeaderProps> = ({ list, onAddCard }) => {
	const [title, setTitle] = useState<string>(list.title)
	const [isEditing, setIsEditing] = useState<boolean>(false)

	const formRef = useRef<ElementRef<'form'>>(null)
	const inputRef = useRef<ElementRef<'input'>>(null)

	const enableEditing = () => {
		setIsEditing(true)
		setTimeout(() => {
			formRef.current?.focus()
			inputRef.current?.select()
		})
	}

	const disbleEditing = () => {
		setIsEditing(false)
	}

	const { execute } = useAction(updateList, {
		onSuccess: data => {
			toast.success(`Renamed to "${data.title}"`)
			setTitle(data.title)
			disbleEditing()
		},
		onError: error => {
			toast.error(error)
		}
	})

	const handleSubmit = (formData: FormData) => {
		const title = formData.get('title') as string
		const id = formData.get('id') as string
		const boardId = formData.get('boardId') as string

		if (title === list.title) {
			return disbleEditing
		}

		execute({
			title,
			id,
			boardId
		})
	}

	const onBlur = () => {
		formRef.current?.requestSubmit()
	}

	const onKeyDown = (e: KeyboardEvent) => {
		if (e.key === 'Escape') formRef.current?.requestSubmit()
	}

	useEventListener('keydown', onKeyDown)

	return (
		<div className='pt-2 px-2 text-sm font-semibold flex justify-between items-start gap-x-2'>
			{isEditing ? (
				<form
					ref={formRef}
					action={handleSubmit}
					className='flex-1 px-[2px]'
				>
					<input
						hidden
						name='id'
						id='id'
						value={list.id}
					/>
					<input
						hidden
						name='boardId'
						id='boardId'
						value={list.boardId}
					/>
					<FormInput
						ref={inputRef}
						onBlur={onBlur}
						id='title'
						placeholder='Enter list title...'
						defaultValue={title}
						className='text-sm px-[7px] py-1 h-7 font-medium border-transparent hover:border-input focus:border-input transition truncate bg-transparent focus:bg-white'
					/>
				</form>
			) : (
				<div
					onClick={enableEditing}
					className='w-full text-sm px-2.5 py-1 h-7 font-medium border-transparent'
				>
					{title}
				</div>
			)}
			<ListOptions
				onAddCard={onAddCard}
				list={list}
			/>
		</div>
	)
}

export default ListHeader
