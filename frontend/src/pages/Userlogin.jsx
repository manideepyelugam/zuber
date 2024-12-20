import React, { useEffect, useState,useContext } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import { UserContextData } from '../context/UserContext';

const Userlogin = () => {

  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('')
  const [data,setData] = useState({});

  const {user,setUser} = useContext(UserContextData)
  const navigate = useNavigate()
    
   async function login(e){
      e.preventDefault()


      const userData = ({
        email : email,
        password :password 
      })

      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/user/login`,userData);

      if(response.status === 200){
        const data = response.data;
        setUser(data.user);
        localStorage.setItem('usertoken',data.token)

        navigate('/home')
      }

      // console.log(data);
      
      setEmail('')
      setPassword('')
      
  }

  

  return (
    <div>
      <div className='h-screen w-full px-6 gap-3 flex flex-col'>

            <h1 className='py-4 text-3xl font-medium mt-3'>Zuber</h1>
      
            <div>
                <form onSubmit={(e) => login(e)}>
                    <div className='my-3'>
                           <h1 className='font-normal mb-2'>What your Email??</h1>
                          <input className='bg-[#ededed] p-2 py-3 px-4 rounded-md text-[15px] w-full' type="email" placeholder='Email@example.com' onChange={(e) => setEmail(e.target.value)} value={email} required/>
                    </div>
                    
                    <div className='my-3'>
                           <h1 className='font-normal mb-2'>Enter Password</h1>
                          <input className='bg-[#ededed] p-2 py-3 px-4 rounded-md text-[15px] w-full' type="password" placeholder='Password' required onChange={(e) => setPassword(e.target.value)}  value={password}/>
                    </div>

                  
                  
                    <div className=' mt-8'>
                    <button className='bg-black w-full text-white py-2 font-medium text-sm rounded-lg'>Login</button> 

                    </div>
                    
                </form>

             </div>

            <Link to={'/signup'}> <button className='bg-[#dfdfdf] w-full text-[#181818] py-2 font-medium text-sm rounded-lg'>Signup Now</button> </Link>
           <Link to={'/captain-signup'}><button className='bg-[#dfdfdf] w-full text-[#181818] py-2 font-medium text-sm rounded-lg'>Sign in as a Captain</button> </Link>
             <Link to={'/captain-login'}><button className='bg-[#dfdfdf] w-full text-[#181818] py-2 font-medium text-sm rounded-lg'>Log in as a Captain</button> </Link>



      </div>
    </div>
  )
}

export default Userlogin