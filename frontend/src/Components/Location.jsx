import React, { useState } from 'react'
import 'remixicon/fonts/remixicon.css'


const Location = ({type,res,setLocationName}) => {

    
  function setLoc(value){
      //  if(type === 'pickup'){
      //      console.log(value.description,type);
      //      setPickupLocationName(va)
      //  }else{
      //      console.log(value.description,type);
           
      //  }

      setLocationName([value.description,type])

  }
  
 
  return (
    <div className='px-4 overflow-y-scroll'>

      {res.map((value,index) => (
         <div onClick={() => {
              setLoc(value)
          }} key={index} className='active:border-black border flex items-center gap-3 py-3 rounded-lg px-4 mt-3'>

               <h1 ><i className="ri-map-pin-fill bg-[#ececec] text-lg p-3 rounded-full "></i></h1>
               <p className='text-sm font-medium ml-4'>{value.description}</p>

        </div>
      ))}
          
          
    </div>
  )
}

export default Location
