import React from 'react'
import car from '../assets/2.webp'
import 'remixicon/fonts/remixicon.css'

const WaitingForDriver = (props) => {
  return (
    <div className='flex flex-col items-center mb-10 mt-10'>

        <div className='flex w-full justify-between items-center'>
                <img src={car} className='h-28' alt="" />

                <div className='text-right'>
                        <h4 className='font-medium'>{props.ride?.captain.fullname.firstName}</h4>
                        <h1 className='font-semibold'>{props.ride?.captain.vehicle.plate}</h1>
                        <p>{props.ride?.captain.vehicle.vehicleType}</p>
                </div>
        </div>

    <div className='w-full'>
        

         <div className='flex px-5 items-center border-b-2 py-2'>
                <h1 className='mr-5'><i class="ri-focus-3-line text-[23px]"></i></h1>
                <div>
                      <h1 className='font-semibold text-base'>Pickup</h1>
                      <h5 className='font-normal text-[13px] text-[#474747]'>{props.ride?.pickup}</h5>
                </div>
         </div>

         <div className='flex px-5 items-center border-b-2 py-2'>
                <h1 className='mr-5'><i class="ri-map-pin-line text-[23px]"></i></h1>
                <div>
                      <h1 className='font-semibold text-base'>Destination</h1>
                      <h5 className='font-normal text-[13px] text-[#474747]'>{props.ride?.destination}</h5>
                </div>
         </div>   
         
         
          <div className='flex px-5 items-center border-b-2 py-2'>
                <h1 className='mr-5'><i class="ri-cash-line text-[23px]"></i></h1>
                <div>
                      <h1 className='font-semibold text-base'>Cash</h1>
                      <h5 className='font-normal text-[13px] text-[#474747]'>{props.ride?.fare}</h5>
                </div>
         </div>

    </div>

   
  </div>  )
}

export default WaitingForDriver