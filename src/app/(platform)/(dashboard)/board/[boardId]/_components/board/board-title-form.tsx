'use client'

import { updateBoard } from '@/actions/board/update-board'
import FormInput from '@/components/form/form-input'
import { Button } from '@/components/ui/button'
import { useAction } from '@/hooks/use-action'
import { Board } from '@prisma/client'
import { ElementRef, FC, useRef, useState } from 'react'
import { toast } from 'sonner'

interface BoardTitleFormProps {
	board: Board
}

const BoardTitleForm: FC<BoardTitleFormProps> = ({ board }) => {
	const [title, setTitle] = useState<string>(board.title)
	const [isEditing, setIsEditing] = useState<boolean>(false)

	const formRef = useRef<ElementRef<'form'>>(null)
	const inputRef = useRef<ElementRef<'input'>>(null)

	const { execute } = useAction(updateBoard, {
		onSuccess: data => {
			toast.success(`Board "${data.title}" updated!`)
			setTitle(data.title)
			disableEditing()
		},
		onError: error => {
			toast.error(error)
		}
	})

	const onSubmit = (formData: FormData) => {
		const title = formData.get('title') as string

		execute({ title, id: board.id })
	}

	const onBlur = () => {
		formRef.current?.requestSubmit()
	}

	const enableEditing = () => {
		setIsEditing(true)
		setTimeout(() => {
			inputRef.current?.focus()
			inputRef.current?.select()
		})
	}

	const disableEditing = () => {
		setIsEditing(false)
	}

	if (isEditing)
		return (
			<form
				action={onSubmit}
				ref={formRef}
				className='flex items-center gap-x-2'
			>
				<FormInput
					ref={inputRef}
					id='title'
					onBlur={onBlur}
					defaultValue={title}
					className='text-lg font-bold px-[7px] py-1 h-7 bg-transparent  focus-visible:outline-none focus-visible:ring-transparent border-none'
				/>
			</form>
		)

	return (
		<Button
			onClick={enableEditing}
			variant='transparent'
			className='font-bold text-lg h-auto w-auto p-1 px-2'
		>
			{title}
		</Button>
	)
}

export default BoardTitleForm
