import React from 'react'
import {Link} from 'react-router-dom'
const Home = () => {
  return (
    <div className='flex items-center justify-center'>
        <div className='h-screen w-[400px] flex justify-between flex-col py-6'>
                <h1 className='py-4 text-3xl font-medium px-7'>Zuber</h1>

                <div className='px-2'>
                    <h2 className='text-2xl font-semibold px-2 py-4'>Get started with Zuber</h2>
                   <Link to={'/login'}><button className='bg-black w-full text-white py-2 font-medium rounded-lg'>Continue</button> </Link>
                    
                </div>

        </div>
    </div>
  )
}

export default Home