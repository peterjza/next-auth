import { Poppins } from 'next/font/google'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { LoginButton } from '@/components/auth/login-button'

const font = Poppins({
	subsets: ['latin'],
	weight: ['600'],
})

export default function Home() {
	return (
		<main className='flex items-center justify-center h-full bg-gray-700'>
			<div className='space-y-6 text-center'>
				<h1
					className={cn(
						'text-6xl font-semi text-white drop-shadow-md',
						font.className
					)}
				>
					Auth
				</h1>

				<p className='text-white text-lg'>
					A simple authentication service
				</p>

				<div>
					<LoginButton
						mode='modal'
						asChild
					>
						<Button
							variant='secondary'
							size='lg'
						>
							Sign In
						</Button>
					</LoginButton>
				</div>
			</div>
		</main>
	)
}
