import React, { useContext, useEffect, useState } from 'react'
import map from '../assets/GoogleMapTA.webp'
import 'remixicon/fonts/remixicon.css'
import Location from '../Components/Location';
import axios from 'axios'
import Vehicles from '../Components/Vehicles';
import Ride from '../Components/Ride';
import LookingForDriver from '../Components/LookingForDriver';
import WaitingForDriver from '../Components/WaitingForDriver';
import { SocketContext } from '../context/SocketContext';
import { UserContextData } from '../context/UserContext';



const Start = () => {


        const {socket} = useContext(SocketContext)
        const {user} = useContext(UserContextData)

        const [pickuploc,setPickupLoc] = useState('');
        const [destination,setDestination] = useState('');
        const [up,setUp] = useState(false)
        const [vehiclePanel,setVehiclePanel] = useState(false)
        const [ridePanel,setRidePanel] = useState(false)
        const [conformRide,setConformRide] = useState(false)
        const [res,setRes] = useState([])
        const [type,setType] = useState()
        const [locationName,setLocationName] = useState([])
        const [fare,setFare] = useState({})
        const [vehicleType,setVehicleType] = useState(null)
        const [waitingForDriver,setWaitingForDriver] = useState(false)
        const [ride,setRide] = useState(null)
        const [vehicleFound,setVehicleFound] = useState(false)


        useEffect(() => {
             socket.emit('join',{ userType : 'user',userId : user._id})
        },[user])


      function validateInput(input) {
          if (typeof input !== 'string') {
              throw new Error('Input must be a string.');
          }
      }

     async function fetchSuggestions(input,type) {
          try {
            // Validate the input
            validateInput(input);
    
            // Make the API request if validation passes
            const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`, {
                params: { input },
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('usertoken')}`,
                },
            });
    
            setType(type)
            // Handle response
            // console.log(`${type} Suggestions:`, res.data);
            
            setRes(res.data)
          } catch (error) {
            console.error('Error:', error.message);
        }
              
        }

        useEffect(() => {
          if(pickuploc.length >= 3){
            fetchSuggestions(pickuploc,"pickup")
          }
        },[pickuploc])

        useEffect(() => {
          if(destination.length >= 3){
            fetchSuggestions(destination,"destination")
          }
        },[destination])


        useEffect(() => {
          if (locationName.length > 0) {
              const [name, type] = locationName;
              if (type === 'pickup') {
                  setPickupLoc(name);
              } else {
                  setDestination(name);
              }
          }
      }, [locationName]);


      useEffect(() => {
          socket.on('ride-conformed',ride => {
            console.log(ride);
            
            setRide(ride)
            setVehicleFound(true)
          })
      },[])


      async function getFare (){
           setUp(false)
           setVehiclePanel(true)

           const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/ride/get-fare`,{
                params : {pickuploc,destination},
                headers : {
                  Authorization: `Bearer ${localStorage.getItem('usertoken')}`,
                }
           })
           setFare(res.data)   
      }



      async function createRide() {
       
            const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/ride/create`,{
                 pickuploc,destination,vehicleType
            },{
                headers:{
                  Authorization: `Bearer ${localStorage.getItem('usertoken')}`
                }
            })

            // console.log(res.data);
            
      }
      


  return (
    <div className='relative'>
      <h1 className='font-medium text-3xl absolute left-3 top-5'>Zuber</h1>

      <div className='h-screen w-full '>
        <img className='h-full w-full object-cover' src={map} alt="" />
      </div>


      <div className='h-screen absolute flex flex-col justify-end bottom-0 '>

        <h5 onClick={e => setUp(false)} className={`${up?'flex' : 'hidden'}`}><i className="absolute text-3xl right-2 mt-2.5 ri-arrow-down-s-line"></i></h5>

        <div className='h-[35%] bg-white p-3'>
        <h3 className='font-medium text-lg pb-4 pt-2 '>Find a trip</h3>
           <form action="">
                        <input onClick={e => setUp(true)} onChange={(e) => setPickupLoc(e.target.value)} value={pickuploc} className='bg-[#eeeeee] rounded-lg px-2 mb-4 p-2 w-full' type="text" placeholder='Pick-up location'/>
                        <input onClick={e => setUp(true)} onChange={(e) => setDestination(e.target.value)} value={destination} className='bg-[#eeeeee] px-2 mb-3 rounded-lg p-2 w-full' type="text" placeholder='Destination'/>
           </form>
           <button className='w-full py-2 bg-black text-white mt-2 rounded-md text-sm' onClick={() => {
               getFare()
           }}>Find a Trip</button>
        </div>

        <div className={`h-[65%] ${!up?'hidden' : 'flex'} bg-white`}>
                <Location type={type} setLocationName={setLocationName} res={res} setUp={setUp} setVehiclePanel={setVehiclePanel}/>
        </div>
       
      </div>

      <div className={`fixed z-10 bg-white bottom-0 w-full px-3 py-3 ${vehiclePanel ? 'translate-y-0' : 'translate-y-full'} `}>

        <h5 onClick={() => setVehiclePanel(false)} className='text-center text-2xl pb-2'><i class="ri-arrow-down-s-line"></i></h5>
        <h1 className='text-xl font-semibold mb-6'>Choose your vehicle</h1>

        <Vehicles setVehicleType={setVehicleType} fare={fare} setVehiclePanel={setVehiclePanel} setRidePanel={setRidePanel} />

      </div>

      <div className={`fixed z-10 bg-white bottom-0 w-full px-3 py-3 ${ridePanel ? 'translate-y-0' : 'translate-y-full'} `}>

        <h5 onClick={() => setRidePanel(false)} className='text-center text-2xl pb-2'><i class="ri-arrow-down-s-line"></i></h5>
        <h1 className='text-xl font-semibold mb-6'>Conform your ride</h1>

        <Ride createRide={createRide} pickuploc={pickuploc} destination={destination} fare={fare} vehicleType={vehicleType} setConformRide={setConformRide} setVehiclePanel={setVehiclePanel} setRidePanel={setRidePanel} />

      </div>


      <div className={`fixed z-10 bg-white bottom-0 w-full px-3 py-3 ${conformRide ? 'translate-y-0' : 'translate-y-full'} `}>

        <h5 onClick={() => setConformRide(false)} className='text-center text-2xl pb-2'><i class="ri-arrow-down-s-line"></i></h5>
        <h1 className='text-xl font-semibold mb-6'>Looking for a Ride</h1>

        <LookingForDriver setVehicleFound ={setVehicleFound} pickuploc={pickuploc} destination={destination} fare={fare} vehicleType={vehicleType}/>
      </div>


        <div className={`fixed z-10 bg-white bottom-0 w-full px-3 py-3 ${vehicleFound?'translate-y-0' : 'translate-y-full'} `}>

            <h5 onClick={() => setConformRide(false)} className='text-center text-2xl pb-2'><i class="ri-arrow-down-s-line"></i></h5>

            <WaitingForDriver  ride={ride}
                    setWaitingForDriver={setWaitingForDriver}
                    waitingForDriver={waitingForDriver} />
      </div>






    </div>
  )
}

export default Start

