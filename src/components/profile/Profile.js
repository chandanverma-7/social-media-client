import React, { useEffect, useState } from 'react'
import './Profile.scss'
import Post from '../post/Post'
import userImg from '../../assets/user.png'
import { useNavigate, useParams } from 'react-router-dom'
import CreatePost from '../createPost/CreatePost'
import { useDispatch, useSelector } from 'react-redux'
import { getUserProfile } from '../../redux/slices/postSlice'
import { followAndUnfollowUser } from '../../redux/slices/feedSlice'
function Profile() {
  const navigate=useNavigate();
  const params=useParams();
  const dispatch =useDispatch()
  const userProfile=useSelector(state=>state.postReducer.userProfile)
  const myProfile=useSelector(state=>state.appConfigReducer.myProfile)
  const feedData = useSelector(state=>state.feedDataReducer.feedData)
  const [isMyProfile,setIsMyProfile]=useState(false)
  const [isFollowing,setIsFollowing]=useState(false)

  useEffect(()=>{
    dispatch(getUserProfile({
      userId:params.userId
    }))
    setIsMyProfile(myProfile?._id ===params.userId)
    setIsFollowing(feedData?.followings?.find((item)=>item._id===params.userId))
  },[myProfile,params.userId,feedData])



  function handleUserFollow(){
    dispatch(followAndUnfollowUser({
      userIdToFollow:params.userId
    }))
  }

  return (
    <div className="profile">
      <div className="container">
        <div className="leftPart">
         {isMyProfile && <CreatePost/>}
          {/* <Post post={userProfile?.posts[0]}/> */}
          {userProfile?.posts?.map(item=> <Post post ={item} key={item._id} />)}
        </div>
        <div className="rightPart">
          <div className="profileCard">
            <img src={userProfile?.avatar?.url} className="userImg" alt="" />
            <h3 className="userName">{userProfile?.name}</h3>
            <p className='bio'>{userProfile?.bio}</p>
            <div className="followerInfo">
              <h4>{`${userProfile?.followers?.length} Followers`}</h4>
              <h4>{`${userProfile?.followings?.length} Followings`}</h4>
            </div>
            {!isMyProfile &&  <h5 
            style={{marginTop:'10px'}}
            className={isFollowing?'hoverlink followlink':'btnPrimary'}
        onClick={handleUserFollow} >{isFollowing?'Unfollow':'Follow'}</h5>}
            {isMyProfile && <button className='updateProfile btnsecondary' 
            onClick={()=>{navigate('/updateprofile')}} >Update Profile</button>}
            
            
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile