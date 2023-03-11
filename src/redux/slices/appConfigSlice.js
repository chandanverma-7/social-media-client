import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import { axiosClient } from '../../utils/axiosClient'

export const getMyInfo=createAsyncThunk('user/getmyinfo', async ()=>{
    try {
        const response =await axiosClient.get('/user/getmyinfo')
        return response.data.result
    } catch (error) {
        return Promise.reject(error);
    }
})

export const updateMyProfile=createAsyncThunk('user/updateMyProfile',
async(body)=>{
    try {
        const response =await axiosClient.put('/user/',body)
        console.log(response)
            return response.data.result
        } catch (error) {
            return Promise.reject(error);
        }
})

const appConfigSlice= createSlice({
    name:'appConfigSlice',
    initialState:{
        isLoading:false,
        toastData:{},
        myProfile:null
    },
    reducers:{
        setLoading:(state,action)=>{
            state.isLoading=action.payload;
        },
        showToast:(state,action)=>{
            state.toastData=action.payload
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(getMyInfo.fulfilled,(state,action)=>{
            state.myProfile=action.payload.currUser; 
        })
        .addCase(updateMyProfile.fulfilled,(state,action)=>{
            state.myProfile=action.payload.curruser; 
        })
    }
})
export default appConfigSlice.reducer;
export const {setLoading,showToast}=appConfigSlice.actions;