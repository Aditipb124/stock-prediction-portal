import axios from "axios";


const baseURL = import.meta.env.VITE_BACKEND_BASE_API
const axiosInstance= axios.create({
    baseURL : baseURL,
    headers : {
        'Content-Type' : 'application/json',
    }
})

// Request interceptor 

axiosInstance.interceptors.request.use(
    function(config){
        // console.log('request without auth header==>', config);
        const accessToken= localStorage.getItem('access_token')
        if(accessToken){
            config.headers['Authorization'] = `Bearer ${accessToken}`
        }
        console.log(config);
        return config;
    },
    function(error){
        return Promise.reject(error);
    }
)

// Response interceptor 

axiosInstance.interceptors.response.use(
    function(response){
        return(response)
    }, 
    // Handle failed responses
    async function(error){
        const originalRequest = error.config;
        if(error.response.status === 401 && !originalRequest.retry){
            originalRequest.retry = true; 
            // if we not set the og request as true it will go in the infinite loop and will keep hitting the og request
            const refreshToken = localStorage.getItem('refresh_token')
            try{
                const response = await axiosInstance.post('/token/refresh/' , {refresh : refreshToken})
                console.log('New Access Token==>', response.data.access)
                localStorage.setItem('access_token', response.data.access)
                originalRequest.headers['Authorization'] = `Bearer ${response.data.access}`
                return axiosInstance[originalRequest]
                // console.log('response==>', response.data)
            }catch(error){
                localStorage.removeItem('access_token')
                localStorage.removeItem('refresh_token')
                // window.location.href = '/login'
// catch will work if there are errors in the 
            }
        }
        return Promise.reject(error);
    }
)

export default axiosInstance;