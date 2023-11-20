'use client'

import React, { FC, PropsWithChildren, useEffect, useState } from 'react'

const CLientOnly: FC<PropsWithChildren> = ({ children }) => {
	const [isMounted, setIsMounted] = useState<boolean>(false)

	useEffect(() => {
		setIsMounted(true)
	}, [])

	if (!isMounted) return null

	return <>{children}</>
}

export default CLientOnly
