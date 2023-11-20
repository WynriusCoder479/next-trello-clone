import React, { PropsWithChildren } from 'react'
import OrgControl from './_components/utils/org-control'

const OrganizationIdLayout = ({ children }: PropsWithChildren) => {
	return (
		<>
			<OrgControl />
			{children}
		</>
	)
}

export default OrganizationIdLayout
