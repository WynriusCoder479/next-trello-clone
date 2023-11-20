import { PropsWithChildren } from 'react'
import { ClerkProvider } from '@clerk/nextjs'
import { Toaster } from 'sonner'

const PlayformLayout = ({ children }: PropsWithChildren) => {
	return (
		<ClerkProvider>
			<Toaster />
			{children}
		</ClerkProvider>
	)
}

export default PlayformLayout
