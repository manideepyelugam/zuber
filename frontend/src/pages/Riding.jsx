import React from 'react'
import map from '../assets/GoogleMapTA.webp'
import car from '../assets/2.webp'
import {Link} from 'react-router-dom'



const Riding = () => {
  return (
    <div>
      
      <Link to={'/home'} className='absolute top-3 px-3 right-3 bg-[#ffffff] p-2 rounded-full'><i className="ri-home-5-line text-xl"></i></Link>
      <div className='h-screen w-full'>
        <img className='h-1/2 w-full object-cover' src={map} alt="" />

        <div className='h-1/2 p-4'>

          <div className='flex w-full justify-between items-center'>
            <img src={car} className='h-28' alt="" />

            <div className='text-right'>
              <h4 className='font-medium'>Nancy</h4>
              <h1 className='font-semibold'>TS 04 CE 4323</h1>
              <p>Matruti Alto</p>
            </div>
          </div>

          <div className='w-full'>

            <div className='flex px-5 items-center border-b-2 py-2'>
              <h1 className='mr-5'><i className="ri-map-pin-line text-[23px]"></i></h1>
              <div>
                <h1 className='font-semibold text-base'>543/2 93-A</h1>
                <h5 className='font-normal text-[13px] text-[#474747]'>Kanrkan Hapi, Bhopal</h5>
              </div>
            </div>


            <div className='flex px-5 items-center border-b-2 py-2'>
              <h1 className='mr-5'><i className="ri-cash-line text-[23px]"></i></h1>
              <div>
                <h1 className='font-semibold text-base'>543/2 93-A</h1>
                <h5 className='font-normal text-[13px] text-[#474747]'>Kanrkan Hapi, Bhopal</h5>
              </div>
            </div>

          </div>


          <button className='w-full bg-green-500 text-white py-1.5 font-medium rounded-md mt-9 mb-4'>Make Payment</button>

        </div>
      </div>

    </div>
  )
}

export default Riding