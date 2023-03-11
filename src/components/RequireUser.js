import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';
import { getItem, KEY_ACCESS_TOKEN } from '../utils/localstorageManager'

function RequireUser() {
    const user=getItem(KEY_ACCESS_TOKEN);
  return (
   user ? <Outlet/> :<Navigate to ="/Login"/> //<Outlet/> 
  )
}

export default RequireUser
