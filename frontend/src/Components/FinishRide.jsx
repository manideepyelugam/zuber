import React from 'react'
import 'remixicon/fonts/remixicon.css'
import person from '../assets/shutterstock_648907024.webp'
import {Link} from 'react-router-dom'


const FinishRide = (props) => {
  return (
<div className='flex flex-col items-center'>

<div className='w-full'>

    <div className='flex justify-between items-center bg-yellow-400 rounded-md p-3 px-3 mb-6'>
        <div className='flex items-center gap-2'>
            <img src={person} className='h-12 w-12 rounded-full' alt="" />
            <h1 className='text-lg font-medium'>Manny</h1>
        </div>

        <h1 className='font-semibold text-xl'>5.5km</h1>
    </div>
    

     <div className='flex px-5 items-center border-b-2 py-2'>
            <h1 className='mr-5'><i className="ri-focus-3-line text-[23px]"></i></h1>
            <div>
                  <h1 className='font-semibold text-base'>543/2 93-A</h1>
                  <h5 className='font-normal text-[13px] text-[#474747]'>Kanrkan Hapi, Bhopal</h5>
            </div>
     </div>

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



    <Link onClick={() => {props.setFinishRidePanel(false)}} to='/captain-riding' className='w-full text-center bg-green-500 text-white py-1.5 font-medium rounded-md  mb-2 '>Complete Ride </Link>
   





</div>   )
}

export default FinishRide