'use client'

import { createBoard } from '@/actions/board/create-board'
import { useAction } from '@/hooks/use-action'
import { useRouter } from 'next/navigation'
import { ElementRef, FC, ReactNode, useRef } from 'react'
import { toast } from 'sonner'
import {
	Popover,
	PopoverClose,
	PopoverContent,
	PopoverTrigger
} from '../ui/popover'
import { Button } from '../ui/button'
import { X } from 'lucide-react'
import FormImagePicker from './form-image-picker'
import FormInput from './form-input'
import FormSubmit from './form-submit'

interface FormPopoverProps {
	children: ReactNode
	side?: 'left' | 'right' | 'top' | 'bottom'
	align?: 'start' | 'center' | 'end'
	sideOffset?: number
}

const FormPopover: FC<FormPopoverProps> = ({
	children,
	side = 'bottom',
	align,
	sideOffset = 0
}) => {
	const router = useRouter()
	const closeRef = useRef<ElementRef<'button'>>(null)

	const { execute, fieldErrors } = useAction(createBoard, {
		onSuccess: data => {
			toast.success('Board created!')
			closeRef.current?.click()
			router.push(`/board/${data.id}`)
		},
		onError: error => {
			toast.error(error)
		}
	})

	const onSubmit = (formData: FormData) => {
		const title = formData.get('title') as string
		const image = formData.get('image') as string

		console.log({ title, image })

		execute({ title, image })
	}

	return (
		<Popover>
			<PopoverTrigger asChild>{children}</PopoverTrigger>
			<PopoverContent
				align={align}
				className='w-80 pt-3'
				side={side}
				sideOffset={sideOffset}
			>
				<div className='text-sm font-medium text-center text-neutral-600 pb-4'>
					Create board
				</div>
				<PopoverClose
					ref={closeRef}
					asChild
				>
					<Button
						className='h-auto w-auto p-2 absolute top-2 right-2 text-neutral-600'
						variant='ghost'
					>
						<X className='h-4 w-4' />
					</Button>
				</PopoverClose>

				<form
					action={onSubmit}
					className='space-y-4'
				>
					<div className='space-y-4'>
						<FormImagePicker
							id='image'
							errors={fieldErrors}
						/>
						<FormInput
							id='title'
							label='Board title'
							type='text'
							errors={fieldErrors}
						/>
					</div>
					<FormSubmit className='w-full'>Create</FormSubmit>
				</form>
			</PopoverContent>
		</Popover>
	)
}

export default FormPopover
