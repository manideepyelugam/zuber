import React, { useState,useContext, useEffect } from 'react'
import {Link} from 'react-router-dom'
import map from '../assets/GoogleMapTA.webp'
import CaptainDetails from '../Components/CaptainDetails'
import RidePopUp from '../Components/RidePopUp'
import ConformRidePopUp from '../Components/ConformRidePopUp'
import {CaptainDataContext} from '../context/CaptainContext'
import { SocketContext } from '../context/SocketContext';
import axios from 'axios'

const Captainhome = () => {
      const [ridePopUpPanel,setRidePopUpPanel] =useState(false)
      const [conformRidePopUp,setConformRidePopUp] = useState(false)
      const [ride,setRide] = useState(null)
      const {captain} = useContext(CaptainDataContext);
      const {socket} = useContext(SocketContext)


      useEffect(() => {
          socket.emit('join',{userType:'captain',userId : captain._id})

          const updateLocation = () => {
              if(navigator.geolocation){
                navigator.geolocation.getCurrentPosition(position => {

                
                  // console.log({
                  //   userId:captain._id,
                  //   location :{
                  //     ltd : position.coords.latitude,
                  //     lng : position.coords.longitude
                  //   }

                  // });
                  
                  
                  socket.emit('update-location-captain',{
                    userId:captain._id,
                    location :{
                      ltd : position.coords.latitude,
                      lng : position.coords.longitude
                    }

                  })
                })
              }
          }

          const locationInterval = setInterval(updateLocation,10000)
          updateLocation()

         
      },[])

      useEffect(() => {
        const handleNewRide = (data) => {
            console.log(data);
            setRide(data);  // Set the new ride data
            setRidePopUpPanel(true)
        };

        socket.on('new-ride', handleNewRide);

        // Cleanup the listener on unmount
        return () => {
            socket.off('new-ride', handleNewRide);
        }
    }, [socket]);



    async function conformRide(params) {

      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/ride/conform`,{
        rideId:ride._id,
        captainId : captain._id
      },{
        headers:{
          Authorization:`Bearer ${localStorage.getItem('captaintoken')}`
        }
      })

      

      setRidePopUpPanel(false);
      setConformRidePopUp(true)
      
    }

      


  return (
    <div>
      
    <Link to={'/captain-logout'} className='absolute top-3 px-3 right-3 bg-[#ffffff] p-2 rounded-full'><i className="ri-logout-box-r-line"></i></Link>
    <div className='h-screen w-full'>
      <img className='h-3/5 w-full object-cover' src={map} alt="" />

      <div className='h-2/5 p-4'>

        <CaptainDetails/>

      </div>

      <div className={`fixed z-10 bg-white bottom-0 w-full px-3 py-3  ${ridePopUpPanel?'translate-y-0':'translate-y-full'}`}>

        <h5 onClick={() => setRidePopUpPanel(false)} className='text-center text-2xl pb-2'><i class="ri-arrow-down-s-line"></i></h5>
        <h1 className='text-xl font-semibold mb-6'>New Ride Available</h1>

          <RidePopUp conformRide = {conformRide} ride={ride} setRidePopUpPanel={setRidePopUpPanel} setConformRidePopUp={setConformRidePopUp}/>
      </div>


        <div className={`fixed z-10 bg-white bottom-0 w-full px-3 py-3  ${conformRidePopUp ? 'translate-y-0' : 'translate-y-full'}`}>

          <h5 onClick={() => setConformRidePopUp(false)} className='text-center text-2xl pb-2'><i class="ri-arrow-down-s-line"></i></h5>
          <h1 className='text-xl font-semibold mb-6'>Conform this ride to Start</h1>

          <ConformRidePopUp setConformRidePopUp={setConformRidePopUp} setRidePopUpPanel={setRidePopUpPanel} />
        </div>
      </div>

  </div>
  )
}

export default Captainhome