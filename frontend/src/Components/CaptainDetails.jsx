import React from 'react'
import person from '../assets/shutterstock_648907024.webp'
import {CaptainDataContext} from '../context/CaptainContext'
import { useContext } from 'react'


const CaptainDetails = () => {
        const {captain} = useContext(CaptainDataContext);
  
  return (
    <div>
        <div className='flex items-center justify-between'>
            
            <div className='flex items-center justify-center gap-2'>
                  <img className='h-16 w-16 rounded-full' src={person} alt="" />
                  <h3 className='font-medium text-lg text-wrap capitalize w-[160px]'>{captain.fullname.firstName+" "+captain.fullname.lastName}</h3>
            </div>
            <div>
                   <h2 className='font-semibold text-xl'>$400</h2>
                   <p>Earned</p>
            </div>
        </div>


        <div className='flex bg-gray-200 mt-8 rounded-lg items-center justify-between p-4 '>
              <div className='text-center'>
                   <i className='text-3xl mb-2 font-thin ri-timer-2-line'></i>
                   <h5 className='font-medium text-lg'>10.5</h5>
                   <p className='text-sm text-gray-600'>Hours Online</p>
              </div>

            <div className='text-center'>
              <i className='text-3xl mb-2 font-thin ri-speed-up-line'></i>
              <h5 className='font-medium text-lg'>10.5</h5>
              <p className='text-sm text-gray-600'>Hours Online</p>   
            </div>


              <div className='text-center'>
                <i className='text-3xl mb-2 font-thin ri-booklet-line'></i>
                <h5 className='font-medium text-lg'>10.5</h5>
                <p className='text-sm text-gray-600'>Hours Online</p>
                   
              </div>
        </div>
       
    </div>
  )
}

export default CaptainDetails