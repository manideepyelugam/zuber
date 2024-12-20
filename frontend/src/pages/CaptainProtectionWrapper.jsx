import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { CaptainDataContext } from '../context/CaptainContext';

const CaptainProtectionWrapper = ({children}) => {

    const token = localStorage.getItem('captaintoken');
    const navigate = useNavigate();
    const [isLoading,setIsLoading] = useState(true);
    const {setCaptain} = useContext(CaptainDataContext)


    useEffect(() => {

        if(!token){
            navigate('/captain-login')
        }
    },[token,navigate])

    axios.get(`${import.meta.env.VITE_BASE_URL}/captain/profile`,{
        headers:{
            Authorization:`Bearer ${token}`
        }
    }).then((res) => {
        if(res.status === 201){
            setCaptain(res.data.captain);
            setIsLoading(false)            
        }
    }).catch((e) =>{
        console.log(e);
        localStorage.removeItem('captaintoken')
        navigate('/captain-login')
        
    })

    if(isLoading){
        return(<div>
            Loading...
        </div>)
    }

  return (
    <>
    {children}
    </>
  )
}

export default CaptainProtectionWrapper