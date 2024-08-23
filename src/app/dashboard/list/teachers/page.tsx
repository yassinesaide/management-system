import Pagination from '@/components/Pagination'
import Table from '@/components/Table'
import TableSearch from '@/components/TableSearch'
import React from 'react'

const page = () => {
  return (
    <div className='bg-white p-4 rounded-md flex-1 m-4 mt-0'>
      <div className='flex items-center justify-between'>
        <h1 className='hidden md:block text-lg font-semibold'> All teachers</h1>
        <div className='flex flex-col md:flex-row items-center gap-4  w-full md:w-auto'>
            <TableSearch/> 
            <div className='flex items-center gap-4'>
              <button className='w-8 h-8 flex items-center justify-center rounded-full bg-yellow-200'>
                <img src="/filter.png" alt="" width={14} height={14} />
              </button>
              <button className='w-8 h-8 flex items-center justify-center rounded-full bg-yellow-200'>
                <img src="/sort.png" alt="" width={14} height={14} />
              </button>
              <button className='w-8 h-8 flex items-center justify-center rounded-full bg-yellow-200'>
                <img src="/plus.png" alt="" width={14} height={14} />
              </button>
            </div>
        </div>
      </div>
      <div className=''>
        <Table/>
      </div>
        <Pagination/>
    </div>
  )
}

export default page