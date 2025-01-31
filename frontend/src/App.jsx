import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Userlogin from "./pages/Userlogin"
import Captainlogin from './pages/Captainlogin'
import Usersignup from './pages/Usersignup'
import Captainsignup from './pages/Captainsignup'
import Start from './pages/Start'
import UserProtectionWrapper from './pages/UserProtectionWrapper'
import Userlogout from './pages/Userlogout'
import Captainhome from './pages/Captainhome'
import CaptainProtectionWrapper from './pages/CaptainProtectionWrapper'
import Captainlogout from './pages/Captainlogout'
import Riding from './pages/Riding'
import CaptainRiding from './pages/CaptainRiding'


const App = () => {
  return (
    <div>
      <Routes>
          <Route path='/' element={<Home/>}></Route>
          <Route path='/login' element={<Userlogin/>}></Route>
          <Route path='/riding' element={<Riding/>}></Route>
          <Route path='/captain-riding' element={<CaptainRiding/>}></Route>


          <Route path='/captain-login' element={<Captainlogin/>}></Route>
          <Route path='/signup' element={<Usersignup/>}></Route>
          <Route path='/captain-signup' element={<Captainsignup/>}></Route>
          <Route path='/home' element={<UserProtectionWrapper><Start/></UserProtectionWrapper>}>
            </Route>

          <Route path='/user/logout' element={<UserProtectionWrapper><Userlogout/></UserProtectionWrapper>}>
          </Route>

          <Route path='/captain-home' element={<CaptainProtectionWrapper><Captainhome/></CaptainProtectionWrapper>}></Route>
          <Route path='/captain-logout' element={<CaptainProtectionWrapper><Captainlogout/></CaptainProtectionWrapper>}></Route>


      </Routes>
    </div>
  )
}

export default App