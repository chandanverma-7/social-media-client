// import React, { useRef, useState } from 'react'
import Avatar from '../avatar/Avatar'
import {useNavigate} from 'react-router'
import {AiOutlineLogout} from 'react-icons/ai'
import './Navbar.scss'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading } from '../../redux/slices/appConfigSlice'
import { axiosClient } from '../../utils/axiosClient'
import { KEY_ACCESS_TOKEN, removeItem } from '../../utils/localstorageManager'


function Navbar() {
  const navigate =useNavigate();
  const dispatch= useDispatch()
  const myProfile=useSelector(state => state.appConfigReducer.myProfile)
 async function handleLogoutClick(){
      try {
        dispatch(setLoading(true))
      await axiosClient.post('auth/logout')
      removeItem(KEY_ACCESS_TOKEN)
      navigate('/login')
      dispatch(setLoading(false))
      } catch (e) {
        
      }
 }
  return (
    <div className="navbar">
      
        <div className="container">
            <h2 className="banner hoverlink" onClick={()=>navigate('/')}>Let's Connect</h2>
            <div className="right-side">
                <div className="profile"  onClick={()=>navigate(`/profile/${myProfile?._id}`)}>
                    <Avatar src={myProfile?.avatar?.url}/>
                </div>
                <div className="logout hoverlink" onClick={handleLogoutClick}><AiOutlineLogout/></div>
            </div>
        </div>
    </div>
  )
}

export default Navbar