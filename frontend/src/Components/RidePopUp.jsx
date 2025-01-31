import React from 'react'
import car from '../assets/2.webp'
import 'remixicon/fonts/remixicon.css'
import person from '../assets/shutterstock_648907024.webp'


const RidePopUp = (props) => {
  return (
    <div className='flex flex-col items-center'>

    <div className='w-full'>

        <div className='flex justify-between items-center bg-yellow-400 rounded-md p-3 px-3 mb-6'>
            <div className='flex items-center gap-2'>
                <img src={person} className='h-12 w-12 rounded-full' alt="" />
                <h1 className='text-lg font-medium'>{props.ride?.user.fullname.firstname}</h1>
            </div>

            <h1 className='font-semibold text-xl'>5.5km</h1>
        </div>
        

         <div className='flex px-5 items-center border-b-2 py-2'>
                <h1 className='mr-5'><i className="ri-focus-3-line text-[23px]"></i></h1>
                <div>
                      <h1 className='font-semibold text-base'>Pickup </h1>
                      <h5 className='font-normal text-[13px] text-[#474747]'>{props.ride?.pickup}</h5>
                </div>
         </div>

         <div className='flex px-5 items-center border-b-2 py-2'>
                <h1 className='mr-5'><i className="ri-map-pin-line text-[23px]"></i></h1>
                <div>
                      <h1 className='font-semibold text-base'>Destination</h1>
                      <h5 className='font-normal text-[13px] text-[#474747]'>{props.ride?.destination}</h5>
                </div>
         </div>   
         
         
          <div className='flex px-5 items-center border-b-2 py-2'>
                <h1 className='mr-5'><i className="ri-cash-line text-[23px]"></i></h1>
                <div>
                      <h1 className='font-semibold text-base'>Fare</h1>
                      <h5 className='font-normal text-[13px] text-[#474747]'>{props.ride?.fare}</h5>
                </div>
         </div>

    </div>

          <div className='flex items-center justify-between w-8/12 mt-5 mb-5'>
              <button className=' bg-green-500 text-white py-2 px-5 font-medium rounded-md ' onClick={() => { props.setConformRidePopUp(true) ,props.conformRide() }}>Accept</button>
              <button onClick={() => {
                  props.setRidePopUpPanel(false)
              }} className=' bg-red-500 text-white py-2 px-5 font-medium rounded-md '>Ignore </button>

          </div>
   
  </div> 
   )
}

export default RidePopUp