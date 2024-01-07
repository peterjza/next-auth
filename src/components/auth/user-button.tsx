'use client'

import { User, LogOut } from 'lucide-react'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { useCurrentUser } from '@/hooks/use-current-user'
import { LoginOutButton } from '@/components/auth/logout-button'

export const UserButton = () => {
	const user = useCurrentUser()

	return (
		<DropdownMenu>
			<DropdownMenuTrigger>
				<Avatar>
					<AvatarImage src={user?.image || ''}></AvatarImage>
					<AvatarFallback className='bg-black'>
						<User className='text-white' />
					</AvatarFallback>
				</Avatar>
			</DropdownMenuTrigger>
			<DropdownMenuContent
				className='w-40'
				align='end'
			>
				<LoginOutButton>
					<DropdownMenuItem>
						<LogOut className='h-4 w-4 mr-2'></LogOut>
						Logout
					</DropdownMenuItem>
				</LoginOutButton>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
