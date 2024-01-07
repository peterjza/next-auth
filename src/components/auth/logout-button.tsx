'user client'

import { logout } from '@/actions/logout'

interface LogoutButtonProps {
	children?: React.ReactNode
}

export const LoginOutButton = ({ children }: LogoutButtonProps) => {
	const onClick = () => {
		logout()
	}

	return <span onClick={onClick}>{children}</span>
}
