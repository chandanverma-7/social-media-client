import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Outlet } from 'react-router-dom'
import Navbar from '../../components/navbar/Navbar'
import { getMyInfo } from '../../redux/slices/appConfigSlice';



function Home() {
  const dispatch=useDispatch();  
  useEffect(()=>{
    dispatch(getMyInfo())//bracket with getMyInfo was added in course
  },[])
  return  <>
      <Navbar/>
      <Outlet/>
    </>
  
}

export default Home
