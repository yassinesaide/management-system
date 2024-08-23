import React from 'react'

const Announcements = () => {
  return (
    <div className="bg-white p-4 rounded-md ">
        <div className='flex items-center justify-between'>
            <h1 className='text-xl font-semibold'>Announcements</h1>
            <span className='text-xs text-gray-300'>View All</span>
            </div> 
            <div className='flex flex-col gap-4 mt-4'>
            <div className='bg-sky-200 rounded-md p-4'>
                <div className='flex items-center justify-between'>
                    <h2 className='font-medium'>Lorem ipsum dolor sit amet.</h2>
                    <span className='text-xs text-gray-300 bg-white rounded-md px-1 py-1'>2025/01/01</span>
                </div>
                <p className='text-sm text-gray-400'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis, blanditiis?</p>
            </div>
            </div>
            <div className='flex flex-col gap-4 mt-4'>
            <div className='bg-purple-200 rounded-md p-4'>
                <div className='flex items-center justify-between'>
                    <h2 className='font-medium'>Lorem ipsum dolor sit amet.</h2>
                    <span className='text-xs text-gray-300 bg-white rounded-md px-1 py-1'>2025/01/01</span>
                </div>
                <p className='text-sm text-gray-400'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis, blanditiis?</p>

            </div>
            </div>
            <div className='flex flex-col gap-4 mt-4'>
            <div className='bg-yellow-200 rounded-md p-4'>
                <div className='flex items-center justify-between'>
                    <h2 className='font-medium'>Lorem ipsum dolor sit amet.</h2>
                    <span className='text-xs text-gray-300 bg-white rounded-md px-1 py-1'>2025/01/01</span>
                </div>
                <p className='text-sm text-gray-400'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis, blanditiis?</p>

            </div>
            </div>
    </div>
  )
}

export default Announcements 