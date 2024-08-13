import axios from "axios";
const axiosInstance = axios.create({
    baseURL: 'https://mern-authentication-app-git-main-nesaralam08s-projects.vercel.app',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  
  export default axiosInstance;