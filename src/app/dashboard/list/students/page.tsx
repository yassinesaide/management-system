import Pagination from '@/components/Pagination'
import Table from '@/components/Table'
import TableSearch from '@/components/TableSearch'
import { role, studentsData } from '@/lib/data'
import Link from 'next/link'
import React from 'react'


type Student ={
  id:number;
  studentId:number;
  name:string;
  email?:string;
  photo:string;
  phone:string;
  grade:number;
  class :string;
  address:string;
}

const colums=[
  {
    header:"info" , accessor:"info"
  },
  {
    header:"Student ID" , accessor:"studentId" , className:"hidden md:table-cell"
  },
  {
    header:"Grade" , accessor:"grade" , className:"hidden md:table-cell"
  },
  {
    header:"Phone" , accessor:"phone" , className:"hidden md:table-cell"
  },
  {
    header:"Adress" , accessor:"adress" , className:"hidden md:table-cell"
  },
  {
    header:"Actions" , accessor:"actions" 
  },
]
  const renderRow =(item:Student)=>(
    <tr key={item.id} className='border-b border-gray-200 even:bg-slate-200  text-sm hover:bg-purple-400'>
    <td className='flex items-center gap-4 p-4 '>
      <img src={item.photo} alt="" width={40} height={40}  className='md:hidden xl:block w-10 h-10 rounded-full object-cover' />
      <div className='flex flex-col'>
      <h3 className='font-semibold'>{item.name}</h3>
      <p className='text-xs text-gray-500'>{item?.class}</p>
    </div>
    </td>
    <td className='hidden md:table-cell'>{item.studentId}</td>
    <td className='hidden md:table-cell'>{item.grade}</td>
    <td className='hidden md:table-cell'>{item.phone}</td>
    <td className='hidden md:table-cell'>{item.address}</td>
    <td className=''>
    <div className='flex items-center gap-2'>
    <Link href={`/list/teachers/${item.id}`}>
        <button className='w-7 h-7 flex items-center justify-center rounded-full  bg-sky-400'>
          <img src="/view.png" alt="" width={16}  height={16}/>
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
        <h1 className='hidden md:block text-lg font-semibold'> All Students</h1>
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
        <Table colums={colums} renderRow={renderRow} data={studentsData}/>
      </div>
        <Pagination/>
    </div>
  )
}

export default page