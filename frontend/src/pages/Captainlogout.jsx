import axios from 'axios';
import React from 'react'
import { useNavigate } from 'react-router-dom'

const Captainlogout = () => {

    const navigate = useNavigate();
    const token = localStorage.getItem('captaintoken');

    axios.get(`${import.meta.env.VITE_BASE_URL}/captain/logout`,{
        headers:{
            Authorization:`Bearer ${token}`
        }
    }).then((res) => {
        if(res.status === 201){
            localStorage.removeItem('captaintoken')
            navigate('/captain-login');
        }

    })



  return (
    <div>Captainlogout</div>
  )
}

export default Captainlogout


