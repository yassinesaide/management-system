import React from 'react'

const Pagination = () => {
  return (
    <div className='p-4 flex items-center justify-between text-gray-400'>
      <div className='flex items-center gap-2 text-sm'>
      <button disabled className='px-4 py-2 rounded-md text-sm font-semibold disabled:opacity-50 disabled:cursor-not-allowed '>Prev</button>
        <button className='px-2 rounded-sm bg-blue-300'>1</button>
        <button className='px-2 rounded-sm'>2</button>
        <button className='px-2 rounded-sm'>3</button>
        ...
        <button className='px-2 rounded-sm'>10</button>
      </div>
        <button  className='px-4 py-2 rounded-md text-sm font-semibold disabled:opacity-50 disabled:cursor-not-allowed '>next</button>
    </div>
  )
}

export default Pagination