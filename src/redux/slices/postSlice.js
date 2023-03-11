import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import { axiosClient } from '../../utils/axiosClient'
import { setLoading } from './appConfigSlice'

export const getUserProfile=createAsyncThunk('user/getUserProfile', async (body)=>{
    try {
        const response =await axiosClient.post('/user/getuserprofile', body)
        // console.log(response);
        return response.data.result
    } catch (error) {
        return Promise.reject(error);
    }
})

export const likeAndUnlikePost = createAsyncThunk('post/likeAndUnlike',async (body)=>{
    try {
        const response =await axiosClient.post('/post/like', body)
        // console.log(response);
        // console.log(response.data.result.post);
        return response.data.result.post;
    } catch (error) {
        return Promise.reject(error)
    }
})

const postSlice= createSlice({
    name:'postSlice',
    initialState:{
        userProfile:{}
    },
    extraReducers:(builder)=>{
        builder.addCase(getUserProfile.fulfilled,(state,action)=>{
            state.userProfile=action.payload; 
        })
        .addCase(likeAndUnlikePost.fulfilled,(state,action)=>{
            const post=action.payload
            const index=state?.userProfile?.posts?.findIndex(item=> item._id===post._id)
            console.log(post,index);
            if(index!=undefined && index != -1){
                state.userProfile.posts[index]= post
            }
        })
    }
})
export default postSlice.reducer;