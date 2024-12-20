import React,{useContext, useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { CaptainDataContext } from '../context/CaptainContext'
import axios from 'axios'

const Captainsignup = () => {

  const navigate = useNavigate()

  const {captain,setCaptain} = useContext(CaptainDataContext)

  const [firstName,setFirstName] = useState('')
  const [lastName,setLastName] = useState('')
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('')

  const [vehicleColor,setVehicleColor] = useState('');
  const [vehiclePlate,setVehiclePlate] = useState('');
  const [vehicleCapacity,setVehicleCapacity] = useState('');
  const [vehicleType,setVehicleType] = useState('');



    
   async function login(e){
      e.preventDefault()

      const captainData = {
        fullname : {
          firstName : firstName,
          lastName :lastName,
        },
        email : email,
        password :password,
        vehicle :{
          color:vehicleColor,
          plate:vehiclePlate,
          capacity:vehicleCapacity,
          vehicleType:vehicleType
        }
      }

      // console.log(captainData);
      

      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captain/register`,captainData);

      if(response.status === 201){
        const data = response.data;
        setCaptain(data.captain);
        localStorage.setItem('captaintoken',data.token);
        navigate('/captain-home')
      }

      // console.log(data);
      
      setEmail('')
      setPassword('')
      setFirstName('')
      setLastName('');
      setVehicleColor('');
      setVehiclePlate('');
      setVehicleCapacity('');
      setVehicleType('')




  }


  return (
    <div>
      <div className='min-h-screen pb-8 w-full px-6 gap-3 flex flex-col'>

            <h1 className='py-4 text-3xl font-medium mt-3'>Zuber</h1>
      
            <div>
                <form onSubmit={(e) => login(e)}>


                    <div className='my-3'>
                           <h1 className='font-normal mb-2'>What your name?</h1>
                              <div className='flex gap-2'>
                                   <input className='bg-[#ededed] p-2 py-3 px-4 text-[15px] w-full rounded-md' type="text" placeholder='Firstname' onChange={(e) => setFirstName(e.target.value)} value={firstName} required/>
                                   <input className='bg-[#ededed] p-2 py-3 px-4 text-[15px] w-full rounded-md' type="text" placeholder='Lastname' onChange={(e) => setLastName(e.target.value)} value={lastName} />
                               </div>
                    </div>

                    <div className='my-3'>
                           <h1 className='font-normal mb-2'>What's your email?</h1>
                          <input className='bg-[#ededed] p-2 py-3 px-4 text-[15px] w-full rounded-md' type="email" placeholder='email@example.com' required onChange={(e) => setEmail(e.target.value)}  value={email}/>
                    </div>

                    <div className='my-3'>
                           <h1 className='font-normal mb-2'>Vehicle Information</h1>
                              <div className='  flex flex-col'>

                                <div className='flex gap-2 mb-3'>
                                <input className='bg-[#ededed] p-2 py-3 px-4  text-[15px] w-1/2 rounded-md' type="text" placeholder='Vehicle color' onChange={(e) => setVehicleColor(e.target.value)} value={vehicleColor} required/>
                                <input className='bg-[#ededed] p-2 py-3 px-4 text-[15px] w-1/2 rounded-md' type="number" placeholder='Vehicle plate' onChange={(e) => setVehiclePlate(e.target.value)} value={vehiclePlate} required/>

                                </div>
                                  
                                  <div className='flex gap-2'>
                                  <input className='bg-[#ededed] p-2 py-3 px-4 text-[15px] w-1/2 rounded-md' type="number" placeholder='Vehicle Capacity' onChange={(e) => setVehicleCapacity(e.target.value)} value={vehicleCapacity} required/>

                                  <select className='bg-[#ededed] p-2 py-3 px-4 text-[15px] w-1/2 rounded-md' type="text" placeholder='Vehicle Type' onChange={(e) => setVehicleType(e.target.value)} value={vehicleType} required>

                                      <option value="" disabled>Vehicle Type</option>
                                      <option value="car">Car</option>
                                      <option value="auto">Auto</option>
                                      <option value="motorcycle">Motorcycle</option>

                                  </select>
                                  </div>

                                  
                               </div>
                    </div>

                    
                    
                    <div className='my-3'>
                           <h1 className='font-normal mb-2'>Enter Password</h1>
                          <input className='bg-[#ededed] p-2 py-3 px-4 text-[15px] w-full rounded-md' type="password" placeholder='Password' required onChange={(e) => setPassword(e.target.value)}  value={password}/>
                    </div>

                  
                  
                    <div className=' mt-8'>
                    <button className='bg-black w-full text-white py-2 font-medium text-sm rounded-lg'>Signup</button> 

                    </div>
                    
                </form>

             </div>
             
             <Link to={'/captain-login'}><button className='bg-[#dfdfdf] w-full text-[#181818] py-2 font-medium text-sm rounded-lg'>Login as a Captain</button> </Link>
<Link to={'/login'}>
<button className='bg-[#dfdfdf] w-full text-[#181818] py-2 font-medium text-sm rounded-lg'>Login as a User</button> </Link>
          <Link to={'/signup'}>   <button className='bg-[#dfdfdf] w-full text-[#181818] py-2 font-medium text-sm rounded-lg'>Signup as a User</button> </Link>



      </div>
    </div>
  )
}

export default Captainsignup