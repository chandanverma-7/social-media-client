import React, { useState } from 'react'
import Avatar from '../avatar/Avatar'
import './CreatePost.scss'
import backgroundImg from '../../assets/background.jpg'
import {BsCardImage} from 'react-icons/bs'
import { axiosClient } from '../../utils/axiosClient'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading } from '../../redux/slices/appConfigSlice'
import { getUserProfile } from '../../redux/slices/postSlice'

function CreatePost() {
    const [postImg,setPostImg]=useState('') 
    const [caption,setCaption]=useState('') 
    const dispatch=useDispatch();
    const myProfile=useSelector(state=>state.appConfigReducer.myProfile)

    function handleImgChange(e){
        const file=e.target.files[0];
    const fileReader=new FileReader()
    fileReader.readAsDataURL(file)
    fileReader.onload=()=>{
      if(fileReader.readyState===fileReader.DONE)
      {
        setPostImg(fileReader.result)
        // console.log(fileReader.result)
      }
    }
    }

    async function handlePostSubmit(e){
        try{
            dispatch(setLoading(true))
            const result= await axiosClient.post('/post/',{
                caption,
                postImg
            })
            dispatch(getUserProfile({
              userId:myProfile?._id
            }))
        }catch{

        }finally{
            dispatch(setLoading(false))
            setCaption('')
            setPostImg('')
        }
    }

  return (
      <div className="createPost">
        <div className="leftPart">
            <Avatar src={myProfile?.avatar?.url}/>
        </div>
        <div className="rightPart">
        <input type="text" value={caption} className="captionInput" placeholder="What's in your mind" onChange={(e)=>{setCaption(e.target.value)}}/>
        {postImg && <div className="imgContainer">
        <img src={postImg} alt="" className="postImg" />
        </div> }
        <div className="bottomPart">
            <div className="inputPostImg">
            <label htmlFor="labelImg" className='labelImg'>
                <BsCardImage/>
              </label>
            <input type="file" accept='image/*' className='inputImg' onChange={handleImgChange} id='labelImg' />
            </div>
            <button className='postButton btnPrimary' onClick={handlePostSubmit}>Post</button>
        </div>
        </div>
      </div>
  )
}

export default CreatePost
