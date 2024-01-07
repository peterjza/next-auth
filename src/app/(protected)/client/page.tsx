'use client'

import { UserInfo } from '@/components/user-info'
import { useCurrentUser } from '@/hooks/use-current-user'

const ClientPage = () => {
	const user = useCurrentUser()
	return (
		<div className='bg-white'>
			<UserInfo
				user={user}
				label='Client Component'
			/>
		</div>
	)
}

export default ClientPage
