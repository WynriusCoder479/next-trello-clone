'use client'

import { VariantProps } from 'class-variance-authority'
import { Button, buttonVariants } from '../ui/button'
import { FC, HTMLAttributes, ReactNode } from 'react'
import { useFormStatus } from 'react-dom'
import { cn } from '@/lib/utils'

interface FormSubmitProps
	extends VariantProps<typeof buttonVariants>,
		HTMLAttributes<HTMLButtonElement> {
	children: ReactNode
	disabled?: boolean
}

const FormSubmit: FC<FormSubmitProps> = ({
	children,
	disabled,
	className,
	variant = 'primary'
}) => {
	const { pending } = useFormStatus()

	return (
		<Button
			disabled={pending || disabled}
			type='submit'
			variant={variant}
			size='sm'
			className={cn(className)}
		>
			{children}
		</Button>
	)
}

export default FormSubmit
