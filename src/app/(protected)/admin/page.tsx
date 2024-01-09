'use client'

import { admin } from '@/actions/admin'
import { RoleGate } from '@/components/auth/role-gate.tsx'
import { FormSuccess } from '@/components/form-success'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardContent } from '@/components/ui/card'
import { UserRole } from '@prisma/client'
import { toast } from 'sonner'

export const AdminPage = async () => {
	const onServerActionClick = () => {
		admin().then(data => {
			if (data.error) {
				toast.error(data.error)
			}

			if (data.success) {
				toast.success(data.success)
			}
		})
	}

	const onApiRouteClick = () => {
		fetch('/api/admin').then(response => {
			if (response.ok) {
				toast.success('Allowed API route')
			} else {
				toast.error('Forbidden API route')
			}
		})
	}

	return (
		<Card className='w-[600px]'>
			<CardHeader>
				<p className='text-2-xz font-semibold text-center'> admin</p>
			</CardHeader>
			<CardContent className='space-y-4'>
				<RoleGate allowRole={UserRole.ADMIN}>
					<FormSuccess message='You are allowed to see this content'></FormSuccess>
				</RoleGate>
				<div className='flex flex-row items-center justify-between rounded-lg border p-3 shadow-md'>
					<p className='text-sm font-medium'>Admin only API route</p>
					<Button onClick={onApiRouteClick}>Click to test</Button>
				</div>

				<div className='flex flex-row items-center justify-between rounded-lg border p-3 shadow-md'>
					<p className='text-sm font-medium'>
						Admin only API Server action
					</p>
					<Button onClick={onServerActionClick}>Click to test</Button>
				</div>
			</CardContent>
		</Card>
	)
}

export default AdminPage
