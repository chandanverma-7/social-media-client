import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Login.scss'
import { axiosClient } from '../../utils/axiosClient'
import { KEY_ACCESS_TOKEN, setItem } from '../../utils/localstorageManager'

function Login() {
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const navigate=useNavigate();
  async function handlesubmit(e){
      e.preventDefault();
      try {
        const result = await axiosClient.post('/auth/login',{
          email,
          password
        });
        // console.log(result)
        // console.log(' result.data send by login api'+result.data.result)
        setItem(KEY_ACCESS_TOKEN,result.data.result)
        navigate('/');
        // console.log(result);
      } catch (error) {
        console.log(error);
      }
  }
  return (
    <div className="Login">
        <div className="login-box">
            <h2 className="heading">Login</h2>
            <form onSubmit={handlesubmit}>
                <label htmlFor="email">Email</label>
                <input type="email" id='email' className='email' onChange={(e)=>{setEmail(e.target.value)}} />

                <label htmlFor="curr-password">Password</label>
                <input type="password" id='password' className='password' autoComplete='on' onChange={(e)=>{setPassword(e.target.value)}}/>

                <input type="submit" className='submit' />
            </form>
            <p>Don't have an account ? <Link className='Link' to="/signup">Sign up</Link></p>
        </div>
    </div>
  )
}

export default Login