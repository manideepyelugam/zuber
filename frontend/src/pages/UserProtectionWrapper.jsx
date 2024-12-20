import React,{useContext,useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { UserContextData } from '../context/UserContext';
import axios from 'axios';



const UserProtectionWrapper = ({children}) => {

    const token = localStorage.getItem('usertoken');
    const navigate = useNavigate();
    const [isLoading,setIsLoading] = useState(true);

    const {setUser} = useContext(UserContextData)

  
    useEffect(() => {
        if (!token) {
          navigate('/login');
        }
      }, [token, navigate]);
    
    axios.get(`${import.meta.env.VITE_BASE_URL}/user/profile`,{
      headers:{
        Authorization:`Bearer ${token}`
      }
    }).then((res) => {
      if(res.status === 200){
         setUser(res.data.user);
         setIsLoading(false);
      }
    }).catch((e) =>{
      console.log(e);
      navigate('/login');
      localStorage.removeItem('usertoken')
      
    })

    if(isLoading){
      return(
        <div>
          Loading..
        </div>
      )
    }
  return (
    <>
    {children}
    </>
  )
}

export default UserProtectionWrapper