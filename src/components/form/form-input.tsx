'use client'

import { HTMLAttributes, forwardRef } from 'react'
import { useFormStatus } from 'react-dom'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import FormErrors from './form-errors'
import { cn } from '@/lib/utils'

interface FormInputProps extends HTMLAttributes<HTMLInputElement> {
	label?: string
	errors?: Record<string, string[] | undefined>
	disabled?: boolean
	required?: boolean
	type?: string
}

const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
	({ ...props }, ref) => {
		const { pending } = useFormStatus()

		return (
			<div className='space-y-2'>
				<div className='space-y-1'>
					{props.label ? (
						<Label
							htmlFor={props.id}
							className='text-xs font-semibold text-neutral-700'
						>
							{props.label}
						</Label>
					) : null}
					<Input
						{...props}
						ref={ref}
						disabled={props.disabled || pending}
						required={props.required}
						type={props.type}
						name={props.id}
						className={cn('text-sm px-2 py-1 h-7', props.className)}
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

FormInput.displayName = 'FormInput'

export default FormInput
