import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react';
import { CaptainDataContext } from '../context/CaptainContext';
import axios from 'axios';

const Captainlogin = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {captain,setCaptain} = useContext(CaptainDataContext)

  const navigate = useNavigate();
 const login = async (e) => {
    e.preventDefault();

    const data = {
      email: email,
      password: password,
    };

    // console.log(data);
    

    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captain/login`,data)
    // console.log(response);
    

    if(response.status == 201){
      const data = response.data;
        setCaptain(data.captain);
        localStorage.setItem('captaintoken',data.token)
        navigate('/captain-home')
    }


    setEmail('');
    setPassword('');
  };

  // console.log(captainData);
  

  return (
    <div>
      <div className='h-screen w-full px-6 gap-3 flex flex-col'>

            <h1 className='py-4 text-3xl font-medium mt-3'>Zuber</h1>
      
            <div>
                <form onSubmit={(e) => login(e)}>
                    <div className='my-3'>
                           <h1 className='font-normal mb-2'>What your Email??</h1>
                          <input className='bg-[#ededed] p-2 py-3 rounded-md px-4 text-[15px] w-full' type="email" placeholder='Email@example.com' onChange={(e) => setEmail(e.target.value)} value={email} required/>
                    </div>
                    
                    <div className='my-3'>
                           <h1 className='font-normal mb-2'>Enter Password</h1>
                          <input className='bg-[#ededed] p-2 py-3 rounded-md px-4 text-[15px] w-full' type="password" placeholder='Password' required onChange={(e) => setPassword(e.target.value)}  value={password}/>
                    </div>

                  
                  
                    <div className=' mt-8'>
                    <button className='bg-black w-full text-white py-2 font-medium text-sm rounded-lg'>Login</button> 

                    </div>
                    
                </form>

             </div>
             
             <Link to={'/captain-signup'}><button className='bg-[#dfdfdf] w-full text-[#181818] py-2 font-medium text-sm rounded-lg'>Sign in as a Captain</button> 
             </Link>

           <Link to={'/login'}>  <button className='bg-[#dfdfdf] w-full text-[#181818] py-2 font-medium text-sm rounded-lg'>Login as a User</button></Link> 
             <Link to={'/signup'}><button className='bg-[#dfdfdf] w-full text-[#181818] py-2 font-medium text-sm rounded-lg'>Signup as a User</button></Link>



      </div>
    </div>
  )
}

export default Captainlogin