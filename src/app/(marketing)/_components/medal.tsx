import { MedalIcon } from 'lucide-react'

const Medal = () => {
	return (
		<div className='mb-4 flex items-center justify-center leading-none tracking-widest border shadow-sm p-4 bg-amber-100 hover:bg-amber-300/50 transition-all ease-out duration-200 text-amber-700 rounded-full uppercase'>
			<MedalIcon className='h-6 w-6 mr-2' />
			No 1 task managment
		</div>
	)
}

export default Medal
