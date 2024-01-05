import { auth } from '@/auth'

const SettingsPage = async () => {
	const session = await auth()
	return <h1>{JSON.stringify(session)}</h1>
}

export default SettingsPage
