import React, { useState } from 'react'
import{Link} from 'react-router-dom'
import { axiosClient } from '../../utils/axiosClient'
import './Signup.scss'

function Signup() {
    const [email,setEmail]=useState('')
    const [name,setName]=useState('')
    const [password,setPassword]=useState('')
    async function handlesubmit(e){
        e.preventDefault();
        try {
           await axiosClient.post('/auth/signup',{
           email,
           name,
           password
          });
          
          // console.log('this is result',result);
        } catch (error) {
          console.log(error);
        }
    }
    return (
        <div className="Signup">
            <div className="Signup-box">
                <h2 className="heading">Signup</h2>
                <form onSubmit={handlesubmit}>
                    <label htmlFor="name" >Name</label>
                    <input type="text" id='name' className='name' onChange={(e)=>{setName(e.target.value)}}/>

                    <label htmlFor="email" >Email</label>
                    <input type="email" id='email' className='email' onChange={(e)=>{setEmail(e.target.value)}}/>
    
                    <label htmlFor="password">Password</label>
                    <input type="password" id='password'  onChange={(e)=>{setPassword(e.target.value)}}/>
    
                    <input type="submit" className='submit' />
                </form>
                <p>Already have an account ? <Link className='Link' to="/login">Log in</Link></p>
            </div>
        </div>
      )
}

export default Signup