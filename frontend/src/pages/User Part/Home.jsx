import React from 'react'
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,LineChart, Line } from 'recharts';
import 
{ BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill,  BsFillBellFill}
 from 'react-icons/bs'


function Home() {

    const data = [
        {
          name: 'Page A',
          uv: 4000,
          pv: 2400,
          amt: 2400,
        },
        {
          name: 'Page B',
          uv: 3000,
          pv: 1398,
          amt: 2210,
        },
        {
          name: 'Page C',
          uv: 2000,
          pv: 9800,
          amt: 2290,
        },
       
      ];


  return (
    <>
    <main className='main-container'>
    <div className='text-center mt-8'>
      <h1 className='text-slate-900 text-3xl font-bold'>Apply Sifarish</h1>
    </div>        {/* <div className='title'>
            <h3>DASHBOARD</h3>
        </div> */}
        <div className='main-cards mt-10'>
          <a href="/abibahitSifarish">
                    <div className='card h-20  hover:bg-cyan-700 hover:text-white transition-colors duration-300 ease-in-out'> 
                        <div className='card-inner h-full flex justify-center items-center '>
                            <h3 className='text-center'>विवाह प्रमाणित गर्ने सिफारिस</h3>
                        </div>
                    </div>
                    </a>
                    <a href="/janmaDartaSifarish">
                    <div className='card h-20 hover:bg-cyan-700 hover:text-white transition-colors duration-300 ease-in-out'> 
                        <div className='card-inner h-full flex justify-center items-center '>
                            <h3 className='text-center'>जन्म दर्ता बनाउने सिफारिस</h3>
                        </div>
                    </div>
                    </a>
                    <a href="/namsariSifarish">
                    <div className='card h-20 hover:bg-cyan-700 hover:text-white transition-colors duration-300 ease-in-out'> 
                        <div className='card-inner h-full flex justify-center items-center '>
                            <h3 className='text-center'>नागरिकता प्रमाणपत्र बनाउने सिफारिस</h3>
                        </div>
                    </div>
                    </a>


       
        </div>


    </main>
    </>
  )
}

export default Home
