'use client'

import { HTMLAttributes, forwardRef } from 'react'
import { useFormStatus } from 'react-dom'
import { Label } from '../ui/label'
import { Textarea } from '../ui/textarea'
import { cn } from '@/lib/utils'
import FormErrors from './form-errors'

interface FormTextareaProps extends HTMLAttributes<HTMLTextAreaElement> {
	label?: string
	errors?: Record<string, string[] | undefined>
	disabled: boolean
	required: boolean
}

const FormTextarea = forwardRef<HTMLTextAreaElement, FormTextareaProps>(
	({ ...props }, ref) => {
		const { pending } = useFormStatus()

		return (
			<div className='space-y-2 w-full'>
				<div className='space-y-1 w-full'>
					{props.label ? (
						<Label
							htmlFor={props.id}
							className='text-xs font-semibold text-neutral-700'
						>
							{props.label}
						</Label>
					) : null}
					<Textarea
						{...props}
						disabled={props.disabled || pending}
						required={props.required}
						ref={ref}
						className={cn(
							'resize-none focus-visible:ring-0 focus-visible:ring-offset-0 ring-0 focus:ring-0 outline-none shadow-sm',
							props.className
						)}
						aria-describedby={`${props.id}-error`}
					/>
				</div>
				<FormErrors
					id={props.id!}
					errors={props.errors}
				/>
			</div>
		)
	}
)

FormTextarea.displayName = 'FormTextarea'

export default FormTextarea
