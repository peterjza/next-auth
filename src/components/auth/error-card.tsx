'use client'
import { CardWrapper } from './card-wrapper'
import { AlertTriangle } from 'lucide-react'

export const ErrorCard = () => {
	return (
		<CardWrapper
			headerLabel='Oops! Something went wrong!'
			backButtonHref='/auth/login'
			backButtonLabel='Back to login'
		>
			<div className='w-full flex items-center justify-center'>
				<AlertTriangle className='text-destructive' />
			</div>
		</CardWrapper>
	)
}
