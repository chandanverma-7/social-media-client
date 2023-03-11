import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { followAndUnfollowUser } from '../../redux/slices/feedSlice'
import Avatar from '../avatar/Avatar'
import './Follower.scss'
import {useNavigate} from "react-router"

function Follower({user}) {
const dispatch=useDispatch()
const navigate = useNavigate()
const feedData=useSelector(state=>state.feedDataReducer.feedData)
const [isFollowing ,setIsFollowing]=useState('')

 function handleUserFollow(){
  dispatch(followAndUnfollowUser({
    userIdToFollow:user._id
  }))
}

useEffect(()=>{
  // if (feedData.followings.find(item=>item._id===user._id)){
  //   setIsFollowing(true)
  // }else{
  //   setIsFollowing(false)
  // }
  setIsFollowing(feedData.followings.find((item)=>item._id===user._id))
},[feedData])

  return (
    <div className="follower">
        <div className="userInfo" onClick={()=>{navigate(`/profile/${user._id}`)}}>
        <Avatar src ={user?.avatar?.url}/>
        <h4 className="name">{user?.name}</h4>
        </div>
        <h5 className={isFollowing?'hoverlink followlink':'btnPrimary'}
        onClick={handleUserFollow} >{isFollowing?'Unfollow':'Follow'}</h5>
    </div>
  )
}

export default Follower