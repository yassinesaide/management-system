import Pagination from '@/components/Pagination'
import Table from '@/components/Table'
import TableSearch from '@/components/TableSearch'
import { classesData, examsData, parentsData, resultsData, role, subjectsData } from '@/lib/data'
import Link from 'next/link'
import React from 'react'


type Result ={
  id:number;
  subject:string;
  class:number;
  teacher:number;
  student:string;
  date:string;
  score:number;
 
}

const colums=[
  {
    header:"Subject Name" , accessor:"name"
  },
  {
    header:"Student" , accessor:"student"
  },
  {
    header:"Score" , accessor:"score"
  },
  {
    header:"Class" , accessor:"class" , className:"hidden md:table-cell"
  },
  {
    header:"Teacher" , accessor:"teacher" , className:"hidden md:table-cell"
  },
  {
    header:"Date" , accessor:"date" , className:"hidden md:table-cell"
  },
  
  {
    header:"Actions" , accessor:"actions" 
  },
]
  const renderRow =(item:Result)=>(
    <tr key={item.id} className='border-b border-gray-200 even:bg-slate-200  text-sm hover:bg-purple-400'>
    <td className='flex items-center gap-4 p-4 '>{item.subject} </td>
    <td className='hidden md:table-cell '>{item.student} </td>
    <td className=' hidden md:table-cell'>{item.score} </td>
       <td className='hidden md:table-cell'>{item.class}</td>
       <td className='hidden md:table-cell'>{item.teacher}</td>
       <td className='hidden md:table-cell'>{item.date}</td>

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
        <h1 className='hidden md:block text-lg font-semibold'> All Results</h1>
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
        <Table colums={colums} renderRow={renderRow} data={resultsData}/>
      </div>
        <Pagination/>
    </div>
  )
}

export default page