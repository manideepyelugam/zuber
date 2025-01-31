import React from 'react'
import car from '../assets/2.webp'
import auto from '../assets/Uber_Auto_558x372_pixels_Desktop.webp'
import bike from '../assets/Uber_Moto_558x372_pixels_Desktop.webp'

const Vehicles = (props) => {
  return (
    <div>
             <div  onClick={() => {
                props.setVehiclePanel(false)
                props.setRidePanel(true)
                props.setVehicleType('motorcycle')
             }} className='flex bg-white justify-between active:border-black border-2 rounded-lg  items-center p-3 mb-3'>
                <img src={car} className='h-10' alt="" />
                <div className='w-1/2'>
                       <h3 className='font-semibold text-base '>Uber Go</h3>
                       <h4 className='text-sm font-medium'>2 mins away</h4>
                       <p className='text-sm font-normal text-[#888888]'>Affordable</p>
                </div>
                <h2 className=' text-center font-semibold text-lg'>{props.fare.car}</h2>
           </div>

           <div onClick={() => {
            props.setVehiclePanel(false)
            props.setRidePanel(true)
            props.setVehicleType('auto')
           }} className='flex bg-white justify-between active:border-black border-2 rounded-lg  items-center p-3 mb-3'>

                <img src={auto} className='h-10' alt="" />

                <div className='w-1/2'>
                       <h3 className='font-semibold text-base '>Uber Go</h3>
                       <h4 className='text-sm font-medium'>3 mins away</h4>
                       <p className='text-sm font-normal text-[#888888]'>Affordable and easy</p>
                </div>

                <h2 className=' text-center font-semibold text-lg'>{props.fare.auto}</h2>

           </div>

           <div onClick={() => {
            props.setVehiclePanel(false)
            props.setRidePanel(true)
            props.setVehicleType('car')

           }} className='flex bg-white justify-between active:border-black border-2 rounded-lg  items-center p-3 mb-3' >

                <img src={bike} className='h-10' alt="" />

                <div className='w-1/2'>
                       <h3 className='font-semibold text-base '>Uber Go</h3>
                       <h4 className='text-sm font-medium'>5 mins away</h4>
                       <p className='text-sm font-normal text-[#888888]'> Comfortable</p>
                </div>

                <h2 className=' text-center font-semibold text-lg'>{props.fare.motorcycle}</h2>

           </div>  
    </div>
  )
}

export default Vehicles