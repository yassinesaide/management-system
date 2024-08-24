import React, { ReactNode } from 'react'

const Table = ({colums , renderRow , data}:{colums :{header:string ; accessor:string; className?:string}[];
renderRow:(item:any)=>ReactNode;
data:any[]
}) => {
  return (
    <table className='w-full mt-4'> 
        <thead>
          <tr className='text-gray-400 text-left text-sm'>
            {colums.map((col=>(
              <th key={col.accessor} className={col.className}>{col.header}</th>
            )))}
          </tr>
        </thead>
        <tbody>{data.map((item)=> renderRow(item))}</tbody>
    </table>
  )
}

export default Table