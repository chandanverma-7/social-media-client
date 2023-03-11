
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import {Routes,Route} from 'react-router-dom'
import Home from "./pages/home/Home";
import RequireUser from "./components/RequireUser";
import Feed from "./components/feed/Feed";
import Profile from "./components/profile/Profile";
import UpdateProfile from "./components/updateprofile/UpdateProfile";
import { useSelector } from "react-redux";
import { useEffect, useRef } from "react";
import LoadingBar from 'react-top-loading-bar'
import toast, { Toaster } from 'react-hot-toast';

export const TOAST_SUCCESS='toast-success'
export const TOAST_FAILURE='toast-failure'
  
function App() {
  const loadingref=useRef(null);
  const isLoading=useSelector(state=>state.appConfigReducer.isLoading)
  const toastData=useSelector(state=>state.appConfigReducer.toastData)
  useEffect(()=>{
    if(isLoading){
      loadingref.current?.continuousStart();
    }else{
      loadingref.current?.complete();
    }
  },[isLoading])
  useEffect(()=>{
    switch (toastData.type) {
      case TOAST_SUCCESS:
        toast.success(toastData.message)
        break;
      case TOAST_FAILURE:
        toast.error(toastData.message)
        break;
  
    }
  },[toastData])
  return (
    <div className="App">
      <LoadingBar color='#000' ref={loadingref} />
      <div><Toaster/></div>
      <Routes>
        <Route element={ <RequireUser/>}>
        <Route element={<Home/>} >
          <Route path="/" element={<Feed/>}/>
          <Route path="/profile/:userId" element={<Profile/>}/>
          <Route path="/updateprofile" element={<UpdateProfile/>}/>
          </Route>
        </Route>
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<Signup/>} />
      </Routes>
    </div>
  );
}

export default App;
