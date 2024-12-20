import React from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Userlogout = () => {
  const navigate = useNavigate();

  const token = localStorage.getItem('usertoken');

  axios.get(`${import.meta.env.VITE_BASE_URL}/user/logout`,{
    headers:{
      Authorization:`Bearer ${token}`
    }
  }).then((res) => {
    if(res.status === 200){
      localStorage.removeItem('usertoken');
      navigate('/login')
    }
  });

  return (
    <div>Userlogout</div>
  )
}

export default Userlogout