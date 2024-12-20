import React,{useContext, useState} from 'react'
import { Link,useNavigate} from 'react-router-dom'
import axios from 'axios'
import { UserContextData} from '../context/UserContext'

const Usersignup = () => {

  const [firstName,setFirstName] = useState('')
  const [lastName,setLastName] = useState('')
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('')
  // const [data,setData] = useState({});

  const {user,setUser} = useContext(UserContextData);

  const navigate = useNavigate()
    
    async function login(e){
      e.preventDefault()

      const newUser = {
        fullname : {
          firstname : firstName,
          lastname :lastName,
        },
        email : email,
        password :password 
      }

      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/user/register`,newUser)

      if(response.status === 200){
          const data = response.data;
          setUser(data.user);
          localStorage.setItem('usertoken',data.token)
          navigate('/home')
      }



      // setData(data)
      // console.log(data);
      
      setEmail('')
      setPassword('')
      setFirstName('')
      setLastName('')

  }


  return (
    <div>
      <div className='h-screen w-full px-6 gap-3 flex flex-col'>

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
                           <h1 className='font-normal mb-2'>Enter Password</h1>
                          <input className='bg-[#ededed] p-2 py-3 px-4 text-[15px] w-full rounded-md' type="password" placeholder='Password' required onChange={(e) => setPassword(e.target.value)}  value={password}/>
                    </div>

                  
                  
                    <div className=' mt-8'>
                    <button  className='bg-black w-full text-white py-2 font-medium text-sm rounded-lg'>Signup</button> 

                    </div>
                    
                </form>

             </div>
             
             <Link to={'/captain-signup'}><button className='bg-[#dfdfdf] w-full text-[#181818] py-2 font-medium text-sm rounded-lg'>Sign in as a Captain</button> </Link>

             <Link to={'/login'}><button className='bg-[#dfdfdf] w-full text-[#181818] py-2 font-medium text-sm rounded-lg'>Login as a User</button> </Link>
             <Link to={'/signup'}><button className='bg-[#dfdfdf] w-full text-[#181818] py-2 font-medium text-sm rounded-lg'>Signup as a User</button> </Link>



      </div>
    </div>
  )
}

export default Usersignup