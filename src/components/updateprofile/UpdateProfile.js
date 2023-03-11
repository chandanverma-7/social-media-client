import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {  updateMyProfile } from '../../redux/slices/appConfigSlice'
import './UpdateProfile.scss'
import userImg from '../../assets/user.png'

function UpdateProfile() {
  const myProfile=useSelector(state => state.appConfigReducer.myProfile)
  const [name ,setName]=useState('')
  const [bio ,setBio]=useState('')
  const [img ,setImg]=useState('')
  const dispatch=useDispatch();
  useEffect(() => {
    setName(myProfile?.name || '')
    setBio(myProfile?.bio || '')
    setImg(myProfile?.avatar?.url)
  }, [myProfile])

  function handleImgChange(e){
    const file=e.target.files[0];
    const fileReader=new FileReader()
    fileReader.readAsDataURL(file)
    fileReader.onload=()=>{
      if(fileReader.readyState===fileReader.DONE)
      {
        setImg(fileReader.result)
        // console.log(fileReader.result)
      }
    }
  }

  function handleSubmit(e){
    e.preventDefault();
    dispatch(updateMyProfile({
      name,
      bio,
      img
    }))
  }
  return (
    <div className="updateprofile">
      <div className="container">
        <div className="leftpart">
          {/* <img src={userImg} className='userImg' alt="User Image" /> */}
          <div className="inputUserImg">
            <label htmlFor="inputImg" className='labelImg'>
              <img src={img?img:userImg} alt="name" />
              </label>
            <input type="file" accept='image/*' className='inputImg' onChange={handleImgChange} id='inputImg' />
          </div>
        </div>
        <div className="rightpart">
          <form onSubmit={handleSubmit}>
            <input type="text"value={name} placeholder='Your Name' onChange={(e)=>setName(e.target.value)}/>
            <input type="text"value={bio} placeholder='Yout Bio'onChange={(e)=>setBio(e.target.value)}/>
            <input type="submit" onClick={handleSubmit} className='btnPrimary'onChange={(e)=>setImg(e.target.value)}/>
          </form>
          <button className='deleteAccount btnPrimary'>Delete Account</button>
        </div>
      </div>
    </div>
  )
}

export default UpdateProfile
