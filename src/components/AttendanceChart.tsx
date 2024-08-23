"use client"    
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  {
    name: 'Mon',
    present: 500,
    absent: 300,
  },
  {
    name: 'Tue',
    present: 320,
    absent: 250,
  },
  {
    name: ' Wed',
    present: 490,
    absent: 260,
  },
  {
    name: 'Thru',
    present: 330,
    absent: 150,
   
  },
  {
    name: 'Fri ',
    present: 550,
    absent: 400,
   
  },
];



const AttendanceChart = () => {
  return (
    <div className='bg-white rounded-lg p-4 h-full'>
        <div className='flex justify-between items-center'>
            <h1 className='text-lg font-semibold'>Attendance</h1>
            <img src="/moreDark.png" alt=""  width={20} height={20}/>
        </div>
        <ResponsiveContainer width="100%" height="90%">
        <BarChart
          width={500}
          height={300}
          data={data}
          barSize={20}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke='#ddd'/>
          <XAxis dataKey="name" axisLine={false} tick={{fill:"#d1d5db"}} tickLine={false} />
          <YAxis axisLine={false}  tick={{fill:"#d1d5db"}} tickLine={false} />
          <Tooltip contentStyle={{borderRadius:"10px" , borderColor:"lightgray"}} />
          <Legend align='left' verticalAlign='top' wrapperStyle={{paddingTop:"20px" , paddingBottom:"40px"}}  />
          <Bar dataKey="present" fill="blue" legendType='circle' radius={[10 , 10 , 0 , 0]}  />
          <Bar dataKey="absent" fill="yellow" legendType='circle' radius={[10 , 10 , 0 , 0]}   />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default AttendanceChart