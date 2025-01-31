import React from 'react'
import car from '../assets/2.webp'
import 'remixicon/fonts/remixicon.css'

const LookingForDriver = (props) => {
  return (
    <div className='flex flex-col items-center'>
    <img src={car} className='h-40' alt="" />

    <div className='w-full'>
        

         <div className='flex px-5 items-center border-b-2 py-2'>
                <h1 className='mr-5'><i class="ri-focus-3-line text-[23px]"></i></h1>
                <div>
                      <h1 className='font-semibold text-base'>Pickup</h1>
                      <h5 className='font-normal text-[13px] text-[#474747]'>{props.pickuploc}</h5>
                </div>
         </div>

         <div className='flex px-5 items-center border-b-2 py-2'>
                <h1 className='mr-5'><i class="ri-map-pin-line text-[23px]"></i></h1>
                <div>
                      <h1 className='font-semibold text-base'>Destination</h1>
                      <h5 className='font-normal text-[13px] text-[#474747]'>{props.destination}</h5>
                </div>
         </div>   
         
         
          <div className='flex px-5 items-center border-b-2 py-2'>
                <h1 className='mr-5'><i class="ri-cash-line text-[23px]"></i></h1>
                <div>
                      <h1 className='font-semibold text-base'>Amount</h1>
                      <h5 className='font-normal text-[13px] text-[#474747]'>{props.fare[props.vehicleType]}</h5>
                </div>
         </div>

    </div>

    {/* <button className='w-full bg-green-500 text-white py-1.5 font-medium rounded-md mt-9 mb-4 '>Conform Ride</button> */}
  </div>
  )
}

export default LookingForDriver