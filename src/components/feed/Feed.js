import React, { useEffect } from 'react'
import './Feed.scss'
import Post from '../post/Post'
import Follower from '../follower/Follower'
import { useDispatch, useSelector } from 'react-redux'
import { getFeedData } from '../../redux/slices/feedSlice'

function Feed() {
  const feedData=useSelector(state=> state.feedDataReducer.feedData)
  const dispatch =useDispatch()
  useEffect(()=>{
    dispatch(getFeedData())
  },[])
  return (
    <div className="feed">
      <div className="container">
        <div className="leftPart">
             { feedData?.posts?.map(post => <Post post={post} key = {post._id} />)}
        </div>
        <div className="rightPart">
          <div className="following">
            <h3 className='title' >You are following</h3>
            {feedData?.followings?.map(user => <Follower key={user._id} user={user}/>)}
            
          </div>
          <div className="suggestion">
            <h3 className='title' >You may follow</h3>
            {feedData?.suggestions?.map(user => <Follower key={user._id} user={user}/>)}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Feed