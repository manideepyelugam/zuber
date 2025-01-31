import React, { useState } from 'react'
import map from '../assets/GoogleMapTA.webp'
import {Link} from 'react-router-dom'
import 'remixicon/fonts/remixicon.css'
import FinishRide from '../Components/FinishRide'


const CaptainRiding = () => {
    const [finishRidePanel,setFinishRidePanel] = useState(false)
  return (
    <div>
      
    <Link to={'/captain-logout'} className='absolute top-3 px-3 right-3 bg-[#ffffff] p-2 rounded-full'><i className="ri-logout-box-r-line"></i></Link>
    <div className='h-screen w-full'>
      <img className='h-4/5 w-full object-cover' src={map} alt="" />

      <div className='h-1/5 p-4 relative flex items-center justify-between'>
            
            <h1 onClick={() => setFinishRidePanel(true)} className={`absolute text-2xl top-2 right-1/2 ${finishRidePanel? "hidden" : "block"}`}><i class="ri-arrow-up-s-line"></i></h1>

            <h2 className='text-lg font-medium'>5Km Away</h2>
            <button className='bg-green-500 text-white py-2 px-5 font-medium rounded-md'>Complete Ride</button>

      </div>

        <div className={`fixed z-10 bg-white bottom-0 w-full px-3 py-3  ${finishRidePanel ? 'translate-y-0' : 'translate-y-full'}`}>

                  <h5  className={`text-center text-2xl pb-2  `}><i class="ri-arrow-down-s-line"></i></h5>
                  <h1 className='text-xl font-semibold mb-6'>Finish this ride</h1>

                  <FinishRide setFinishRidePanel={setFinishRidePanel}/>

        </div>

      </div>

  </div>
  )
}

export default CaptainRiding