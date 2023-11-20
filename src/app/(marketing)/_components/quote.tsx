'use client'

import React from 'react'
import { TypeAnimation } from 'react-type-animation'

const Quote = () => {
	return (
		<div className='max-w-xs md:max-w-2xl h-20 '>
			<TypeAnimation
				preRenderFirstString={true}
				speed={75}
				sequence={[
					500,
					'Collaborate, manage projects, and reach new productivity peaks. From high rises to the home office, the way your team works is unique - accomplish it all with Taskify.',
					5000,
					''
				]}
				repeat={Infinity}
				className='text-lg text-neutral-400 mt-8  mx-auto'
			/>
		</div>
	)
}

export default Quote
