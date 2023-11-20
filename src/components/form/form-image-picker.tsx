'use client'

import { defaultImages } from '@/constants/default-image'
import { unsplash } from '@/lib/unsplash'
import { cn } from '@/lib/utils'
import _ from 'lodash'
import { Check, Loader2 } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { FC, useEffect, useState } from 'react'
import { useFormStatus } from 'react-dom'
import FormErrors from './form-errors'

interface FormPickerProps {
	id: string
	errors?: Record<string, string[] | undefined>
}

const FormImagePicker: FC<FormPickerProps> = ({ id, errors }) => {
	const { pending } = useFormStatus()

	const [fetchImages, setFetchImages] =
		useState<Array<Record<string, any>>>(defaultImages)
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [selectedImageId, setSelectedImageId] = useState(null)

	useEffect(() => {
		const fetchImages = async () => {
			try {
				const result = await unsplash.photos.getRandom({
					collectionIds: ['528910'],
					count: 9
				})

				if (result && result.response) {
					const newImages = result.response as Array<Record<string, any>>

					setFetchImages(newImages)
				} else {
					console.error('Failed to get imaged from Unsplash')
				}
			} catch (error) {
				setFetchImages(defaultImages)
			} finally {
				setIsLoading(false)
			}
		}

		fetchImages
	}, [])

	if (isLoading)
		return (
			<div className='p-4 flex items-center justify-center'>
				<Loader2 className='h-6 w-6 text-sky-700 animate-spin' />
			</div>
		)

	return (
		<div className='relative'>
			<div className='grid grid-cols-3 gap-2 mb-2'>
				{_.map(fetchImages, image => (
					<div
						key={image.id}
						className={cn(
							'cursor-pointer relative aspect-video group hover:opacity-75 transition bg-muted',
							{ 'opacity-50 hover:opacity-50 cursor-auto': pending }
						)}
						onClick={() => {
							if (pending) return
							setSelectedImageId(image.id)
						}}
					>
						<input
							type='radio'
							id={id}
							name={id}
							className='hidden'
							checked={selectedImageId === image.id}
							disabled={pending}
							value={`${image.id}|${image.urls.thumb}|${image.urls.full}|${image.links.html}|${image.user.name}`}
						/>
						<Image
							src={image.urls.thumb}
							alt='Unsplash Image'
							className='object-cover rounded-sm'
							fill
						/>
						{selectedImageId === image.id ? (
							<div className='absolute inset-y-0 h-full w-full bg-black/30 flex items-center justify-center'>
								<Check className='h-4 w-4 text-white' />
							</div>
						) : null}
						<Link
							href={image.links.html}
							target='_blank'
							className='opacity-0 group-hover:opacity-100 absolute bottom-0 w-full text-[10px] truncate text-white hover:undeline p-1 bg-black/50'
						>
							{image.user.name}
						</Link>
					</div>
				))}
			</div>
			<FormErrors
				id='image'
				errors={errors}
			/>
		</div>
	)
}

export default FormImagePicker
