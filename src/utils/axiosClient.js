import axios from 'axios'
import { getItem, KEY_ACCESS_TOKEN, removeItem, setItem } from './localstorageManager'
import store from '../redux/store'
import { setLoading, showToast } from '../redux/slices/appConfigSlice'
import { TOAST_FAILURE } from '../App'

export const axiosClient= axios.create({
    baseURL:process.env.REACT_APP_SERVER_BASE_URL,
    withCredentials:true
})



axiosClient.interceptors.request.use(
    (request)=>{
        const accesstoken=getItem(KEY_ACCESS_TOKEN);
        request.headers["Authorization"] = `Bearer ${accesstoken}`
        store.dispatch(setLoading(true))

        return request;
    }
)
axiosClient.interceptors.response.use(
  async  (response)=>{
        const data = response.data;
        if(data.status==='ok'){
            store.dispatch(setLoading(false))
            return response;
        }

        const originalrequest=response.config;
        const statuscode=data.statuscode;
        const error=data.message
        
        store.dispatch(showToast({
            type:TOAST_FAILURE,
            message:error
        }))

        // if refresh token expires send user to login page
        if(statuscode===401 && !originalrequest.retry){
            originalrequest.retry=true;
            const response= await axios.create({
                withCredentials:true,
            }).get(`${process.env.REACT_APP_SERVER_BASE_URL}/auth/refresh`)
            if(response.status==='ok'){
                setItem(KEY_ACCESS_TOKEN,response.result.accesstoken)
                originalrequest.headers['Authorization'] =`Bearer ${response.result.accesstoken}`

                return axios(originalrequest)
            }else{
                removeItem(KEY_ACCESS_TOKEN);
            window.location.replace('/login','_self')
            return Promise.reject(error);
            }
        }
        return Promise.reject(error);
    },async (error)=>{
        store.dispatch(setLoading(false))
        store.dispatch(showToast({
            type:TOAST_FAILURE,
            message:error.message
        }))
        return Promise.reject(error)
    }
)