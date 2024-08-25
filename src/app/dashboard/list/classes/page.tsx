import Pagination from '@/components/Pagination'
import Table from '@/components/Table'
import TableSearch from '@/components/TableSearch'
import { classesData, parentsData, role, subjectsData } from '@/lib/data'
import Link from 'next/link'
import React from 'react'


type Class ={
  id:number;
  name:string;
  capacity:number;
  grade:number;
  supervisor:string;
 
}

const colums=[
  {
    header:"Class Name" , accessor:"name"
  },
  {
    header:"Capacity" , accessor:"capacity" , className:"hidden md:table-cell"
  },
  {
    header:"Grade" , accessor:"grade" , className:"hidden md:table-cell"
  },
  {
    header:"Supervisor" , accessor:"supervisor" , className:"hidden md:table-cell"
  },
  
  {
    header:"Actions" , accessor:"actions" 
  },
]
  const renderRow =(item:Class)=>(
    <tr key={item.id} className='border-b border-gray-200 even:bg-slate-200  text-sm hover:bg-purple-400'>
    <td className='flex items-center gap-4 p-4 '>{item.name} </td>
       <td className='hidden md:table-cell'>{item.capacity}</td>
       <td className='hidden md:table-cell'>{item.grade}</td>
       <td className='hidden md:table-cell'>{item.supervisor}</td>

    <td className=''>
    <div className='flex items-center gap-2'>
    <Link href={`/list/teachers/${item.id}`}>
        <button className='w-7 h-7 flex items-center justify-center rounded-full  bg-sky-400'>
          <img src="/edit.png" alt="" width={16}  height={16}/>
        </button>
   
      </Link>
      <button className='w-7 h-7 flex items-center justify-center rounded-full  bg-purple-600'>
       <img src="/delete.png" alt="" width={16}  height={16}/>
     </button>
     {/* {role ==="admin"&& (
      
     )} */}
    </div>
    </td>
  </tr>
  )
   
  



const page = () => {
  return (
    <div className='bg-white p-4 rounded-md flex-1 m-4 mt-0'>
      <div className='flex items-center justify-between'>
        <h1 className='hidden md:block text-lg font-semibold'> All Classes</h1>
        <div className='flex flex-col md:flex-row items-center gap-4  w-full md:w-auto'>
            <TableSearch/> 
            <div className='flex items-center gap-4'>
              <button className='w-8 h-8 flex items-center justify-center rounded-full bg-yellow-200'>
                <img src="/filter.png" alt="" width={14} height={14} />
              </button>
              <button className='w-8 h-8 flex items-center justify-center rounded-full bg-yellow-200'>
                <img src="/sort.png" alt="" width={14} height={14} />
              </button>
            {role === "admin" && (
                  <button className='w-8 h-8 flex items-center justify-center rounded-full bg-yellow-200'>
                  <img src="/plus.png" alt="" width={14} height={14} />
                </button>
            )}
            </div>
        </div>
      </div>
      <div className=''>
        <Table colums={colums} renderRow={renderRow} data={classesData}/>
      </div>
        <Pagination/>
    </div>
  )
}

export default page