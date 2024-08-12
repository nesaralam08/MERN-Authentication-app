import './App.css'
import {Routes,Route, Navigate} from "react-router-dom"
import Login from './components/Login'
import Signup from './components/Signup'
import Home from './components/Home'
import { useState } from 'react'
import RefreshHandler from './components/RefreshHandler'
function App() {
  const [isauth,setisauth] = useState(false)
  const Private = ({element})=>{
    return isauth ? element : <Navigate to='/login'/>
  }
  return (
    <>
      <RefreshHandler setisauth={setisauth}/>
      <Routes>
        <Route path='/' element={<Navigate to={'/login'}/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/signup' element={<Signup/>}></Route>
        <Route path='/home' element={<Private element={<Home/>}/>}></Route>
        
      </Routes>
    </>
  )
}

export default App
